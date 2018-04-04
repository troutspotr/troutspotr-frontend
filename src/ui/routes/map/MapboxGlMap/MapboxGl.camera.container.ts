import MapboxGlComponentCamera, {
  IMapboxGlCameraStateProps,
  IMapboxGlCameraDispatchProps,
  IMapboxGlCameraPassedProps,
} from 'ui/core/map/mapboxGl/MapboxGl.component.camera'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { cameraPropsSelector } from './MapboxGl.camera.selectors'

export const dispatchToProps = {}

export const mapStateToProps = createStructuredSelector<IReduxState, IMapboxGlCameraStateProps>({
  camera: cameraPropsSelector,
})

export const MapboxGlCameraContainer = connect<
  IMapboxGlCameraStateProps,
  IMapboxGlCameraDispatchProps,
  IMapboxGlCameraPassedProps
>(mapStateToProps, dispatchToProps)(MapboxGlComponentCamera)
