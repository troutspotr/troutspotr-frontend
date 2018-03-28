import { connect } from 'react-redux'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { mapboxGlStateProps } from './MapboxGl.selectors'
import { setIsMapInitialized, selectMapFeature } from '../Map.redux.interactivity'
import {
  IMapboxGlDispatchProps,
  IMapboxGlPassedProps,
  MapboxGlComponent,
  IMapboxGlStateProps,
} from 'ui/core/map/mapboxGl/MapboxGl.component'

const mapDispatchToProps = (dispatch): IMapboxGlDispatchProps => ({
  onFeaturesSelected: () => dispatch(selectMapFeature(null)),
  onMapInitialized: () => dispatch(setIsMapInitialized(true)),
})

export const mapStateToProps = (reduxState: IReduxState): IMapboxGlStateProps =>
  mapboxGlStateProps(reduxState)

export const MapboxGlContainer = connect<
  IMapboxGlStateProps,
  IMapboxGlDispatchProps,
  IMapboxGlPassedProps
>(mapStateToProps, mapDispatchToProps)(MapboxGlComponent)
