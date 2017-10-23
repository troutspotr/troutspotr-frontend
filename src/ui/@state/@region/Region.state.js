import {createAction} from 'redux-actions'
import {LOADING_CONSTANTS} from 'ui/core/LoadingConstants'
import RegionApi from 'api/RegionApi'
import {isEmpty} from 'lodash'
import {selectedRegionSelector} from 'ui/core/Core.selectors'
import {getSelectedRoadSelector, selectedStreamObjectSelector} from './Region.selectors'
import {selectFoculPoint, selectMapFeature} from 'ui/@state/@region/map/Map.state.interactivity'

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

export const REGION_SET_REGION_DATA = 'REGION_SET_REGION_DATA'
export const REGION_SET_REGION_LOADING = 'REGION_SET_REGION_LOADING'
export const REGION_SET_REGION_LOADING_FAILED = 'REGION_SET_REGION_LOADING_FAILED'
export const REGION_SET_HOVERED_ROAD = 'REGION_SET_HOVERED_ROAD'
// Export const REGION_SET_SELECTED_ROAD = 'REGION_SET_SELECTED_ROAD'
export const REGION_SET_HOVERED_STREAM = 'REGION_SET_HOVERED_STREAM'

export const setRegionData = createAction(REGION_SET_REGION_DATA)
export const setRegionDataLoading = createAction(REGION_SET_REGION_LOADING)
export const setRegionDataFailed = createAction(REGION_SET_REGION_LOADING_FAILED)

export const setHoveredRoad = createAction(REGION_SET_HOVERED_ROAD)
// Export const setSelectedRoad = createAction(REGION_SET_SELECTED_ROAD)
export const setHoveredStream = createAction(REGION_SET_HOVERED_STREAM)

export const fetchRegionData = (stateName, regionName) => async (dispatch, getState) => {
  dispatch(setRegionDataLoading())
  try {
    if (stateName == null) {
      throw new Error('stateName cannot be null')
    }

    if (regionName == null) {
      throw new Error('regionName cannot be null')
    }

    const gettingRegion = RegionApi.getRegionData(stateName, regionName)
    const [regionData] = await Promise.all([gettingRegion])
    dispatch(setRegionData(regionData))
    // Get selectedRegion and fly to coordinates
    const state = getState()
    const selectedRegion = selectedRegionSelector(state)
    if (selectedRegion == null || isEmpty(selectedRegion)) {
      return
    }

    // Determine where to go. this might not be the best place to determine this.
    const selectedStream = selectedStreamObjectSelector(state)
    const selectedRoad = getSelectedRoadSelector(state)
    const isStreamSelected = isEmpty(selectedStream) === false && isEmpty(selectedRoad)
    const isRoadSelected = isEmpty(selectedStream) === false && isEmpty(selectedRoad) === false

    if (isStreamSelected) {
      setTimeout(() => dispatch(selectMapFeature(selectedStream.stream)), 300)
      return
    } else if (isRoadSelected) {
      setTimeout(() => dispatch(selectFoculPoint(selectedRoad)), 300)
      return
    }

    // Give the JS engine just a second to catch its breath before
    // Navigating. it gives a better appearance to the user.
    setTimeout(() => dispatch(selectMapFeature(selectedRegion)), 300)
  } catch (error) {
    console.log(error) // eslint-disable-line
    dispatch(setRegionDataFailed())
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGION_SET_VIEW]: (state, {payload}) => {
    const view = payload || initialState.view
    const newState = {...state, ...{view}}
    return newState
  },

  [REGION_SET_REGION_DATA]: (state, {payload}) => {
    const newState = {
      ...state,

      ...{
        'troutStreamDictionary': payload.streamDictionary,
        'troutStreamSections': payload.trout_stream_section,
        'restrictionSections': payload.restriction_section,
        'streams': payload.streamProperties,
        'palSections': payload.pal_routes,
        'streamAccessPoint': payload.stream_access_point,
        'pals': payload.pal,
        'regionLoadingStatus': LOADING_CONSTANTS.IS_SUCCESS,
        'hoveredStream': initialState.hoveredStream,
        'hoveredRoad': initialState.hoveredRoad,
      },
    }
    return newState
  },
  [REGION_SET_REGION_LOADING]: (state, {payload}) => {
    const newState = {...state, ...{'regionLoadingStatus': LOADING_CONSTANTS.IS_PENDING}}
    return newState
  },
  [REGION_SET_REGION_LOADING_FAILED]: (state, {payload}) => {
    const newState = {...state, ...{'regionLoadingStatus': LOADING_CONSTANTS.IS_FAILED}}
    return newState
  },
  [REGION_SET_HOVERED_ROAD]: (state, {payload}) => {
    const newState = {...state, ...{'hoveredRoad': payload}}
    return newState
  },
  [REGION_SET_HOVERED_STREAM]: (state, {payload}) => {
    const newState = {...state, ...{'hoveredStream': payload}}
    return newState
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  // View: MAP,
  'troutStreamDictionary': {},
  'troutStreamSections': null,
  'restrictionSections': null,
  'streams': null,
  'palSections': null,
  'streamAccessPoint': null,
  'pals': null,
  'hoveredStream': null,
  // SelectedRoad: null,
  'hoveredRoad': null,
  'regionLoadingStatus': LOADING_CONSTANTS.IS_NOT_STARTED,
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
