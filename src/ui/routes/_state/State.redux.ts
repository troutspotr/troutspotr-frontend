import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import StateApi from 'api/StateApi'
import { updateCachedEndpoints } from 'ui/page/offline/Offline.redux'
import { keyBy } from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
// Export const MAP = 'map'
// Export const LIST = 'list'
export const REGION_SET_VIEW = 'REGION_SET_VIEW'

// ------------------------------------
// Actions
// ------------------------------------
// Export const setViewToMap = createAction(REGION_SET_VIEW, x => MAP)
// Export const setViewToList = createAction(REGION_SET_VIEW, x => LIST)

export const STATE_SET_STATE_DATA = 'STATE_SET_STATE_DATA'
export const STATE_SET_STATE_LOADING = 'STATE_SET_STATE_LOADING'
export const STATE_SET_STATE_LOADING_FAILED = 'STATE_SET_STATE_LOADING_FAILED'

export const setStateData = createAction(STATE_SET_STATE_DATA, x => x)
export const setStateDataLoading = createAction(STATE_SET_STATE_LOADING)
export const setStateDataFailed = createAction(STATE_SET_STATE_LOADING_FAILED)

export const fetchStateData = stateName => async dispatch => {
  dispatch(setStateDataLoading())
  try {
    if (stateName == null) {
      throw new Error('stateName cannot be null')
    }
    const gettingStateData = StateApi.getStateData(stateName)
    const [stateData] = await Promise.all([gettingStateData])
    dispatch(setStateData(stateData))
    dispatch(updateCachedEndpoints())
  } catch (error) {
    console.log(error) // eslint-disable-line
    dispatch(setStateDataFailed())
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGION_SET_VIEW]: (state, { payload }) => {
    const view = payload || initialState
    const newState = { ...state, ...{ view } }
    return newState
  },

  [STATE_SET_STATE_DATA]: (state, { payload }) => {
    const newState = {
      ...state,

      ...{
        regionIndex: payload.regionIndex,
        regulations: payload.regulationsDictionary,
        waterOpeners: payload.waterOpeners,
        roadTypes: payload.roadTypes,
        palTypes: payload.palTypes,
        streamCentroids: payload.streamCentroids,
        roadTypesDictionary: payload.roadTypesDictionary,
        streamIdDictionary: keyBy(payload.streamCentroids, x => x.gid),
        slugDictionary: keyBy(payload.streamCentroids, x => x.slug),
        stateDataLoadingStatus: LOADING_CONSTANTS.IS_SUCCESS,
      },
    }
    return newState
  },
  [STATE_SET_STATE_LOADING]: (state, { payload }) => {
    const newState = { ...state, ...{ stateDataLoadingStatus: LOADING_CONSTANTS.IS_PENDING } }
    return newState
  },
  [STATE_SET_STATE_LOADING_FAILED]: (state, { payload }) => {
    const newState = { ...state, ...{ stateDataLoadingStatus: LOADING_CONSTANTS.IS_FAILED } }
    return newState
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  regionIndex: {},
  streamCentroids: [],
  regulations: {},
  roadTypes: {},
  palTypes: {},
  slugDictionary: {},
  streamIdDictionary: {},
  stateDataLoadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED,
}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
