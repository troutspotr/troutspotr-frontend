import { createAction, handleActions } from 'redux-actions'
import { LoadingStatus } from '../../coreTypes/Ui'

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
export const setMapModuleSuccess = createAction(MAP_MODULE_SUCCESS, x => x)
const key = 'pk.eyJ1IjoiYW5kZXN0MDEiLCJhIjoibW02QnJLSSJ9._I2ruvGf4OGDxlZBU2m3KQ'
// tslint:disable-next-line:no-let
let cachedPromise = null
// tslint:disable-next-line:typedef
export const loadMapModuleAsync = () => (dispatch, getState) => {
  if (cachedPromise != null) {
    return cachedPromise
  }

  dispatch(setMapModuleLoading())
  // tslint:disable-next-line:typedef
  cachedPromise = new Promise(resolve => {
    try {
      require.ensure(
        [],
        require => {
          const mapboxGl = require('mapbox-gl/dist/mapbox-gl')
          // tslint:disable-next-line:no-console
          console.log('Mapbox GL JS loaded.')
          // tslint:disable-next-line:no-console
          console.log(`Mapbox Gl JS version: ${mapboxGl.version}`)
          setTimeout(() => dispatch(setMapModuleSuccess(mapboxGl)), 0)
        },
        'mapLibrary'
      )
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
const ACTION_HANDLERS: {} = {
  [MAP_MODULE_LOADING]: (state: IMapboxModuleState, { payload }): IMapboxModuleState => {
    const newState = {
      ...state,
      mapModuleStatus: LoadingStatus.Pending,
    }

    return newState
  },
  [MAP_MODULE_FAILED]: (state: IMapboxModuleState, { payload }): IMapboxModuleState => {
    const newState = {
      ...state,
      mapModuleStatus: LoadingStatus.Failed,
    }

    return newState
  },
  [MAP_MODULE_SUCCESS]: (state: IMapboxModuleState, { payload }): IMapboxModuleState => {
    const newState = {
      ...state,
      mapModuleStatus: LoadingStatus.Success,
      mapModule: payload,
    }

    newState.mapModule.accessToken = key
    return newState
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
export interface IMapboxModuleState {
  mapModule: {}
  mapModuleStatus: LoadingStatus
}
const INITIAL_MAPBOX_STATE: IMapboxModuleState = {
  mapModuleStatus: LoadingStatus.NotStarted,
  mapModule: null,
}

export default handleActions(ACTION_HANDLERS, INITIAL_MAPBOX_STATE)
