import { getApi } from 'api/Api.module'
import isEmpty from 'lodash-es/isEmpty'
import { createAction, handleActions } from 'redux-actions'
import { selectedRegionSelector } from 'ui/core/Core.selectors'
import { selectFoculPoint, selectMapFeature } from 'ui/routes/map/Map.redux.interactivity'
import { getSelectedRoadSelector, selectedStreamObjectSelector } from './Region.selectors'
import { IGeoPackageOrWhatver } from 'api/region/Region.transform'
import { Dictionary } from 'lodash'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { LoadingStatus } from 'coreTypes/Ui'
import { updateCachedEndpoints } from 'ui/page/offline/Offline.redux'
import {
  AccessPointFeatureCollection,
  PalSectionFeatureCollection,
  RestrictionFeatureCollection,
  TroutStreamSectionFeatureCollection,
  StreamFeatureCollection,
  PalFeatureCollection,
} from 'api/region/IRegionGeoJSON'

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
export const REGION_SET_SELECTED_ROAD = 'REGION_SET_SELECTED_ROAD'
export const REGION_SET_HOVERED_STREAM = 'REGION_SET_HOVERED_STREAM'

export const setRegionData = createAction(
  REGION_SET_REGION_DATA,
  (region: IGeoPackageOrWhatver) => region
)
export const setRegionDataLoading = createAction(REGION_SET_REGION_LOADING)
export const setRegionDataFailed = createAction(REGION_SET_REGION_LOADING_FAILED)

export const setHoveredRoad = createAction(REGION_SET_HOVERED_ROAD, x => x)
export const setSelectedRoad = createAction(REGION_SET_SELECTED_ROAD, x => x)
export const setHoveredStream = createAction(REGION_SET_HOVERED_STREAM, x => x)

export const fetchRegionData = (stateName: string, regionName: string) => async (
  dispatch,
  getState
) => {
  dispatch(setRegionDataLoading())
  try {
    if (stateName == null) {
      throw new Error('stateName cannot be null')
    }

    if (regionName == null) {
      throw new Error('regionName cannot be null')
    }
    const { RegionApi } = await getApi()
    const gettingRegion = RegionApi.getRegionData(stateName, regionName)
    const regionData = await gettingRegion
    dispatch(setRegionData(regionData))
    updateCachedEndpoints()(dispatch)
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
    console.error(error) // eslint-disable-line
    dispatch(setRegionDataFailed())
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS: {} = {
  [REGION_SET_VIEW]: (state: IRegionState, { payload }): IRegionState => {
    const view = payload
    const newState = { ...state, ...{ view } }
    return newState
  },

  [REGION_SET_REGION_DATA]: (state: IRegionState, { payload }): IRegionState => {
    const newState = {
      ...state,

      ...{
        troutStreamDictionary: payload.streamDictionary,
        troutStreamSections: payload.trout_stream_section,
        restrictionSections: payload.restriction_section,
        streams: payload.streamProperties,
        palSections: payload.pal_routes,
        streamAccessPoint: payload.stream_access_point,
        pals: payload.pal,
        regionLoadingStatus: LoadingStatus.Success,
        hoveredStream: initialState.hoveredStream,
        hoveredRoad: initialState.hoveredRoad,
      },
    }
    return newState
  },
  [REGION_SET_REGION_LOADING]: (state: IRegionState, { payload }): IRegionState => {
    const newState = { ...state, ...{ regionLoadingStatus: LoadingStatus.Pending } }
    return newState
  },
  [REGION_SET_REGION_LOADING_FAILED]: (state: IRegionState, { payload }): IRegionState => {
    const newState = { ...state, ...{ regionLoadingStatus: LoadingStatus.Failed } }
    return newState
  },
  [REGION_SET_HOVERED_ROAD]: (state: IRegionState, { payload }): IRegionState => {
    const newState = { ...state, ...{ hoveredRoad: payload } }
    return newState
  },
  [REGION_SET_HOVERED_STREAM]: (state: IRegionState, { payload }): IRegionState => {
    const newState = { ...state, ...{ hoveredStream: payload } }
    return newState
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
export interface IRegionState {
  // View: MAP,
  troutStreamDictionary: Dictionary<IStreamObject>
  troutStreamSections: TroutStreamSectionFeatureCollection
  restrictionSections: RestrictionFeatureCollection
  streams: StreamFeatureCollection
  palSections: PalSectionFeatureCollection
  streamAccessPoint: AccessPointFeatureCollection
  pals: PalFeatureCollection
  hoveredStream: any
  // SelectedRoad: null,
  hoveredRoad: any
  regionLoadingStatus: LoadingStatus
}
const initialState: IRegionState = {
  // View: MAP,
  troutStreamDictionary: {},
  troutStreamSections: null,
  restrictionSections: null,
  streams: null,
  palSections: null,
  streamAccessPoint: null,
  pals: null,
  hoveredStream: null,
  // SelectedRoad: null,
  hoveredRoad: null,
  regionLoadingStatus: LoadingStatus.NotStarted,
}

export default handleActions(ACTION_HANDLERS, initialState)
