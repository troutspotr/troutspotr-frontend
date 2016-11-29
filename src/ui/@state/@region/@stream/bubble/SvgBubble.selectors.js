// import _ from 'lodash'
import * as d3 from 'd3-geo'
// import { createSelector } from 'reselect'
const ANIMATION_SCALE = 2.0
export const getStreamDictionary = state => state.bubbles.streamDictionary
export const getSelectedStreamGid = state => state.bubbles.streamDictioanry

export const getProjectionFromFeature = (feature, { width, height, radius }) => {
  let streamGeometry = feature
  let diameter = radius * 2
  // console.log(d3.geoCentroid)
  let centroid = d3.geoCentroid(streamGeometry)

  let lower = [(width - diameter) / 2 + 10, (height - diameter) / 2 + 10]
  let upper = [width - lower[0], height - lower[1]]
  let projection = d3.geoOrthographic()
    .rotate([-centroid[0], -centroid[1], 0])
    .fitExtent([lower, upper], feature)

  return projection
}

export const getTiming = (props, animationScale = ANIMATION_SCALE, sectionsLength, accessPointsLength) => {
  let obj = {}
  obj.baseStreamOffset = (1000 * props.index) * animationScale
  obj.baseStreamLength = (1000) * animationScale
  obj.basePalOffset = (obj.baseStreamOffset + obj.baseStreamLength + 300 * animationScale)
  obj.baseTroutSectionOffset = (obj.baseStreamOffset + obj.baseStreamLength + 600 * animationScale)
  obj.baseRestrictionOffset = (obj.baseStreamOffset + obj.baseStreamLength + 900 * animationScale)
  obj.baseAccessPointOffset = (obj.baseStreamOffset + obj.baseStreamLength + 1200 * animationScale)

  obj.palSectionSpeed = 900 * animationScale
  obj.troutSectionSpeed = (800 * animationScale / Math.max(props.streamPackage.sections.length, 1))
  obj.accessPointSpeed = (1600 * animationScale / Math.max(props.streamPackage.accessPoints.length, 1))

  return obj
}
