import * as d3 from 'd3-geo'

export const getProjectionFromFeature = (feature, { width, height, radius, buffer = 2 }) => {
  let streamGeometry = feature
  let diameter = radius * 2
  let centroid = d3.geoCentroid(streamGeometry)

  let lower = [(width - diameter) / 2 + buffer, (height - diameter) / 2 + buffer]
  let upper = [width - lower[0], height - lower[1]]
  let projection = d3.geoOrthographic()
    .rotate([-centroid[0], -centroid[1], 0])
    .fitExtent([lower, upper], feature)

  return projection
}
