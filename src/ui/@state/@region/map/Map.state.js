import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'

// ------------------------------------
// Constants
// ------------------------------------
export const MAP_LOADING_MODULE_STATUS = 'MAP_LOADING_MODULE_STATUS'

// ------------------------------------
// Actions
// ------------------------------------

export const setMapModuleStatusToLoading = createAction(MAP_LOADING_MODULE_STATUS, x => LOADING_CONSTANTS.IS_PENDING)
export const setMapModuleStatusToFailure = createAction(MAP_LOADING_MODULE_STATUS, x => LOADING_CONSTANTS.IS_FAILED)
export const setMapModuleStatusToSuccess = createAction(MAP_LOADING_MODULE_STATUS, x => LOADING_CONSTANTS.IS_SUCCESS)
export const setMapModuleStatusToOffline = createAction(MAP_LOADING_MODULE_STATUS, x => LOADING_CONSTANTS.IS_OFFLINE)

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MAP_LOADING_MODULE_STATUS] : (state, { payload }) => {
    let newState = { ...state, isMapModuleLoaded: payload }
    return newState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isMapStyleLoaded: LOADING_CONSTANTS.IS_NOT_STARTED
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
