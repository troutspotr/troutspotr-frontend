const getImageUrl = require('./GetImageUrl')
const parseUrl = require('./ParseUrl')
const _ = require('lodash')

const getDescriptionFromUrl = function (url) {
  var path = parseUrl(url)
  var seoDescription = {
    name: 'Trout Spotr',
    description: 'Look at stuff',
    imageUrl: 'https://troutspotr2.herokuapp.com/android-chrome-192x192.png',
    url: 'https://www.troutspotr.com',
    parentSite: 'https://www.troutspotr.com'
  }

  return getStreamDescription(path, getRegionDescription(path, getStateDescription(path, seoDescription)))
}

const getStateDescription = function (path, tags) {
  if (_.isEmpty(path.state)) {
    return tags
  }

  tags.name = 'Trout Spotr: Minnesota'
  tags.description = 'Explore 142 streams in Minnesota'
  return tags
}

const getRegionDescription = function (path, tags) {
  if (_.isEmpty(path.region)) {
    return tags
  }

  tags.name = 'Trout Spotr: Driftless Region, Minnesota'
  tags.description = 'Explore 583 miles of trout streams in the Driftless Region'
  return tags
}

const getStreamDescription = function (path, tags) {
  if (_.isEmpty(path.stream)) {
    return tags
  }
  tags.name = 'Winnebago Creek, Driftless region, Minnesota'
  tags.description = 'Three bridges over publicly fishable land.'
  tags.imageUrl = getImageUrl(path.path)
  return tags
}

module.exports = getDescriptionFromUrl
