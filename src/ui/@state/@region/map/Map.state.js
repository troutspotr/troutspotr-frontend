'use strict'
import { combineReducers } from 'redux'

import cameraActions from './Map.state.camera'
import groundActions from './Map.state.ground'
import interactivityActions from './Map.state.interactivity'

export default combineReducers({
  camera:        cameraActions,
  ground:        groundActions,
  interactivity: interactivityActions
})
