/* eslint-disable camelcase */
const groupBy = require('lodash/groupBy')
const keyBy = require('lodash/keyBy')
const valuesIn = require('lodash/valuesIn')
const has = require('lodash/has')
const kebabCase = require('lodash/kebabCase')
const topojson = require('topojson-client')
const {throttleReduce} = require('./Throttle')

const now = new Date()
const MINIMUM_LENGTH_MILES = 0.05
const transformGeo = async (topojsonObject, stateData) => {
  const geoJsonObjects = await decompressAsync(topojsonObject, stateData)
  const dictionaries = createStreamDictionaries(geoJsonObjects)
  const streamDictionary = createStreamDictionary(geoJsonObjects, dictionaries)
  
  const t = Object.assign(
    {streamDictionary},
    geoJsonObjects
  )
  return new Promise((resolve) => {
    resolve(t)
  })
}

const createStreamDictionaries = (geoJsonObjects) => {
  const sectionsMap = groupBy(geoJsonObjects.trout_stream_section.features, 'properties.stream_gid')
  const restrictionsMap = groupBy(geoJsonObjects.restriction_section.features, 'properties.stream_gid')
  const palMap = groupBy(geoJsonObjects.pal_routes.features, 'properties.stream_gid')
  const accessMap = groupBy(geoJsonObjects.stream_access_point.features, 'properties.stream_gid')
  const tributaries = groupBy(geoJsonObjects.tributary.features
    .filter((x) => x.properties.linear_offset > 0.0001 && x.properties.linear_offset < 0.999),
  'properties.stream_gid')
  const tempCircleDictionary = keyBy(geoJsonObjects.boundingCircle.features, 'properties.gid')

  return {
    sectionsMap,
    restrictionsMap,
    palMap,
    accessMap,
    tributaries,
    tempCircleDictionary,
  }
}

// This
// Const SIMPLIFICATION_TOLERANCE_IN_DEGREES = 0.0009
// Const IS_HIGH_QUALITY = false
const createStreamDictionary = (geoJsonObjects, dictionaries) => {
  const sectionsMap = dictionaries.sectionsMap
  const restrictionsMap = dictionaries.restrictionsMap
  const palMap = dictionaries.palMap
  const accessMap = dictionaries.accessMap
  const tempCircleDictionary = dictionaries.tempCircleDictionary

  const streamDictionary = geoJsonObjects.streamProperties.features
    .reduce((dictionary, currentItem, index) => {
      const streamId = currentItem.properties.gid
      dictionary[streamId] = {}
      const entry = dictionary[streamId]
      entry.stream = currentItem

      entry.sections = sectionsMap[streamId]

      entry.restrictions = getSanitizedRegulations(restrictionsMap[streamId])
      entry.palSections = palMap[streamId] == null
        ? []
        : palMap[streamId].sort((a, b) => b.properties.start - a.properties.start)

      entry.accessPoints = accessMap[streamId] == null
        ? []
        : accessMap[streamId]
          .sort((a, b) => b.properties.linear_offset - a.properties.linear_offset)

      entry.accessPoints = addLettersToCrossings(entry.accessPoints)
      entry.circle = tempCircleDictionary[streamId]
      const bridgeProperties = provideRoadCrossingText(entry.stream, entry.accessPoints)
      entry.stream.properties.publicTroutBridgeCount = bridgeProperties.publicTroutBridgeCount
      entry.stream.properties.permissionRequiredBridgeCount = bridgeProperties.permissionRequiredBridgeCount
      entry.stream.properties.unsafeBridgeCount = bridgeProperties.unsafeBridgeCount
      entry.stream.properties.uninterestingBridgeCount = bridgeProperties.uninterestingBridgeCount
      entry.stream.properties.bridgeText = bridgeProperties.bridgeText

      return dictionary
    }, {})

  valuesIn(streamDictionary).forEach((stream) => {
    const streamId = stream.stream.properties.gid
    const tribs = dictionaries.tributaries[streamId]
    stream.tributaries = tribs == null
      ? []
      : dictionaries.tributaries[streamId].filter((t) => has(streamDictionary, t.properties.tributary_gid)).map((t) => {
        const tributaryId = t.properties.tributary_gid
        return Object.assign(
          t,
          {
            'properties': Object.assign(
              t.properties,
              {'streamData': streamDictionary[tributaryId]}
            ),
          }
        )
      })
  })

  return streamDictionary
}

