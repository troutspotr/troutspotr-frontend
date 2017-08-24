import * as d3 from 'd3-geo'

export const getProjectionFromFeature = (feature, {width, height, radius, buffer = 2}) => {
  const streamGeometry = feature
  const diameter = radius * 2
  const centroid = d3.geoCentroid(streamGeometry)

  const lower = [
    (width - diameter) / 2 + buffer,
    (height - diameter) / 2 + buffer,
  ]
  const upper = [
    width - lower[0],
    height - lower[1],
  ]
  const projection = d3.geoOrthographic()
    .rotate([
      -centroid[0],
      -centroid[1],
      0,
    ])
    .fitExtent([
      lower,
      upper,
    ], feature)

  return projection
}
