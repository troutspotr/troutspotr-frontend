const getImageUrl = require('./GetImageUrl')
const _ = require('lodash')

const getDescriptionFromUrl = function (routeData) {
  const seoDescription = {
    'name': 'Trout Spotr',
    'description': 'Find safe, legal trout fishing.',
    'imageUrl': 'https://2017.troutspotr.com/android-chrome-192x192.png',
    'url': 'https://2017.troutspotr.com',
    'parentSite': 'https://2017.troutspotr.com',
  }
  if (_.isEmpty(routeData)) {
    return seoDescription
  }

  const t = getStreamDescription(routeData, getRegionDescription(routeData, getStateDescription(routeData, seoDescription)))
  return t
}

const getStateDescription = function (route, tags) {
  tags.name = 'Trout Spotr'
  tags.description = 'Find safe legal spots to fish for trout'
  return tags
}

const getRegionDescription = function (route, tags) {
  return tags
}

const getStreamDescription = function (route, tags) {
  if (_.isEmpty(route.streamData) && _.isEmpty(route.regionData)) {
    return tags
  }
  const publicBridges = route.streamData.accessPoints.filter((x) => x.properties.bridgeType === `publicTrout`).length
  const publicLength = Math.round(route.streamData.stream.properties.publicly_accessible_trout_stream_section_length)
  let bridgeSentence = ''
  if (publicBridges === 0) {
    bridgeSentence = 'No bridges over publicly fishable land.'
  } else if (publicBridges === 1) {
    bridgeSentence = '1 bridge over publicly fishable land.'
  } else {
    bridgeSentence = `${publicBridges.toString()} bridges over publicly fishable land.`
  }

  const publicLengthSentence = `${Math.round(publicLength)} miles of publicly fishable land.`
  tags.name = `${route.streamData.stream.properties.name}`
  const stateAbbreviation = _.toUpper(route.state)
  tags.description =
  `${route.streamData.stream.properties.name} has ${bridgeSentence} ${publicLengthSentence} ${_.capitalize(route.region)} region, ${stateAbbreviation}.`
  tags.imageUrl = getImageUrl(route, tags.parentSite)
  return tags
}

module.exports = getDescriptionFromUrl
