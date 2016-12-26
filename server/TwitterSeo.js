const _ = require('lodash')
const getDescriptionFromUrl = require('./GetDescriptionFromUrl')
const MetadataTags = require('./MetadataTags')

const getItems = function (url) {
  var target = _.cloneDeep(MetadataTags.TWITTER)
  var description = getDescriptionFromUrl(url)
  target.twitter_seo_title = description.name
  target.twitter_seo_description = description.description
  target.twitter_seo_image = description.imageUrl

  return target
}

module.exports = getItems
