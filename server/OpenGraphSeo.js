const _ = require('lodash')
const getDescriptionFromUrl = require('./GetDescriptionFromUrl')
const MetadataTags = require('./MetadataTags')

const getItems = function (url) {
  var target = _.cloneDeep(MetadataTags.OPEN_GRAPH)

  if (_.isEmpty(url)) {
    return target
  }
  var description = getDescriptionFromUrl(url)
  target.og_title = description.name
  target.og_url = 'https://troutspotr2.herokuapp.com' + url.path
  target.og_description = description.description
  target.og_image = description.imageUrl
  return target
}

module.exports = getItems
