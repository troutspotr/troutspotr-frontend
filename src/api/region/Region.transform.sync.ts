/* eslint-disable camelcase */
import * as transform from './Region.transform'
import { IGeometryPackageDictionary, IGeoPackageOrWhatver } from './Region.transform'
const topojson = require('topojson-client')
import { point, featureCollection } from '@turf/helpers'
import { StreamFeatureCollection } from './IRegionGeoJSON';

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
  const restrictedLand = topojsonLib.feature(topojsonObject, topojsonObject.objects['restricted-land'])
  const boundingCircle = topojsonLib.feature(topojsonObject, topojsonObject.objects.boundingCircle)

  const streamCentroids = featureCollection((streamProperties as StreamFeatureCollection).features.map(feature => {
    const pointFeature = point([
      feature.properties.centroid_longitude, feature.properties.centroid_latitude],
      feature.properties,
    )
    return pointFeature
  }))

  const dictionary = {
    trout_stream_section,
    restriction_section,
    streamProperties,
    pal_routes,
    pal: null,
    boundingCircle,
    restricted_land: restrictedLand,
    streamCentroid: streamCentroids,
  }
  return dictionary
}

export const decompressSync = (topojsonObject, stateData, time: Date): IGeometryPackageDictionary => {
  const dictionary = decompressTopojsonSync(topojson, topojsonObject)
  return transform.updateStreamDictionary({
    dictionary,
    topojsonObject,
    stateData,
  }, time)
}

export const transformGeo = (topojsonObject, stateData, time: Date): IGeoPackageOrWhatver => {
  const geoJsonObjects = decompressSync(topojsonObject, stateData, time)
  const dictionaries = transform.createStreamDictionariesByStreamGid(geoJsonObjects)
  const streamDictionary = transform.createStreamDictionary(geoJsonObjects, dictionaries)
  const t = Object.assign({ streamDictionary }, geoJsonObjects)
  return t
}
