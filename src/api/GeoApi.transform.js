'use strict'
/* eslint-disable camelcase */
const groupBy = require('lodash/groupBy')
const keyBy = require('lodash/keyBy')
const valuesIn = require('lodash/valuesIn')
const has = require('lodash/has')
const kebabCase = require('lodash/kebabCase')
const topojson = require('topojson-client')
const { throttleReduce } = require('./Throttle')

var now = new Date()
const MINIMUM_LENGTH_MILES = 0.05
const transformGeo = async (topojsonObject, stateData) => {
  var geoJsonObjects = await decompress(topojsonObject, stateData)
  var dictionaries = createStreamDictionaries(geoJsonObjects)
  var streamDictionary = createStreamDictionary(geoJsonObjects, dictionaries)
    // update with tributaries.
  valuesIn(streamDictionary).forEach(stream => {
    var streamId = stream.stream.properties.gid
    var tribs = dictionaries.tributaries[streamId]
    stream.tributaries = tribs == null
      ? []
      : dictionaries.tributaries[streamId].filter(t => {
        return has(streamDictionary, t.properties.tributary_gid)
      }).map(t => {
        var tributaryId = t.properties.tributary_gid
        return Object.assign(
          t,
          {
            properties: Object.assign(
              t.properties,
              { streamData: streamDictionary[tributaryId] }
            )
          }
        )
      })
  })
  var t = Object.assign(
    { streamDictionary: streamDictionary },
    geoJsonObjects
  )
  return new Promise((resolve) => {
    resolve(t)
  })
}

const createStreamDictionaries = (geoJsonObjects) => {
  var sectionsMap = groupBy(geoJsonObjects.trout_stream_section.features, 'properties.stream_gid')
  var restrictionsMap = groupBy(geoJsonObjects.restriction_section.features, 'properties.stream_gid')
  var palMap = groupBy(geoJsonObjects.pal_routes.features, 'properties.stream_gid')
  var accessMap = groupBy(geoJsonObjects.stream_access_point.features, 'properties.stream_gid')
  var tributaries = groupBy(geoJsonObjects.tributary.features
      .filter(x => x.properties.linear_offset > 0.0001 && x.properties.linear_offset < 0.999),
       'properties.stream_gid')
  var tempCircleDictionary = keyBy(geoJsonObjects.boundingCircle.features, 'properties.gid')

  return {
    sectionsMap,
    restrictionsMap,
    palMap,
    accessMap,
    tributaries,
    tempCircleDictionary
  }
}

// this
// const SIMPLIFICATION_TOLERANCE_IN_DEGREES = 0.0009
// const IS_HIGH_QUALITY = false
const createStreamDictionary = (geoJsonObjects, dictionaries) => {
  var sectionsMap = dictionaries.sectionsMap
  var restrictionsMap = dictionaries.restrictionsMap
  var palMap = dictionaries.palMap
  var accessMap = dictionaries.accessMap
  var tempCircleDictionary = dictionaries.tempCircleDictionary

  var streamDictionary = geoJsonObjects.streamProperties.features
    .reduce((dictionary, currentItem, index) => {
      var streamId = currentItem.properties.gid
      dictionary[streamId] = {}
      var entry = dictionary[streamId]
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

  return streamDictionary
}

const decompressTopojson = async (topojson, topojsonObject) => {
  var ops = [
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.troutSection),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.restrictionSection),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.stream),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.palSection),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.pal),
    topojson.feature.bind(null, topojsonObject, topojsonObject.objects.boundingCircle)
  ]
  let [trout_stream_section,
    restriction_section,
    streamProperties,
    pal_routes,
    pal,
    boundingCircle
  ] = await throttleReduce(ops)

  let dictionary = {
    trout_stream_section,
    restriction_section,
    streamProperties,
    pal_routes,
    pal,
    boundingCircle
  }
  return dictionary
}

