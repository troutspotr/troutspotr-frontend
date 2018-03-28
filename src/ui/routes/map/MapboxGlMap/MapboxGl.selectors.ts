import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { IMapboxGlStateProps } from 'ui/core/map/mapboxGl/MapboxGl.component'
import mapboxGl from 'mapbox-gl'
import { mapboxGlStyleSelector } from './MapboxGl.style.selectors'

export const mapboxGlModuleSelector = (reduxState: IReduxState): any => mapboxGl
export const mapboxGlDebugMode = (reduxState: IReduxState): boolean => true

export const mapboxGlStateProps = createStructuredSelector<IReduxState, IMapboxGlStateProps>({
  style: mapboxGlStyleSelector,
  mapboxGl: mapboxGlModuleSelector,
  debugMode: mapboxGlDebugMode,
})
