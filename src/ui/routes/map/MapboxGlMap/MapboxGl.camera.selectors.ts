import { createSelector } from 'reselect'
import { ICameraPadding, ICameraProps } from '../../../core/map/ICameraProps'
import { bboxSelector, bearingSelector, pitchSelector } from '../Map.selectors'

const headerHeight = 60
const footerHeight = 40
const legendHeight = 56
const extraMargin = 10
const DEFAULT_PADDING: ICameraPadding = {
  top: headerHeight + legendHeight + extraMargin,
  bottom: footerHeight + extraMargin,
  left: extraMargin,
  right: extraMargin,
}
export const cameraPropsSelector = createSelector(
  bboxSelector,
  pitchSelector,
  bearingSelector,
  (bbox: number[][], pitch: number, bearing: number): ICameraProps => {
    return {
      bbox,
      pitch,
      bearing,
      padding: DEFAULT_PADDING,
      speed: 1,
    }
  }
)
