import extent from '@turf/bbox'
import turfCircle from '@turf/circle'
import { createAction, handleActions } from 'redux-actions'
import { BOUNDING_BOX_OF_LOWER_48_STATES, mapCameraActions } from './Map.redux.camera'
import { AllGeoJSON, Coord } from '@turf/helpers'
// ------------------------------------
// Constants
// ------------------------------------

const TURF_CIRCLE_RADIUS_KM = 0.042
export const MAP_INTERACTIVITY_SET_SELECTED_FEATURES = 'MAP_INTERACTIVITY_SET_SELECTED_FEATURES'
export const MAP_INTERACTIVITY_SET_SELECTED_FEATURE_COLLECTION =
  'MAP_INTERACTIVITY_SET_SELECTED_FEATURE_COLLECTION'
export const MAP_INTERACTIVITY_IS_MAP_INITIALIZED = 'MAP_INTERACTIVITY_IS_MAP_INITIALIZED'
export const MAP_INTERACTIVITY_RESET_MAP = 'MAP_INTERACTIVITY_RESET_MAP'

// ------------------------------------
// Default State
// ------------------------------------
export interface IMapInteractivity {
  isMapInitialized: boolean
  // tslint:disable-next-line:no-any
  selectedItems: any
}
export const DEFAULT_SETTINGS_STATE: IMapInteractivity = {
  selectedItems: [],
  isMapInitialized: false,
}

// ------------------------------------
// Actions
// ------------------------------------
export const setSelectedFeatures = createAction(MAP_INTERACTIVITY_SET_SELECTED_FEATURES)
export const setSelectedFeatureCollection = createAction(
  MAP_INTERACTIVITY_SET_SELECTED_FEATURE_COLLECTION
)
export const setIsMapInitialized = createAction(
  MAP_INTERACTIVITY_IS_MAP_INITIALIZED,
  isMapInitialized => ({ isMapInitialized })
)

export const selectMapFeature = (feature: AllGeoJSON) => (dispatch, getState) => {
  const selectedState = feature
  const boundingBox = extent(selectedState)

  const newCorners = [[boundingBox[0], boundingBox[1]], [boundingBox[2], boundingBox[3]]]
  const newCamera = { bounds: newCorners, bearing: 0 }
  dispatch(mapCameraActions.setCamera(newCamera))
}

export const selectFoculPoint = (feature: Coord) => (dispatch, getState) => {
  if (feature == null) {
    throw new Error('feature cannot be null')
  }

  const selectedState = turfCircle(feature, TURF_CIRCLE_RADIUS_KM)
  const boundingBox = extent(selectedState)
  const newCorners = [[boundingBox[0], boundingBox[1]], [boundingBox[2], boundingBox[3]]]
  const newCamera = { bounds: newCorners, bearing: 60 }
  dispatch(mapCameraActions.setCamera(newCamera))
}

// Set the map to the widest allowable bounds of the entire
// Given feature collection.  Escapes gracefully if there's
// Zilch zero nada loaded.
export const resetMap = () => (dispatch, getState) => {
  dispatch(mapCameraActions.setCameraBounds({ bounds: BOUNDING_BOX_OF_LOWER_48_STATES }))
}

export const mapInteractivityActions = {
  selectMapFeature,
  setIsMapInitialized,
  resetMap,
}

const actionHandlers: {} = {
  [MAP_INTERACTIVITY_IS_MAP_INITIALIZED]: (state, { payload: { isMapInitialized } }) => ({
    ...state,
    isMapInitialized,
  }),
}

export default handleActions(actionHandlers, DEFAULT_SETTINGS_STATE)