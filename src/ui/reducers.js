import { combineReducers } from 'redux'
import locationReducer from './location'
import geoReducer from './Geo.state'
import coreReducer from './core/Core.state'
import minimapReducer from './core/header/minimap/Minimap.state'
import mapboxModuleReducer from './core/MapboxModule.state'
// console.log(locationReducer, minimapReducer)
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    geo: geoReducer,
    minimap: minimapReducer,
    core: coreReducer,
    location: locationReducer,
    mapModule: mapboxModuleReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
