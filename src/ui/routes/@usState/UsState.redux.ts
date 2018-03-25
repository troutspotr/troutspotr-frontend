// import StateApi from 'api/StateApi'
import { getApi } from 'api/Api.module'
import { IUsStateMetadata } from 'coreTypes/state/IUsState'
// import { updateCachedEndpoints } from 'ui/page/offline/Offline.redux'
import keyBy from 'lodash-es/keyBy'
import { createAction, handleActions } from 'redux-actions'
import { Dictionary } from 'lodash'
import { IStreamCentroid } from 'coreTypes/state/IStreamCentroid'
import { IRoadType } from 'coreTypes/state/IRoadType'
import { LoadingStatus } from 'coreTypes/Ui'
// ------------------------------------
// Constants
// ------------------------------------
// Export const MAP = 'map'
// Export const LIST = 'list'

export const REGION_SET_VIEW = 'REGION_SET_VIEW'
export interface IUsStateReduxState extends IUsStateMetadata {
  streamIdDictionary: Dictionary<IStreamCentroid>
  stateDataLoadingStatus: LoadingStatus
  slugDictionary: Dictionary<IStreamCentroid>
  roadTypesDictionary: Dictionary<IRoadType>
}
const INITIAL_US_STATE_STATE: IUsStateReduxState = {
  regionIndex: {},
  streamCentroids: [],
  regulations: [],
  roadTypes: [],
  palTypes: [],
  roadTypesDictionary: {},
  slugDictionary: {},
  streamIdDictionary: {},
  stateDataLoadingStatus: LoadingStatus.NotStarted,
  waterOpeners: [],
  version: null,
  releaseDate: null,
}

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

export const fetchStateData = (stateName: string) => async dispatch => {
  dispatch(setStateDataLoading())
  try {
    if (stateName == null) {
      throw new Error('stateName cannot be null')
    }
    const { StateApi } = await getApi()
    const gettingStateData = StateApi.getStateData(stateName)
    const [stateData] = await Promise.all([gettingStateData])
    dispatch(setStateData(stateData))
    // dispatch(updateCachedEndpoints())
  } catch (error) {
    console.error(error) // eslint-disable-line
    dispatch(setStateDataFailed())
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS: {} = {
  [REGION_SET_VIEW]: (state: IUsStateReduxState, { payload }): IUsStateReduxState => {
    const view = payload || INITIAL_US_STATE_STATE
    const newState = { ...state, ...{ view } }
    return newState
  },

  [STATE_SET_STATE_DATA]: (state: IUsStateReduxState, { payload }): IUsStateReduxState => {
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
        stateDataLoadingStatus: LoadingStatus.Success,
      },
    }
    return newState
  },
  [STATE_SET_STATE_LOADING]: (state: IUsStateReduxState, { payload }): IUsStateReduxState => {
    const newState = { ...state, ...{ stateDataLoadingStatus: LoadingStatus.Pending } }
    return newState
  },
  [STATE_SET_STATE_LOADING_FAILED]: (
    state: IUsStateReduxState,
    { payload }
  ): IUsStateReduxState => {
    const newState = { ...state, ...{ stateDataLoadingStatus: LoadingStatus.Failed } }
    return newState
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, INITIAL_US_STATE_STATE)
