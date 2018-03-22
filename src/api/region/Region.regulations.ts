import { RestrictionFeature } from './IRegionGeoJSON'
const has = require('lodash-es/has').default

export enum NaiveColor {
  red = 'red',
  yellow = 'yellow',
  blue = 'blue',
  white = 'white',
}
export const naiveRegColorizer = (reg, index = 1): NaiveColor => {
  const isSanctuary = reg.legalText.toLowerCase().indexOf('sanctuary') >= 0
  const isClosed = reg.legalText.toLowerCase().indexOf('closed') >= 0

  if (isSanctuary || isClosed) {
    return NaiveColor.red
  }
  if (index === 1) {
    return NaiveColor.yellow
  }

  if (index === 2) {
    return NaiveColor.blue
  }

  if (index === 3) {
    return NaiveColor.white
  }

  return NaiveColor.red
}

export const getSanitizedRegulations = (
  restrictionsForGivenStream: RestrictionFeature[]
): RestrictionFeature[] => {
  if (restrictionsForGivenStream == null) {
    return []
  }
  // tslint:disable-next-line:no-let
  let count = 1

  // TODO: Examine this. I don't think we actually need to reduce anything.
  // tslint:disable-next-line:no-ignored-return
  restrictionsForGivenStream.reduce((regDictionary, item, index) => {
    // We're gonna try to colorize our restrictions.
    // We need to be careful. there could be 16 restriction
    // Sections, but only of 3 types. We need to cataloge
    // Our progress, so a reduce function seems like a good idea here.
    if (has(regDictionary, item.properties.restriction.id)) {
      const color = regDictionary[item.properties.restriction.id].color
      item.properties.color = color
      item.properties.colorOffset = count
      return regDictionary
    }

    const newColor = naiveRegColorizer(item.properties.restriction, count)
    item.properties.color = newColor
    item.properties.colorOffset = count
    regDictionary[item.properties.restriction.id] = {
      color: newColor,
      restriction: item.properties.restriction,
    }
    count++
    return regDictionary
  }, {})

  return restrictionsForGivenStream
}
