const getImageUrl = require('./GetImageUrl')
// const parseUrl = require('./ParseUrl')
const _ = require('lodash')

const getDescriptionFromUrl = function (routeData) {
  var seoDescription = {
    name: 'Trout Spotr',
    description: 'Find safe, legal trout fishing.',
    imageUrl: 'https://troutspotr2.herokuapp.com/android-chrome-192x192.png',
    url: 'https://troutspotr2.herokuapp.com',
    parentSite: 'https://troutspotr2.herokuapp.com'
  }

  if (_.isEmpty(routeData)) {
    console.log('stuff was empty')
    return seoDescription
  }

  return getStreamDescription(routeData, getRegionDescription(routeData, getStateDescription(routeData, seoDescription)))
}

const getStateDescription = function (route, tags) {
  // if (_.isEmpty(route.state)) {
  //   return tags
  // }

  tags.name = 'Trout Spotr'
  tags.description = 'Find safe legal spots to fish for trout'
  return tags
}

const getRegionDescription = function (route, tags) {
  // if (_.isEmpty(route.region)) {
  //   return tags
  // }

  // tags.name = 'Trout Spotr: Driftless Region, Minnesota'
  // tags.description = 'Explore 583 miles of trout streams in the Driftless Region'
  return tags
}

const getStreamDescription = function (route, tags) {
  if (_.isEmpty(route.streamData) && _.isEmpty(route.regionData)) {
    return tags
  }

  var publicBridges = 3
  var publicLength = 12.3
  var bridgeSentence = ''
  if (publicBridges === 0) {
    bridgeSentence = 'No bridges over publicly fishable land.'
  } else if (publicBridges === 1) {
    bridgeSentence = '1 bridge over publicly fishable land.'
  } else {
    bridgeSentence = publicBridges.toString() + ' bridges over publicly fishable land.'
  }

  var publicLengthSentence = Math.round(publicLength) + ' miles of publicly fishable land.'
  tags.name = `${route.streamData.stream.properties.name}` // 'Winnebago Creek, Driftless region, Minnesota'
  tags.description = `${route.streamData.stream.properties.name} has ${bridgeSentence} ${publicLengthSentence} ${_.capitalize(route.region)} region, Minnesota.`
  tags.imageUrl = getImageUrl(route, tags.parentSite)
  return tags
}

module.exports = getDescriptionFromUrl
