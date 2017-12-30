/* eslint-disable camelcase */
import * as transform from './GeoApi.transform'
const topojson = require('topojson-client')

const transformGeo = (topojsonObject, stateData) => {
  const geoJsonObjects = decompressSync(topojsonObject, stateData)
  const dictionaries = transform.createStreamDictionaries(geoJsonObjects)
  const streamDictionary = transform.createStreamDictionary(geoJsonObjects, dictionaries)
  const t = Object.assign(
    {streamDictionary},
    geoJsonObjects
  )
  return t
}

const decompressSync = (topojsonObject, stateData) => {
  const dictionary = decompressTopojsonSync(topojson, topojsonObject)
  return transform.updateStreamDictionary({
    dictionary,
    topojsonObject,
    stateData,
  })
}

const decompressTopojsonSync = (topojson, topojsonObject) => {
  const trout_stream_section = topojson.feature(topojsonObject, topojsonObject.objects.troutSection)
  const restriction_section = topojson.feature(topojsonObject, topojsonObject.objects.restrictionSection)
  const streamProperties = topojson.feature(topojsonObject, topojsonObject.objects.stream)
  const pal_routes = topojson.feature(topojsonObject, topojsonObject.objects.palSection)
  const pal = topojson.feature(topojsonObject, topojsonObject.objects.pal)
  const boundingCircle = topojson.feature(topojsonObject, topojsonObject.objects.boundingCircle)

  const dictionary = {
    trout_stream_section,
    restriction_section,
    streamProperties,
    pal_routes,
    pal,
    boundingCircle,
  }
  return dictionary
}

module.exports = {
  transformGeo,
}
