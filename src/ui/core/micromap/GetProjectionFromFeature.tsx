import { geoCentroid, geoOrthographic, GeoProjection } from 'd3-geo'
import { GeometryObject } from 'geojson'
import { ICircleSettings, IDimensionsSettings } from './Micromap.settings'
export const getProjectionFromFeature = (
  feature: GeometryObject,
  { width, height, padding = 2 }: IDimensionsSettings,
  { radius }: ICircleSettings
): GeoProjection => {
  const streamGeometry = feature
  const diameter = radius * 2
  const centroid = geoCentroid(streamGeometry)
  const lower = [(width - diameter) / 2 + padding, (height - diameter) / 2 + padding]
  const upper = [width - lower[0], height - lower[1]]
  const projection = geoOrthographic()
    .rotate([-centroid[0], -centroid[1], 0])
    .fitExtent([[lower[0], lower[1]], [upper[0], upper[1]]], feature)

  return projection
}
