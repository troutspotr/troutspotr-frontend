/* eslint-disable camelcase */
import * as transform from './Region.transform'
import { IGeometryPackageDictionary, IGeoPackageOrWhatver } from './Region.transform'
const topojson = require('topojson-client')

export const decompressTopojsonSync = (topojsonLib, topojsonObject): IGeometryPackageDictionary => {
  const trout_stream_section = topojsonLib.feature(
    topojsonObject,
    topojsonObject.objects.troutSection
  )
  const restriction_section = topojsonLib.feature(
    topojsonObject,
    topojsonObject.objects.restrictionSection
  )
  const streamProperties = topojsonLib.feature(topojsonObject, topojsonObject.objects.stream)
  const pal_routes = topojsonLib.feature(topojsonObject, topojsonObject.objects.palSection)
  // const pal = topojsonLib.feature(topojsonObject, topojsonObject.objects.pal)
  const boundingCircle = topojsonLib.feature(topojsonObject, topojsonObject.objects.boundingCircle)

  const dictionary = {
    trout_stream_section,
    restriction_section,
    streamProperties,
    pal_routes,
    pal: null,
    boundingCircle,
  }
  return dictionary
}

export const decompressSync = (topojsonObject, stateData): IGeometryPackageDictionary => {
  const dictionary = decompressTopojsonSync(topojson, topojsonObject)
  return transform.updateStreamDictionary({
    dictionary,
    topojsonObject,
    stateData,
  })
}

export const transformGeo = (topojsonObject, stateData): IGeoPackageOrWhatver => {
  const geoJsonObjects = decompressSync(topojsonObject, stateData)
  const dictionaries = transform.createStreamDictionariesByStreamGid(geoJsonObjects)
  const streamDictionary = transform.createStreamDictionary(geoJsonObjects, dictionaries)
  const t = Object.assign({ streamDictionary }, geoJsonObjects)
  return t
}
