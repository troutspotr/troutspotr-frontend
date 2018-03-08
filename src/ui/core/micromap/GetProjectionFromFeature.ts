import bboxPolygon from '@turf/bbox-polygon'
import {
  ExtendedFeature,
  geoCentroid,
  GeoGeometryObjects,
  geoOrthographic,
  GeoProjection,
} from 'd3-geo'
import { GeoJsonObject } from 'geojson'
import { ICameraProps } from 'ui/core/map/ICameraProps'
import * as MicromapSettings from 'ui/core/micromap/Micromap.settings'
export const getProjectionFromFeatureAndSettings = (
  feature: GeoJsonObject,
  settings: MicromapSettings.IMicromapSettings
): GeoProjection => {
  return getProjectionFromFeature(feature, settings.dimensions, settings.settings.stream.radius)
}

export const getProjectionFromFeature = (
  feature: GeoJsonObject,
  dimmensions: MicromapSettings.IDimensionsSettings,
  radius: number
): GeoProjection => {
  const { width, height } = dimmensions
  const streamGeometry = feature as GeoGeometryObjects
  const diameter = radius * 2
  const centroid = geoCentroid(streamGeometry)
  const lower = [(width - diameter) / 2, (height - diameter) / 2]
  const upper = [width - lower[0], height - lower[1]]
  const projection = geoOrthographic()
    .rotate([-centroid[0], -centroid[1], 0])
    .fitExtent([[lower[0], lower[1]], [upper[0], upper[1]]], streamGeometry)

  return projection
}

export const getProjectionFromBoundingBox = (
  camera: ICameraProps,
  dimmensions: MicromapSettings.IDimensionsSettings
): GeoProjection => {
  const { width, height } = dimmensions
  const { bbox } = camera
  const bboxArray = [bbox[0][0], bbox[0][1], bbox[1][0], bbox[1][1]] as [
    number,
    number,
    number,
    number
  ]
  const streamGeometry = bboxPolygon(bboxArray) as ExtendedFeature<GeoGeometryObjects, {}>
  const centroid = geoCentroid(streamGeometry)
  const lower = [0 / 2, 0 / 2]
  const upper = [width - lower[0], height - lower[1]]
  const projection = geoOrthographic()
    .rotate([-centroid[0], -centroid[1], 0])
    .fitExtent([[lower[0], lower[1]], [upper[0], upper[1]]], streamGeometry)

  return projection
}
