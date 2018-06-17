import { bboxSelector, pitchSelector, bearingSelector } from '../Map.selectors'
import { createSelector } from 'reselect'
import { ICameraProps, ICameraPadding } from 'ui/core/map/ICameraProps'

const DEFAULT_PADDING: ICameraPadding = {
  top: 60 + 10,
  bottom: 40 + 10,
  left: 10,
  right: 10,
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
