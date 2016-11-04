import { combineReducers } from 'redux'
import locationReducer from './location'
import geoReducer from './Geo.state'
import minimapReducer from './core/header/minimap/Minimap.state'
// console.log(locationReducer, minimapReducer)
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    geo: geoReducer,
    minimap: minimapReducer,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
