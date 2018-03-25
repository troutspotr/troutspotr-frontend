import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { LoadingStatus } from '../../coreTypes/Ui'
// tslint:disable-next-line:no-any
export const mapboxModuleSelector = (state: IReduxState): any => state.mapbox.mapModule

export const isMapboxModuleLoadedSelector = (state: IReduxState): LoadingStatus =>
  state.mapbox.mapModuleStatus
