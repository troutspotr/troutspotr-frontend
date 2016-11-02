import { combineReducers } from 'redux'
import locationReducer from './location'
import geoReducer from './Geo.state'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    geo: geoReducer,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
