import { combineReducers } from 'redux'

import cameraActions, { ICameraReduxState } from './Map.redux.camera'
import interactivityActions, { IMapInteractivity } from './Map.redux.interactivity'

export interface IMapRedux {
  camera: ICameraReduxState
  interactivity: IMapInteractivity
}

export default combineReducers({
  camera: cameraActions,
  interactivity: interactivityActions,
})
