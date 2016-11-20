import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import TableOfContentsApi from 'api/TableOfContentsApi.js'
import { keyBy, lowerCase } from 'lodash'

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

export const GEO_SET_TABLE_OF_CONTENTS = 'GEO_SET_TABLE_OF_CONTENTS'
export const GEO_TABLE_OF_CONTENTS_LOADING = 'GEO_TABLE_OF_CONTENTS_LOADING'
export const GEO_TABLE_OF_CONTENTS_LOADING_FAILED = 'GEO_TABLE_OF_CONTENTS_LOADING_FAILED'
export const GEO_UPDATE_SEARCH_TEXT = 'GEO_UPDATE_SEARCH_TEXT'

export const setTableOfContents = createAction(GEO_SET_TABLE_OF_CONTENTS)
export const setTableOfContentsLoading = createAction(GEO_TABLE_OF_CONTENTS_LOADING)
export const setTableOfContentsFailed = createAction(GEO_TABLE_OF_CONTENTS_LOADING_FAILED)

const updateSearchTextAction = createAction(GEO_UPDATE_SEARCH_TEXT)
export const updateSearchText = (searchText) => {
  return async (dispatch) => {
    // TODO: debounce this and check for 3 character limit
    dispatch(updateSearchTextAction(searchText))
  }
}

export const fetchTableOfContents = () => {
  return async (dispatch) => {
    dispatch(setTableOfContentsLoading())
    try {
      let gettingTableOfContents = TableOfContentsApi.getTableOfContents()
      let [tableOfContents] = await Promise.all([gettingTableOfContents])
      dispatch(setTableOfContents(tableOfContents))
    } catch (error) {
      console.log(error)
      dispatch(setTableOfContentsFailed())
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

  [GEO_SET_TABLE_OF_CONTENTS]: (state, { payload }) => {
    let newState = {
      ...state,

      ...{
        statesGeoJson: payload.states,
        statesDictionary: keyBy(payload.states.features, s => lowerCase(s.properties.short_name)),

        countiesGeoJson: payload.counties,
        countyDictionary: keyBy(payload.counties.features, c => lowerCase(c.properties.gid)),

        regionsGeoJson: payload.regions,
        regionDictionary: keyBy(payload.regions.features, r => lowerCase(r.properties.name)),

        streamCentroidsGeoJson: payload.streamCentroids,
        tableOfContentsLoadingStatus: LOADING_CONSTANTS.IS_SUCCESS
      }
    }
    return newState
  },
  [GEO_TABLE_OF_CONTENTS_LOADING]: (state, { payload }) => {
    let newState = { ...state, ...{ tableOfContentsLoadingStatus: LOADING_CONSTANTS.IS_PENDING } }
    return newState
  },
  [GEO_TABLE_OF_CONTENTS_LOADING_FAILED]: (state, { payload }) => {
    let newState = { ...state, ...{ tableOfContentsLoadingStatus: LOADING_CONSTANTS.IS_FAILED } }
    return newState
  },
  [GEO_UPDATE_SEARCH_TEXT]: (state, { payload }) => {
    let newState = { ...state, ...{ searchText: payload } }
    return newState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  view: LIST,
  isMapModuleLoaded: false,
  isMapReadyToDisplay: false,
  searchText: '',
  statesGeoJson: {},
  statesDictionary: {},
  countiesGeoJson: {},
  regionsGeoJson: {},
  tableOfContentsLoadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
