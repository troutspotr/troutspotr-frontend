import { combineReducers } from 'redux'
import coreReducer, { ICoreState } from 'ui/core/Core.redux'
import gpsReducer, { IGpsState } from 'ui/core/gps/Gps.redux'
import mapboxReducer, { IMapboxModuleState } from 'ui/core/MapboxModule.redux'
import offlineReducer, { IOfflineState } from 'ui/page/offline/Offline.redux'
import minimapReducer, { IMinimapReduxState } from 'ui/page/header/minimap/Minimap.redux'
import regionReducer, { IRegionState } from 'ui/routes/@usState/@region/Region.redux'
import usState, { IUsStateReduxState } from 'ui/routes/@usState/UsState.redux'
import { IRoutingState, routingWithHistoryReducer } from './Routing.redux'
import mapReducer, { IMapRedux } from 'ui/routes/map/Map.redux'
export interface IReduxState {
  readonly usState: IUsStateReduxState
  readonly offline: IOfflineState
  readonly gps: IGpsState
  readonly core: ICoreState
  readonly region: IRegionState
  readonly routing: IRoutingState
  readonly mapbox: IMapboxModuleState
  readonly minimap: IMinimapReduxState
  readonly map: IMapRedux
}
export const AllReducers = combineReducers<IReduxState>({
  usState,
  routing: routingWithHistoryReducer,
  core: coreReducer,
  gps: gpsReducer,
  offline: offlineReducer,
  region: regionReducer,
  mapbox: mapboxReducer,
  minimap: minimapReducer,
  map: mapReducer,
})