const decompress = async (topojsonObject, stateData) => {
  var dictionary = await decompressTopojson(topojson, topojsonObject)
  // time to update our objects to be more useful upstream!
  var regsDictionary = stateData.regulationsDictionary
  var watersDictionary = stateData.waterOpeners

  dictionary.restriction_section.features.forEach(feature => {
    var props = feature.properties
    if (props.start_time != null) {
      props.start_time = new Date(props.start_time)
    }

    if (props.end_time != null) {
      props.end_time = new Date(props.end_time)
    }

    // add the restriction
    props.restriction = regsDictionary[props.restriction_id]
  })

  // remove irrelevent restrictions by immediate time.
  dictionary.restriction_section.features = dictionary.restriction_section.features.filter(sp => {
    let { start_time, end_time } = sp.properties
    if (start_time == null || end_time == null) {
      return true
    }
    let isInBounds = start_time < now && end_time > now
    return isInBounds
  })

  // update waters
  dictionary.streamProperties.features.forEach(feature => {
    var props = feature.properties
    if (has(watersDictionary, props.water_id) === false) {
      throw new Error('couldnt find water id', props.water_id)
    }
    props.openers = watersDictionary[props.water_id].openers
    // let openers = watersDictionary[props.water_id]
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
    publicTroutBridgeCount: 0,
    permissionRequiredBridgeCount: 0,
    unsafeBridgeCount: 0,
    uninterestingBridgeCount: 0,
    bridgeText: null
  })

  // i expect that stream and roads are not null,
  // and that stream is geojson and that roads is an array of geojson
  const number = props.publicTroutBridgeCount
  props.bridgeText = number === 0 ? NONE_TEXT
    : number === 1 ? SINGLE_TEXT
    : MANY_TEXT
  return props
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabetLength = alphabet.length
const crossingTypes = {
  publicTrout: 'publicTrout',
  permissionRequired: 'permissionRequired',
  unsafe: 'unsafe',
  uninteresting: 'uninteresting'
}

const addLettersToCrossings = (roadCrossings) => {
  var interestingRoadCrossings = roadCrossings.filter(rc => rc.properties.bridgeType !== crossingTypes.uninteresting)

  interestingRoadCrossings.forEach((feature, index) => {
    var quotient = Math.floor(index / alphabetLength)
    var remainder = index % alphabetLength
    var needsEmergencyPrefix = quotient >= 1
    if (needsEmergencyPrefix) {
      var safePrefixIndex = Math.min(quotient, alphabetLength) - 1
      var prefix = alphabet[safePrefixIndex]
      var suffix = alphabet[remainder]
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
    .filter(feature => has(roadTypesDictionary, feature.properties.road_type_id))
    .forEach((feature, index) => {
      var properties = feature.properties
    // get rid of this 0 vs 1 nonsense
      properties.is_over_publicly_accessible_land = properties.is_over_publicly_accessible_land === 1
      properties.is_over_trout_stream = properties.is_over_trout_stream === 1
      properties.is_previous_neighbor_same_road = properties.is_previous_neighbor_same_road === 1
      var roadTypeId = properties.road_type_id
      var roadType = roadTypesDictionary[roadTypeId]
      var isParkable = roadType.isParkable
      properties.isParkable = isParkable
      properties.bridgeType = determineBridgeType(properties, roadTypesDictionary)
      properties.alphabetLetter = ' '
      properties.slug = `${kebabCase(properties.street_name)}@${properties.linear_offset}`
    })
  return apFeatures
}

const determineBridgeType = (bridgeProperties, roadTypesDictionary) => {
  var is_over_publicly_accessible_land = bridgeProperties.is_over_publicly_accessible_land
  var is_over_trout_stream = bridgeProperties.is_over_trout_stream
  var isParkable = bridgeProperties.isParkable
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
  var isUninteresting = ap.properties.bridgeType === crossingTypes.uninteresting
  if (isUninteresting) {
    return false
  }

  var isTooClose = ap.properties.is_previous_neighbor_same_road && ap.properties.distance_to_previous_neighbor < MINIMUM_LENGTH_MILES
  if (isTooClose) {
    return false
  }

  return true
}

const naiveRegColorizer = (reg, index = 1) => {
  let isSanctuary = reg.legalText.toLowerCase().indexOf('sanctuary') >= 0
  let isClosed = reg.legalText.toLowerCase().indexOf('closed') >= 0

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
    // we're gonna try to colorize our restrictions.
    // we need to be careful. there could be 16 restriction
    // sections, but only of 3 types. We need to cataloge
    // our progress, so a reduce function seems like a good idea here.
    if (has(regDictionary, item.properties.restriction.id)) {
      let color = regDictionary[item.properties.restriction.id].color
      item.properties.color = color
      return regDictionary
    }

    let newColor = naiveRegColorizer(item.properties.restriction, count)
    item.properties.color = newColor
    regDictionary[item.properties.restriction.id] = {
      color: newColor,
      restriction: item.properties.restriction
    }
    count++
    return regDictionary
  }, {})

  return restrictionsForGivenStream
}

module.exports = {
  transformGeo: transformGeo,
  crossingTypes: crossingTypes,
  decompress: decompress,
  createStreamDictionaries: createStreamDictionaries,
  provideRoadCrossingText: provideRoadCrossingText,
  createStreamDictionary: createStreamDictionary,
  NONE_TEXT,
  SINGLE_TEXT,
  MANY_TEXT
}
