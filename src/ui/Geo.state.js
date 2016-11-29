import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
export const GEO_SET_GEO = 'GEO_SET_GEO'
export const GEO_SET_LOADING = 'GEO_SET_LOADING'
export const GEO_SET_LOADING_FAILED = 'GEO_SET_LOADING_FAILED'

export const setGeoData = createAction(GEO_SET_GEO)
export const setGeoDataLoading = createAction(GEO_SET_LOADING)
export const setGeoDataFailed = createAction(GEO_SET_LOADING_FAILED)

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  streamList: [],
  streamDictionary: {},

  regionList: [],
  regionDictionary: {},

  countyList: [],
  countyDictionary: {},

  regulationsDictionary: {},

  streamCentroidsGeoJson: {},

  loadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED
}

export default function profileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
