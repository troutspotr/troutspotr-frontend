import {createAction} from 'redux-actions'
import {LOADING_CONSTANTS} from 'ui/core/LoadingConstants'

// ------------------------------------
// Constants
// ------------------------------------
export const MAP_MODULE_LOADING = 'MAP_MODULE_LOADING'
export const MAP_MODULE_FAILED = 'MAP_MODULE_FAILED'
export const MAP_MODULE_SUCCESS = 'MAP_MODULE_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export const setMapModuleLoading = createAction(MAP_MODULE_LOADING)
export const setMapModuleFailed = createAction(MAP_MODULE_FAILED)
export const setMapModuleSuccess = createAction(MAP_MODULE_SUCCESS)
const key = 'pk.eyJ1IjoiYW5kZXN0MDEiLCJhIjoibW02QnJLSSJ9._I2ruvGf4OGDxlZBU2m3KQ'
// Const setMapModule = createAction(MAP_LOADING_MODULE)
let cachedPromise = null
export const loadMapModuleAsync = () => (dispatch, getState) => {
  if (cachedPromise != null) {
    return cachedPromise
  }

  dispatch(setMapModuleLoading())
  cachedPromise = new Promise((resolve) => {
    try {
      require.ensure([], (require) => {
        const mapboxGl = require('mapbox-gl/dist/mapbox-gl')
        /* eslint-disable no-console */
        console.log('Mapbox GL JS loaded.')
        console.log(`Mapbox Gl JS version: ${mapboxGl.version}`)
        setTimeout(() => dispatch(setMapModuleSuccess(mapboxGl)), 0)
      }, 'mapLibrary')
    } catch (e) {
      dispatch(setMapModuleFailed())
      cachedPromise = null
    }
  })

  return cachedPromise
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MAP_MODULE_LOADING]: (state, {payload}) => {
    const newState = {
      ...state,
      'mapModuleStatus': LOADING_CONSTANTS.IS_PENDING,
    }

    return newState
  },
  [MAP_MODULE_FAILED]: (state, {payload}) => {
    const newState = {
      ...state,
      'mapModuleStatus': LOADING_CONSTANTS.IS_FAILED,
    }

    return newState
  },
  [MAP_MODULE_SUCCESS]: (state, {payload}) => {
    const newState = {
      ...state,
      'mapModuleStatus': LOADING_CONSTANTS.IS_SUCCESS,
      'mapModule': payload,
    }

    newState.mapModule.accessToken = key
    return newState
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  'mapModuleStatus': LOADING_CONSTANTS.IS_NOT_STARTED,
  'mapModule': null,
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
