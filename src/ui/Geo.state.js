import GeoApi from 'api/GeoApi'
import GeoApiWebWorker from 'api/GeoApi.worker'
import { transformGeo } from 'api/GeoApi.transform'
import work from 'webworkify-webpack'
// import {TextEncoder, TextDecoder, EncodingIndexes} from 'text-encoding';
// import CategoriesApi from 'api/CategoriesApi'
import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
export const GEO_SET_GEO = 'GEO_SET_GEO'
export const GEO_SET_LOADING = 'GEO_SET_LOADING'
export const GEO_SET_LOADING_FAILED = 'GEO_SET_LOADING_FAILED'

export const setGeoData = createAction(GEO_SET_GEO)
export const setGeoDataLoading = createAction(GEO_SET_LOADING)
export const setGeoDataFailed = createAction(GEO_SET_LOADING_FAILED)

export const fetchGeo = (stateId) => {
  return async (dispatch) => {
    dispatch(setGeoDataLoading())
    try {
      console.log('doin thangs')
      let gettingGeoData = GeoApi.getStateStreamData(stateId)
      let [geoData] = await Promise.all([gettingGeoData])
      console.log('got thangs')
      let transformedGeoJson = transformGeo(geoData)
      dispatch(setGeoData({ transformedGeoJson, categories: null }))
    } catch (error) {
      console.log(error)
      dispatch(setGeoDataFailed())
    }
  }
}

export const fetchGeoViaWebWorker = (stateId) => {
  return async (dispatch) => {
    dispatch(setGeoDataLoading())
    try {
      let webWorker = work(GeoApiWebWorker)
      webWorker.addEventListener('error', () => {
        dispatch(setGeoDataFailed())
      }, false)

      webWorker.addEventListener('message', function (ev) {
        let string = ev.data
        let results = JSON.parse(string)
        dispatch(setGeoData(results))
      })
      webWorker.postMessage(stateId)
      // let gettingProfile = GeoApi.getStateStreamData(stateId)
      // let [profile] = await Promise.all([gettingProfile])
    } catch (error) {
      console.log(error)
      dispatch(setGeoDataFailed())
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GEO_SET_GEO]: (state, { payload }) => {
    // let desiredProfile = payload.profile
    console.log('finished')
    let newState = {
      ...state,

      ...{
      //   company: desiredProfile,
      //   categories: payload.categories,
        streamDictionary: payload,
        loadingStatus: LOADING_CONSTANTS.IS_SUCCESS
      }
    }
    return newState
  },
  [GEO_SET_LOADING]: (state, { payload }) => {
    console.log('loading')
    let newState = { ...state, ...{ loadingStatus: LOADING_CONSTANTS.IS_PENDING } }
    return newState
  },
  [GEO_SET_LOADING_FAILED]: (state, { payload }) => {
    console.log('failed')
    let newState = { ...state, ...{ loadingStatus: LOADING_CONSTANTS.IS_FAILED } }
    return newState
  }
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

  loadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED
}

export default function profileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
