import { createAction } from 'redux-actions'
import BaseApi from 'api/BaseApi'
let baseApi = new BaseApi()

// import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'

export const OFFLINE_SET_OFFLINE_STATUS = 'OFFLINE_SET_OFFLINE_STATUS'
export const OFFLINE_UPDATE_CACHED_ENDPOINTS = 'OFFLINE_UPDATE_CACHED_ENDPOINTS'

export const updateOfflineStatus = createAction(OFFLINE_SET_OFFLINE_STATUS, (isOffline, cachedEndpoints) => {
  return { isOffline, cachedEndpoints }
})

export const setCachedEndpoints = createAction(OFFLINE_UPDATE_CACHED_ENDPOINTS, (cachedEndpoints) => {
  return { cachedEndpoints }
})

export const updateCachedEndpoints = () => {
  return async (dispatch) => {
    try {
      // first off, get our keys.
      let keys = await baseApi.getAllCachedEndpoints()
      dispatch(setCachedEndpoints(keys))
    } catch (error) {
      console.log(error)
    }
  }
}

export const setIsOffline = (isOffline = false) => {
  return async (dispatch) => {
    try {
      // first off, get our keys.
      let keys = await baseApi.getAllCachedEndpoints()
      dispatch(updateOfflineStatus(isOffline, keys))
    } catch (error) {
      console.log(error)
    }
  }
}

const getOfflineStatus = () => {
  return window.navigator.onLine === false
}

const initialState = {
  cachedEndpoints: [],
  isOffline: getOfflineStatus()
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [OFFLINE_UPDATE_CACHED_ENDPOINTS] : (state, { payload }) => {
    let { cachedEndpoints } = payload
    let newState = { ...state, ...{ cachedEndpoints } }
    return newState
  },
  [OFFLINE_SET_OFFLINE_STATUS] : (state, { payload }) => {
    let { isOffline, cachedEndpoints } = payload
    let newState = { ...state, ...{ isOffline, cachedEndpoints } }
    return newState
  }
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
