import { getApi } from 'api/Api.module'
import { createAction, handleActions } from 'redux-actions'

// Import { LOADING_CONSTANTS } from 'coreTypes/Ui'

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
    const { RegionApi } = await getApi()
    const keys = await RegionApi.getAllCachedEndpoints()
    // Remap our keys -- this avoids array equality issues.
    dispatch(setCachedEndpoints(keys))
  } catch (error) {
    console.error(error)
  }
}

export const setIsOffline = (isOffline = false) => async dispatch => {
  try {
    // First off, get our keys.
    const { RegionApi } = await getApi()
    const keys = await RegionApi.getAllCachedEndpoints()
    dispatch(updateOfflineStatus(isOffline, keys))
  } catch (error) {
    console.error(error) // eslint-disable-line
  }
}

const getOfflineStatus = (): boolean => {
  if (window == null || window.navigator == null) {
    return false
  }
  const online = window.navigator.onLine
  if (online == null || online === true) {
    return false
  }
  return true
}

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
const ACTION_HANDLERS: {} = {
  [OFFLINE_UPDATE_CACHED_ENDPOINTS]: (state: IOfflineState, { payload }): IOfflineState => {
    let { cachedEndpoints } = payload
    cachedEndpoints = cachedEndpoints == null ? [] : cachedEndpoints.slice()
    const newState = { ...state, ...{ cachedEndpoints } }
    return newState
  },
  [OFFLINE_SET_OFFLINE_STATUS]: (state: IOfflineState, { payload }): IOfflineState => {
    const { isOffline, cachedEndpoints } = payload
    const newState = { ...state, ...{ isOffline, cachedEndpoints } }
    return newState
  },
}

export default handleActions(ACTION_HANDLERS, INITIAL_OFFLINE_STATE)
