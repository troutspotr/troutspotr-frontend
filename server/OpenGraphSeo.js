const _ = require('lodash')
const getDescriptionFromUrl = require('./GetDescriptionFromUrl')
const MetadataTags = require('./MetadataTags')

const getItems = function (url) {
  var target = _.cloneDeep(MetadataTags.OPEN_GRAPH)
  var description = getDescriptionFromUrl(url)
  target.og_title = description.name
  target.og_url = url
  target.og_description = description.description
  target.og_image = description.imageUrl

  return target
}

module.exports = getItems
