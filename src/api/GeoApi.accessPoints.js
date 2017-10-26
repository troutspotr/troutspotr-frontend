/* eslint-disable camelcase */
const kebabCase = require('lodash/kebabCase')
const has = require('lodash/has')
const CROSSING_TYPES = {
  'publicTrout': 'publicTrout',
  'permissionRequired': 'permissionRequired',
  'unsafe': 'unsafe',
  'uninteresting': 'uninteresting',
}

const MINIMUM_LENGTH_MILES = 0.05

const NONE_TEXT = 'No bridges over publically fishable land.'
const SINGLE_TEXT = ' bridge over publically fishable land.'
const MANY_TEXT = ' bridges over publically fishable land.'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabetLength = alphabet.length

const addLettersToCrossings = (roadCrossings) => {
  const interestingRoadCrossings = roadCrossings.filter((rc) => rc.properties.bridgeType !== CROSSING_TYPES.uninteresting)

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

const filterBadAccessPoints = (ap) => {
  const isUninteresting = ap.properties.bridgeType === CROSSING_TYPES.uninteresting
  if (isUninteresting) {
    return false
  }

  const isTooClose = ap.properties.is_previous_neighbor_same_road && ap.properties.distance_to_previous_neighbor < MINIMUM_LENGTH_MILES
  if (isTooClose) {
    return false
  }
  return true
}

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
    return CROSSING_TYPES.uninteresting
  }

  if (isParkable === false) {
    return CROSSING_TYPES.unsafe
  }

  if (is_over_publicly_accessible_land === false) {
    return CROSSING_TYPES.permissionRequired
  }

  return CROSSING_TYPES.publicTrout
}

module.exports = {
  filterBadAccessPoints: filterBadAccessPoints,
  crossingTypes: CROSSING_TYPES,
  addLettersToCrossings: addLettersToCrossings,
  provideRoadCrossingText: provideRoadCrossingText,
  determineBridgeType: determineBridgeType,
  updateRoadCrossingProperties: updateRoadCrossingProperties,
  NONE_TEXT,
  SINGLE_TEXT,
  MANY_TEXT,
}
