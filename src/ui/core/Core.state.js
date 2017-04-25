import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import TableOfContentsApi from 'api/TableOfContentsApi.js'
import { keyBy } from 'lodash'
import AnonymousAnalyzerApi from 'api/AnonymousAnalyzerApi'
import { updateCachedEndpoints } from 'ui/core/offline/Offline.state'
// ------------------------------------
// Constants
// ------------------------------------
export const MAP = 'map'
export const LIST = 'list'
export const REGION_SET_VIEW = 'REGION_SET_VIEW'
export const HAS_AGREED_TO_TERMS = 'HAS_AGREED_TO_TERMS'
export const SET_AGREEMENT_STATE = 'SET_AGREEMENT_STATE'
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
export const setAgreeToTerms = createAction(HAS_AGREED_TO_TERMS)
export const setAgreementState = createAction(SET_AGREEMENT_STATE)

const updateSearchTextAction = createAction(GEO_UPDATE_SEARCH_TEXT)
export const updateSearchText = (searchText) => {
  return async (dispatch) => {
    // TODO: debounce this and check for 3 character limit
    let sanitizedString = searchText == null ? '' : searchText.trim()
    dispatch(updateSearchTextAction(sanitizedString))
  }
}

export const agreeToTerms = (isAgreed) => {
  return (dispatch) => {
    let agreement = isAgreed ? 'true' : 'false'
    dispatch(setAgreeToTerms(agreement))
  }
}

export const fetchTableOfContents = () => {
  return async (dispatch) => {
    dispatch(setTableOfContentsLoading())
    try {
      let gettingTableOfContents = TableOfContentsApi.getTableOfContents()
      let [tableOfContents] = await Promise.all([gettingTableOfContents])
      dispatch(setTableOfContents(tableOfContents))
      dispatch(updateCachedEndpoints())
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
    AnonymousAnalyzerApi.recordEvent('view_change', { view: payload })
    let view = payload || initialState.view
    let newState = { ...state, ...{ view } }
    return newState
  },

  [GEO_SET_TABLE_OF_CONTENTS]: (state, { payload }) => {
    let newState = {
      ...state,

      ...{
        statesGeoJson: payload.states,
        statesDictionary: keyBy(payload.states.features, s => s.properties.short_name.toLowerCase()),

        countiesGeoJson: payload.counties,
        countyDictionary: keyBy(payload.counties.features, c => c.properties.gid),

        regionsGeoJson: payload.regions,
        regionDictionary: keyBy(payload.regions.features, r => r.properties.name.toLowerCase()),

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
  },
  [HAS_AGREED_TO_TERMS]: (state, { payload }) => {
    if (localStorage != null && localStorage.setItem != null) {
      try {
        localStorage.setItem(HAS_AGREED_TO_TERMS, payload)
      } catch (e) {
        console.log('could not store token; perhaps private mode?')
      }
    }

    let newState = { ...state, ...{ hasAgreedToTerms: payload === 'true' } }
    return newState
  },
  [SET_AGREEMENT_STATE]: (state, { payload }) => {
    // localStorage.setItem(HAS_AGREED_TO_TERMS, payload)

    let { view, time } = payload
    if (view == null || time == null) {
      throw new Error('view and time cannot be null')
    }

    if (view === 'intro') {
      let newState = { ...state, ...{ hasSeenIntroScreen: true } }
      AnonymousAnalyzerApi.recordEvent('agreement_update', { view, timeEllapsed: time })
      return newState
    } else if (view === 'termsOfService') {
      let newState = { ...state, ...{ hasSeenTermsOfService: true } }
      AnonymousAnalyzerApi.recordEvent('agreement_update', { view, timeEllapsed: time })
      return newState
    } else if (view === 'privacyPolicy') {
      let newState = { ...state, ...{ hasSeenPrivacyPolicy: true } }
      AnonymousAnalyzerApi.recordEvent('agreement_update', { view, timeEllapsed: time })
      return newState
    }
    return { ...state }
  }
}

const getHasAgreedToTerms = () => {
  if (localStorage == null) {
    return false
  }

  return localStorage.getItem(HAS_AGREED_TO_TERMS) === 'true'
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
  tableOfContentsLoadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED,
  hasSeenIntroScreen: false,
  hasSeenTermsOfService: false,
  hasSeenPrivacyPolicy: false,
  hasAgreedToTerms: getHasAgreedToTerms()
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
