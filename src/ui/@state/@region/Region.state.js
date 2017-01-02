import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import RegionApi from 'api/RegionApi'
import { isEmpty } from 'lodash'
import { selectedRegionSelector } from 'ui/core/Core.selectors'
// import { troutStreamDictionarySelector } from './Region.selectors'
import { selectMapFeature } from 'ui/@state/@region/map/Map.state.interactivity'
// ------------------------------------
// Constants
// ------------------------------------
export const MAP = 'map'
export const LIST = 'list'
export const REGION_SET_VIEW = 'REGION_SET_VIEW'

// ------------------------------------
// Actions
// ------------------------------------
export const setViewToMap = createAction(REGION_SET_VIEW, x => MAP)
export const setViewToList = createAction(REGION_SET_VIEW, x => LIST)

export const REGION_SET_REGION_DATA = 'REGION_SET_REGION_DATA'
export const REGION_SET_REGION_LOADING = 'REGION_SET_REGION_LOADING'
export const REGION_SET_REGION_LOADING_FAILED = 'REGION_SET_REGION_LOADING_FAILED'

export const setRegionData = createAction(REGION_SET_REGION_DATA)
export const setRegionDataLoading = createAction(REGION_SET_REGION_LOADING)
export const setRegionDataFailed = createAction(REGION_SET_REGION_LOADING_FAILED)

export const fetchRegionData = (stateName, regionName) => {
  return async (dispatch, getState) => {
    dispatch(setRegionDataLoading())
    try {
      if (stateName == null) {
        throw new Error('stateName cannot be null')
      }

      if (regionName == null) {
        throw new Error('regionName cannot be null')
      }

      let gettingRegion = RegionApi.getRegionData(stateName, regionName)
      let [regionData] = await Promise.all([gettingRegion])
      dispatch(setRegionData(regionData))
      // get selectedRegion and fly to coordinates
      let selectedRegion = selectedRegionSelector(getState())
      if (selectedRegion == null || isEmpty(selectedRegion)) {
        return
      }

      dispatch(selectMapFeature(selectedRegion))
    } catch (error) {
      console.log(error)
      dispatch(setRegionDataFailed())
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGION_SET_VIEW] : (state, { payload }) => {
    let view = payload || initialState.view
    let newState = { ...state, ...{ view } }
    return newState
  },

  [REGION_SET_REGION_DATA]: (state, { payload }) => {
    let newState = {
      ...state,

      ...{
        troutStreamDictionary: payload.streamDictionary,
        troutStreamSections: payload.trout_stream_section,
        restrictionSections: payload.restriction_section,
        streams: payload.streamProperties,
        palSections: payload.pal_routes,
        streamAccessPoint: payload.stream_access_point,
        pals: payload.pal,
        regionLoadingStatus: LOADING_CONSTANTS.IS_SUCCESS
      }
    }
    return newState
  },
  [REGION_SET_REGION_LOADING]: (state, { payload }) => {
    let newState = { ...state, ...{ regionLoadingStatus: LOADING_CONSTANTS.IS_PENDING } }
    return newState
  },
  [REGION_SET_REGION_LOADING_FAILED]: (state, { payload }) => {
    let newState = { ...state, ...{ regionLoadingStatus: LOADING_CONSTANTS.IS_FAILED } }
    return newState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  view: LIST,
  troutStreamDictionary: {},
  troutStreamSections: null,
  restrictionSections: null,
  streams: null,
  palSections: null,
  streamAccessPoint: null,
  pals: null,
  regionLoadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
