import * as d3 from 'd3-geo'
// import { createSelector } from 'reselect'
const ANIMATION_SCALE = 1
export const getStreamDictionary = state => state.bubbles.streamDictionary
export const getSelectedStreamGid = state => state.bubbles.streamDictioanry

export const getProjectionFromFeature = (feature, { width, height, radius }) => {
  let streamGeometry = feature
  let diameter = radius * 2
  let centroid = d3.geoCentroid(streamGeometry)

  let lower = [(width - diameter) / 2 + 20, (height - diameter) / 2 + 20]
  let upper = [width - lower[0], height - lower[1]]
  let projection = d3.geoOrthographic()
    .rotate([-centroid[0], -centroid[1], 0])
    .fitExtent([lower, upper], feature)

  return projection
}

export const getTiming = (props, animationScale = ANIMATION_SCALE, sectionsLength, accessPointsLength) => {
  let obj = {}
  obj.baseStreamOffset = (0 * props.index) * animationScale
  obj.baseStreamLength = (500) * animationScale
  obj.basePalOffset = (obj.baseStreamOffset + 0 + 0 * animationScale)
  obj.baseTroutSectionOffset = (obj.baseStreamOffset + 0 + 300 * animationScale)
  obj.baseRestrictionOffset = (obj.baseStreamOffset + 0 + 600 * animationScale)
  obj.baseAccessPointOffset = (obj.baseStreamOffset + 0 + 900 * animationScale)

  obj.palSectionSpeed = 800 * animationScale
  obj.troutSectionSpeed = (800 * animationScale / Math.max(props.streamPackage.sections.length, 1))
  obj.accessPointSpeed = (800 * animationScale / Math.max(props.streamPackage.accessPoints.length, 1))

  return obj
}
