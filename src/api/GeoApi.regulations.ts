const has = require('lodash/has')

export const naiveRegColorizer = (reg, index = 1) => {
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

export const getSanitizedRegulations = restrictionsForGivenStream => {
  if (restrictionsForGivenStream == null) {
    return []
  }
  let count = 1
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

// module.exports = {
//   naiveRegColorizer: naiveRegColorizer,
//   getSanitizedRegulations: getSanitizedRegulations,
// }
