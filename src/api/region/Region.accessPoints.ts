import { AccessPointFeature } from './IRegionGeoJSON'
import { IAccessPointGeoJsonProps } from 'coreTypes/accessPoint/IAccessPoint'
/* eslint-disable camelcase */
const kebabCase = require('lodash-es/kebabCase').default
const has = require('lodash-es/has').default
export enum CrossingTypes {
  publicTrout = 'publicTrout',
  permissionRequired = 'permissionRequired',
  unsafe = 'unsafe',
  uninteresting = 'uninteresting',
  trail = 'trail',
}

const MINIMUM_LENGTH_MILES = 0.07

export const NONE_TEXT = 'No bridges over publicly fishable land.'
export const SINGLE_TEXT = ' bridge over publicly fishable land.'
export const MANY_TEXT = ' bridges over publicly fishable land.'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabetLength = alphabet.length

export const addLettersToCrossings = (
  roadCrossings: AccessPointFeature[]
): AccessPointFeature[] => {
  const interestingRoadCrossings = roadCrossings.filter(
    rc => rc.properties.bridgeType !== CrossingTypes.uninteresting
  )

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

export const filterBadAccessPoints = (ap: AccessPointFeature): boolean => {
  if (ap.properties.bridgeType == null) {
    return false
  }
  const isUninteresting = ap.properties.bridgeType === CrossingTypes.uninteresting
  if (isUninteresting) {
    return false
  }

  // For now, remove unsafe places to park. I don't want to catalog them.
  // If you want to track these places, remove this but filter them out of the map
  // or be prepared to be overwhelmed with too much data.
  if (ap.properties.bridgeType === CrossingTypes.unsafe) {
    return false
  }

  const isTrail = ap.properties.bridgeType === CrossingTypes.trail
  if (isTrail) {
    return false
  }

  const isTooClose =
    ap.properties.is_previous_neighbor_same_road &&
    ap.properties.distance_to_previous_neighbor < MINIMUM_LENGTH_MILES

  const isTooCloseAndNonZero = isTooClose && ap.properties.distance_to_previous_neighbor > 0
  if (isTooCloseAndNonZero) {
    return false
  }
  return true
}

export interface IBridgeCount {
  publicTroutBridgeCount: number
  permissionRequiredBridgeCount: number
  unsafeBridgeCount: number
  uninterestingBridgeCount: number
  bridgeText: string
}
export const provideRoadCrossingText = (roads: AccessPointFeature[]): IBridgeCount => {
  const props = roads.reduce(
    (dictionary, roadCrossing) => {
      dictionary[`${roadCrossing.properties.bridgeType}BridgeCount`]++
      return dictionary
    },
    {
      publicTroutBridgeCount: 0,
      permissionRequiredBridgeCount: 0,
      unsafeBridgeCount: 0,
      uninterestingBridgeCount: 0,
      bridgeText: null,
    }
  )

  // I expect that stream and roads are not null,
  // And that stream is geojson and that roads is an array of geojson
  const bridgeCount = props.publicTroutBridgeCount
  props.bridgeText = bridgeCount === 0 ? NONE_TEXT : bridgeCount === 1 ? SINGLE_TEXT : MANY_TEXT
  return props
}

export const determineBridgeType = (
  bridgeProperties: IAccessPointGeoJsonProps,
  roadTypesDictionary
): CrossingTypes => {
  const stateRoadCrossingType = roadTypesDictionary[bridgeProperties.road_type_id]
  if (stateRoadCrossingType == null) {
    return CrossingTypes.uninteresting
  }

  const is_over_publicly_accessible_land = bridgeProperties.is_over_publicly_accessible_land
  const is_over_trout_stream = bridgeProperties.is_over_trout_stream
  const isParkable = bridgeProperties.isParkable
  if (is_over_trout_stream === false) {
    return CrossingTypes.uninteresting
  }

  const isTrail = stateRoadCrossingType.type === CrossingTypes.trail

  if (isTrail) {
    return CrossingTypes.trail
  }
  if (isParkable === false) {
    return CrossingTypes.unsafe
  }

  if (is_over_publicly_accessible_land === false) {
    return CrossingTypes.permissionRequired
  }

  return CrossingTypes.publicTrout
}

export const updateRoadCrossingProperties = (
  apFeatures: AccessPointFeature[],
  roadTypesDictionary
): AccessPointFeature[] => {
  apFeatures
    // HACK: get rid of OSM streets that over-extend across states.
    // Back end should do this...
    .filter(feature => has(roadTypesDictionary, feature.properties.road_type_id))
    .forEach((feature, index) => {
      const properties = feature.properties
      // Get rid of this 0 vs 1 nonsense
      // allow truthy values.
      // remember, 1 == true, amirite?
      // tslint:disable:triple-equals
      properties.is_over_publicly_accessible_land = properties.is_over_publicly_accessible_land == 1
      properties.is_over_trout_stream = properties.is_over_trout_stream == 1
      properties.is_previous_neighbor_same_road = properties.is_previous_neighbor_same_road == 1
      // tslint:enable:triple-equals
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