const decompressTopojsonAsync = async (topojson, topojsonObject) => {
  const ops = [
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.troutSection),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.restrictionSection),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.stream),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.palSection),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.pal),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.boundingCircle),
  ]
  const [
    trout_stream_section,
    restriction_section,
    streamProperties,
    pal_routes,
    pal,
    boundingCircle,
  ] = await throttleReduce(ops)

  const dictionary = {
    trout_stream_section,
    restriction_section,
    streamProperties,
    pal_routes,
    pal,
    boundingCircle,
  }
  return dictionary
}

const decompressAsync = async (topojsonObject, stateData) => {
  const dictionary = await decompressTopojsonAsync(topojson, topojsonObject)
  return updateStreamDictionary({
    dictionary,
    topojsonObject,
    stateData,
  })
}

const updateStreamDictionary = ({ topojsonObject, dictionary, stateData }) => {
  // Time to update our objects to be more useful upstream!
  const regsDictionary = stateData.regulationsDictionary
  const watersDictionary = stateData.waterOpeners

  dictionary.restriction_section.features.forEach((feature) => {
    const props = feature.properties
    if (props.start_time != null) {
      props.start_time = new Date(props.start_time)
    }

    if (props.end_time != null) {
      props.end_time = new Date(props.end_time)
    }

    // Add the restriction
    props.restriction = regsDictionary[props.restriction_id]
  })

  // Remove irrelevent restrictions by immediate time.
  dictionary.restriction_section.features = dictionary.restriction_section.features.filter((sp) => {
    const {start_time, end_time} = sp.properties
    if (start_time == null || end_time == null) {
      return true
    }
    const isInBounds = start_time < now && end_time > now
    return isInBounds
  })

  // Update waters
  dictionary.streamProperties.features.forEach((feature) => {
    const props = feature.properties
    if (has(watersDictionary, props.water_id) === false) {
      throw new Error('couldnt find water id', props.water_id)
    }
    props.openers = watersDictionary[props.water_id].openers
    // Let openers = watersDictionary[props.water_id]
  })

  // TODO: HACK. for some reason mapshaper and topojson aren't working for me.
  // MANUALLY turn this into a geojson point feature collection.
  updateRoadCrossingProperties(topojsonObject.objects.accessPoint.geometries, stateData.roadTypesDictionary)
  topojsonObject.objects.accessPoint.geometries = topojsonObject.objects.accessPoint.geometries
    .filter(filterBadAccessPoints)
  dictionary.stream_access_point = topojson.feature(topojsonObject, topojsonObject.objects.accessPoint)
  dictionary.tributary = topojson.feature(topojsonObject, topojsonObject.objects.tributary)

  return dictionary
}

const NONE_TEXT = 'No bridges over publically fishable land.'
const SINGLE_TEXT = ' bridge over publically fishable land.'
const MANY_TEXT = ' bridges over publically fishable land.'

