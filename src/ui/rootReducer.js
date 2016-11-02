import { combineReducers } from 'redux'
// import profileReducer from './_profile/Profile.state'
// import upgradeReducer from './_profile/_upgrade/Upgrade.state'
import geoReducer from './Geo.state'
// import { reducer as formReducer } from 'redux-form'
// import mapReducer from './map/Map.state'
export default combineReducers({
  geo: geoReducer
  // form: formReducer
  // map: mapReducer
})
