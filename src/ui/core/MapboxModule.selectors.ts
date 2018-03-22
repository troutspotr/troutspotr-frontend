import { Loading } from './LoadingConstants'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
// tslint:disable-next-line:no-any
export const mapboxModuleSelector = (state: IReduxState): any => state.mapbox.mapModule

export const isMapboxModuleLoadedSelector = (state: IReduxState): Loading =>
  state.mapbox.mapModuleStatus