const provideRoadCrossingText = (stream, roads) => {
  const props = roads.reduce((dictionary, roadCrossing) => {
    const key = `${roadCrossing.properties.bridgeType}BridgeCount`
    dictionary[key]++
    return dictionary
  }, {
    'publicTroutBridgeCount': 0,
    'permissionRequiredBridgeCount': 0,
    'unsafeBridgeCount': 0,
    'uninterestingBridgeCount': 0,
    'bridgeText': null,
  })

  // I expect that stream and roads are not null,
  // And that stream is geojson and that roads is an array of geojson
  const number = props.publicTroutBridgeCount
  props.bridgeText = number === 0 ? NONE_TEXT
    : number === 1 ? SINGLE_TEXT
      : MANY_TEXT
  return props
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabetLength = alphabet.length
const crossingTypes = {
  'publicTrout': 'publicTrout',
  'permissionRequired': 'permissionRequired',
  'unsafe': 'unsafe',
  'uninteresting': 'uninteresting',
}

const addLettersToCrossings = (roadCrossings) => {
  const interestingRoadCrossings = roadCrossings.filter((rc) => rc.properties.bridgeType !== crossingTypes.uninteresting)

  interestingRoadCrossings.forEach((feature, index) => {
    const quotient = Math.floor(index / alphabetLength)
    const remainder = index % alphabetLength
    const needsEmergencyPrefix = quotient >= 1
    if (needsEmergencyPrefix) {
      const safePrefixIndex = Math.min(quotient, alphabetLength) - 1
      const prefix = alphabet[safePrefixIndex]
      const suffix = alphabet[remainder]
      feature.properties.alphabetLetter = prefix + suffix
    } else {
      feature.properties.alphabetLetter = alphabet[index % alphabetLength]
    }
  })
  return roadCrossings
}

const updateRoadCrossingProperties = (apFeatures, roadTypesDictionary) => {
  apFeatures
    // HACK: get rid of OSM streets that over-extend across states.
    // Back end should do this...
    .filter((feature) => has(roadTypesDictionary, feature.properties.road_type_id))
    .forEach((feature, index) => {
      const properties = feature.properties
      // Get rid of this 0 vs 1 nonsense
      // allow truthy values.
      // remember, 1 == true, amirite?
      properties.is_over_publicly_accessible_land = properties.is_over_publicly_accessible_land == 1
      properties.is_over_trout_stream = properties.is_over_trout_stream == 1
      properties.is_previous_neighbor_same_road = properties.is_previous_neighbor_same_road == 1
      const roadTypeId = properties.road_type_id
      const roadType = roadTypesDictionary[roadTypeId]
      const isParkable = roadType.isParkable
      properties.isParkable = isParkable
      properties.bridgeType = determineBridgeType(properties, roadTypesDictionary)
      properties.alphabetLetter = ' '
      properties.slug = `${kebabCase(properties.street_name)}@${properties.linear_offset}`
    })
  return apFeatures
}

const determineBridgeType = (bridgeProperties, roadTypesDictionary) => {
  const is_over_publicly_accessible_land = bridgeProperties.is_over_publicly_accessible_land
  const is_over_trout_stream = bridgeProperties.is_over_trout_stream
  const isParkable = bridgeProperties.isParkable
  if (is_over_trout_stream === false) {
    return crossingTypes.uninteresting
  }

  if (isParkable === false) {
    return crossingTypes.unsafe
  }

  if (is_over_publicly_accessible_land === false) {
    return crossingTypes.permissionRequired
  }

  return crossingTypes.publicTrout
}

const filterBadAccessPoints = (ap) => {
  const isUninteresting = ap.properties.bridgeType === crossingTypes.uninteresting
  if (isUninteresting) {
    return false
  }

  const isTooClose = ap.properties.is_previous_neighbor_same_road && ap.properties.distance_to_previous_neighbor < MINIMUM_LENGTH_MILES
  if (isTooClose) {
    return false
  }
  return true
}

const naiveRegColorizer = (reg, index = 1) => {
  const isSanctuary = reg.legalText.toLowerCase().indexOf('sanctuary') >= 0
  const isClosed = reg.legalText.toLowerCase().indexOf('closed') >= 0

  if (isSanctuary || isClosed) {
    return 'red'
  }
  if (index === 1) {
    return 'yellow'
  }

  if (index === 2) {
    return 'blue'
  }

  if (index === 3) {
    return 'white'
  }

  return 'red'
}

const getSanitizedRegulations = (restrictionsForGivenStream) => {
  if (restrictionsForGivenStream == null) {
    return []
  }
  let count = 1
  restrictionsForGivenStream.reduce((regDictionary, item) => {
    // We're gonna try to colorize our restrictions.
    // We need to be careful. there could be 16 restriction
    // Sections, but only of 3 types. We need to cataloge
    // Our progress, so a reduce function seems like a good idea here.
    if (has(regDictionary, item.properties.restriction.id)) {
      const color = regDictionary[item.properties.restriction.id].color
      item.properties.color = color
      return regDictionary
    }

    const newColor = naiveRegColorizer(item.properties.restriction, count)
    item.properties.color = newColor
    regDictionary[item.properties.restriction.id] = {
      'color': newColor,
      'restriction': item.properties.restriction,
    }
    count++
    return regDictionary
  }, {})

  return restrictionsForGivenStream
}

module.exports = {
  transformGeo,
  crossingTypes,
  decompress: decompressAsync,
  createStreamDictionaries,
  provideRoadCrossingText,
  createStreamDictionary,
  updateStreamDictionary,
  NONE_TEXT,
  SINGLE_TEXT,
  MANY_TEXT,
}
