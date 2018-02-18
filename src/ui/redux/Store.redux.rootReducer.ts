import { combineReducers } from 'redux'
import usState, { IUsStateReduxState } from 'ui/routes/@usState/UsState.redux'
import { routingWithHistoryReducer, IRoutingState } from './Routing.redux'
import coreReducer, { ICoreState } from 'ui/core/Core.redux'
import gpsReducer, { IGpsState } from 'ui/core/gps/Gps.redux'
import offlineReducer, { IOfflineState } from 'ui/core/offline/Offline.redux'
import regionReducer, { IRegionState } from 'ui/routes/@usState/@region/Region.redux'
export interface IReduxState {
  readonly usState: IUsStateReduxState
  readonly offline: IOfflineState
  readonly gps: IGpsState
  readonly core: ICoreState
  readonly region: IRegionState
  readonly routing: IRoutingState
}
export const AllReducers = combineReducers<IReduxState>({
  usState,
  routing: routingWithHistoryReducer,
  core: coreReducer,
  gps: gpsReducer,
  offline: offlineReducer,
  region: regionReducer,
})
