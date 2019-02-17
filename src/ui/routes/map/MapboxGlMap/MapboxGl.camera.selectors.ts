import { createSelector } from 'reselect'
import { ICameraPadding, ICameraProps } from '../../../core/map/ICameraProps'
import { bboxSelector, bearingSelector, pitchSelector, getMapCameraSelector } from 'ui/routes/map/Map.selectors'
import { ICameraReduxState } from 'ui/routes/map/Map.redux.camera';

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
  getMapCameraSelector,
  (bbox: number[][], pitch: number, bearing: number, camera: ICameraReduxState): ICameraProps => {
    return {
      bbox: bbox,
      pitch: pitch,
      bearing: bearing,
      padding: DEFAULT_PADDING,
      duration: camera.animationDurationMs || null,
      linear: camera.linear,
    }
  }
)
