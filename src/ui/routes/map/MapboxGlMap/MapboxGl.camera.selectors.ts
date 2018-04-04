import { bboxSelector, pitchSelector } from '../Map.selectors'
import { createSelector } from 'reselect'
import { ICameraProps, ICameraPadding } from 'ui/core/map/ICameraProps'

const DEFAULT_PADDING: ICameraPadding = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}
export const cameraPropsSelector = createSelector(
  bboxSelector,
  pitchSelector,
  (bbox: number[][], pitch: number): ICameraProps => {
    return {
      bbox,
      pitch,
      bearing: 0,
      padding: DEFAULT_PADDING,
      speed: 1,
    }
  }
)
