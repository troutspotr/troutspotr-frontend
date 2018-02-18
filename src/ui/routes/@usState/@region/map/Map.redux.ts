import { combineReducers } from 'redux'

import cameraActions from './Map.redux.camera'
import interactivityActions from './Map.redux.interactivity'

export default combineReducers({
  camera: cameraActions,
  interactivity: interactivityActions,
})
