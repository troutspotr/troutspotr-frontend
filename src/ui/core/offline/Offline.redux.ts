import { createAction, handleActions } from 'redux-actions'
import { getApi } from 'api/Api.module'

// Import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'

export const OFFLINE_SET_OFFLINE_STATUS = 'OFFLINE_SET_OFFLINE_STATUS'
export const OFFLINE_UPDATE_CACHED_ENDPOINTS = 'OFFLINE_UPDATE_CACHED_ENDPOINTS'

export const updateOfflineStatus = createAction(
  OFFLINE_SET_OFFLINE_STATUS,
  (isOffline, cachedEndpoints) => ({ isOffline, cachedEndpoints })
)

export const setCachedEndpoints = createAction(
  OFFLINE_UPDATE_CACHED_ENDPOINTS,
  cachedEndpoints => ({ cachedEndpoints })
)

export const updateCachedEndpoints = () => async dispatch => {
  try {
    // First off, get our keys.
    const { BaseApi } = await getApi()
    const baseApi = new BaseApi()
    const keys = await baseApi.getAllCachedEndpoints()
    // Remap our keys -- this avoids array equality issues.
    dispatch(setCachedEndpoints(keys))
  } catch (error) {
    console.log(error) // eslint-disable-line
  }
}

export const setIsOffline = (isOffline = false) => async dispatch => {
  try {
    // First off, get our keys.
    const { BaseApi } = await getApi()
    const baseApi = new BaseApi()
    const keys = await baseApi.getAllCachedEndpoints()
    dispatch(updateOfflineStatus(isOffline, keys))
  } catch (error) {
    console.log(error) // eslint-disable-line
  }
}

const getOfflineStatus = (): boolean => window.navigator.onLine === false

export interface IOfflineState {
  cachedEndpoints: string[]
  isOffline: boolean
}

export const INITIAL_OFFLINE_STATE: IOfflineState = {
  cachedEndpoints: [],
  isOffline: getOfflineStatus(),
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS: any = {
  [OFFLINE_UPDATE_CACHED_ENDPOINTS]: (state: IOfflineState, { payload }): IOfflineState => {
    let { cachedEndpoints } = payload
    cachedEndpoints = cachedEndpoints == null ? [] : cachedEndpoints.map(x => x)
    const newState = { ...state, ...{ cachedEndpoints } }
    return newState
  },
  [OFFLINE_SET_OFFLINE_STATUS]: (state: IOfflineState, { payload }): IOfflineState => {
    const { isOffline, cachedEndpoints } = payload
    const newState = { ...state, ...{ isOffline, cachedEndpoints } }
    return newState
  },
}

// export default function counterReducer(state = INITIAL_OFFLINE_STATE, action) {
//   const handler = ACTION_HANDLERS[action.type]
//   return handler ? handler(state, action) : state
// }

export default handleActions(ACTION_HANDLERS, INITIAL_OFFLINE_STATE)
