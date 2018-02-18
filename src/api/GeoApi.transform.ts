/* eslint-disable camelcase */
const groupBy = require('lodash/groupBy')
const keyBy = require('lodash/keyBy')
const valuesIn = require('lodash/valuesIn')
const has = require('lodash/has')
const topojson = require('topojson-client')
const { throttleReduce } = require('./Throttle')
const { getSanitizedRegulations } = require('./GeoApi.regulations')

const {
  filterBadAccessPoints,
  addLettersToCrossings,
  provideRoadCrossingText,
  updateRoadCrossingProperties,
} = require('./GeoApi.accessPoints')

const now = new Date()
// const MINIMUM_LENGTH_MILES = 0.05
export const transformGeo = async (topojsonObject, stateData) => {
  const geoJsonObjects = await decompressAsync(topojsonObject, stateData)
  const dictionaries = createStreamDictionaries(geoJsonObjects)
  const streamDictionary = createStreamDictionary(geoJsonObjects, dictionaries)

  const t = Object.assign({ streamDictionary }, geoJsonObjects)
  return new Promise(resolve => {
    resolve(t)
  })
}

export const createStreamDictionaries = geoJsonObjects => {
  const sectionsMap = groupBy(geoJsonObjects.trout_stream_section.features, 'properties.stream_gid')
  const restrictionsMap = groupBy(
    geoJsonObjects.restriction_section.features,
    'properties.stream_gid'
  )
  const palMap = groupBy(geoJsonObjects.pal_routes.features, 'properties.stream_gid')
  const accessMap = groupBy(geoJsonObjects.stream_access_point.features, 'properties.stream_gid')
  const tributaries = groupBy(
    geoJsonObjects.tributary.features.filter(
      x => x.properties.linear_offset > 0.0001 && x.properties.linear_offset < 0.999
    ),
    'properties.stream_gid'
  )
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
export const createStreamDictionary = (geoJsonObjects, dictionaries) => {
  const sectionsMap = dictionaries.sectionsMap
  const restrictionsMap = dictionaries.restrictionsMap
  const palMap = dictionaries.palMap
  const accessMap = dictionaries.accessMap
  const tempCircleDictionary = dictionaries.tempCircleDictionary

  const streamDictionary = geoJsonObjects.streamProperties.features.reduce(
    (dictionary, currentItem, index) => {
      const streamId = currentItem.properties.gid
      dictionary[streamId] = {}
      const entry = dictionary[streamId]
      entry.stream = currentItem
      if (sectionsMap[streamId] == null) {
        console.warn('Could not find section.') // eslint-disable-line
        console.warn(currentItem.properties) // eslint-disable-line
      }
      entry.sections = sectionsMap[streamId] || []

      entry.restrictions = getSanitizedRegulations(restrictionsMap[streamId])
      entry.palSections =
        palMap[streamId] == null
          ? []
          : palMap[streamId].sort((a, b) => b.properties.start - a.properties.start)

      entry.accessPoints =
        accessMap[streamId] == null
          ? []
          : accessMap[streamId].sort(
              (a, b) => b.properties.linear_offset - a.properties.linear_offset
            )

      entry.accessPoints = addLettersToCrossings(entry.accessPoints)
      entry.circle = tempCircleDictionary[streamId]
      const bridgeProperties = provideRoadCrossingText(entry.stream, entry.accessPoints)
      entry.stream.properties.publicTroutBridgeCount = bridgeProperties.publicTroutBridgeCount
      entry.stream.properties.permissionRequiredBridgeCount =
        bridgeProperties.permissionRequiredBridgeCount
      entry.stream.properties.unsafeBridgeCount = bridgeProperties.unsafeBridgeCount
      entry.stream.properties.uninterestingBridgeCount = bridgeProperties.uninterestingBridgeCount
      entry.stream.properties.bridgeText = bridgeProperties.bridgeText

      return dictionary
    },
    {}
  )

  valuesIn(streamDictionary).forEach(stream => {
    const streamId = stream.stream.properties.gid
    const tribs = dictionaries.tributaries[streamId]
    stream.tributaries =
      tribs == null
        ? []
        : dictionaries.tributaries[streamId]
            .filter(t => has(streamDictionary, t.properties.tributary_gid))
            .map(t => {
              const tributaryId = t.properties.tributary_gid
              return Object.assign(t, {
                properties: Object.assign(t.properties, {
                  streamData: streamDictionary[tributaryId],
                }),
              })
            })
  })

  return streamDictionary
}

export const decompressTopojsonAsync = async (topojsonLib, topojsonObject) => {
  const ops = [
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.troutSection),
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.restrictionSection),
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.stream),
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.palSection),
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.pal),
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.boundingCircle),
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

export const decompressAsync = async (topojsonObject, stateData) => {
  const dictionary = await decompressTopojsonAsync(topojson, topojsonObject)
  return updateStreamDictionary({
    dictionary,
    topojsonObject,
    stateData,
  })
}

export const updateStreamDictionary = ({ topojsonObject, dictionary, stateData }) => {
  // Time to update our objects to be more useful upstream!
  const regsDictionary = stateData.regulationsDictionary
  const watersDictionary = stateData.waterOpeners

  dictionary.restriction_section.features.forEach(feature => {
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
  dictionary.restriction_section.features = dictionary.restriction_section.features.filter(sp => {
    const { start_time, end_time } = sp.properties
    if (start_time == null || end_time == null) {
      return true
    }
    const isInBounds = start_time < now && end_time > now
    return isInBounds
  })

  // Update waters
  dictionary.streamProperties.features.forEach(feature => {
    const props = feature.properties
    if (has(watersDictionary, props.water_id) === false) {
      throw new Error(`couldnt find water id ${props.water_id}`)
    }
    props.openers = watersDictionary[props.water_id].openers
    // Let openers = watersDictionary[props.water_id]
  })

  // TODO: HACK. for some reason mapshaper and topojson aren't working for me.
  // MANUALLY turn this into a geojson point feature collection.
  updateRoadCrossingProperties(
    topojsonObject.objects.accessPoint.geometries,
    stateData.roadTypesDictionary
  )
  topojsonObject.objects.accessPoint.geometries = topojsonObject.objects.accessPoint.geometries.filter(
    filterBadAccessPoints
  )
  dictionary.stream_access_point = topojson.feature(
    topojsonObject,
    topojsonObject.objects.accessPoint
  )
  dictionary.tributary = topojson.feature(topojsonObject, topojsonObject.objects.tributary)

  return dictionary
}
