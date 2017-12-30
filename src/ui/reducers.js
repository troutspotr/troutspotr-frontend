import {combineReducers} from 'redux'
import locationReducer from './location'
import coreReducer from './core/Core.state'
import minimapReducer from './core/header/minimap/Minimap.state'
import mapboxModuleReducer from './core/MapboxModule.state'
import mapReducer from './@state/@region/map/Map.state'
import stateReducer from './@state/State.state'
import regionReducer from './@state/@region/Region.state'
import offlineReducer from './core/offline/Offline.state'
import gpsReducer from './core/gps/Gps.state'
export const makeRootReducer = (asyncReducers) => combineReducers({
  // Geo: geoReducer,
  'minimap': minimapReducer,
  'core': coreReducer,
  'location': locationReducer,
  'mapModule': mapboxModuleReducer,
  'map': mapReducer,
  'state': stateReducer,
  'region': regionReducer,
  'offline': offlineReducer,
  'gps': gpsReducer,
  ...asyncReducers,
})

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
