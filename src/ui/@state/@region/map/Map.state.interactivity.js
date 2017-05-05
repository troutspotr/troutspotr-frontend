'use strict'
import { createAction, handleActions } from 'redux-actions'
import extent from 'turf-extent'
import turfCircle from 'turf-circle'
// import { getSelectedStateProperties } from '../sidebar/Sidebar.selectors'
import { mapCameraActions, BOUNDING_BOX_OF_LOWER_48_STATES } from './Map.state.camera'
// ------------------------------------
// Constants
// ------------------------------------

const TURF_CIRCLE_RADIUS_KM = 0.042
const TURF_CIRCLE_SIDES = 4

export const MAP_INTERACTIVITY_SET_SELECTED_FEATURES = 'MAP_INTERACTIVITY_SET_SELECTED_FEATURES'
export const MAP_INTERACTIVITY_SET_SELECTED_FEATURE_COLLECTION = 'MAP_INTERACTIVITY_SET_SELECTED_FEATURE_COLLECTION'
export const MAP_INTERACTIVITY_IS_MAP_INITIALIZED = 'MAP_INTERACTIVITY_IS_MAP_INITIALIZED'
export const MAP_INTERACTIVITY_RESET_MAP = 'MAP_INTERACTIVITY_RESET_MAP'

// ------------------------------------
// Default State
// ------------------------------------
const DEFAULT_SETTINGS_STATE = {
  selectedItems: [],
  isMapInitialized: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const setSelectedFeatures = createAction(MAP_INTERACTIVITY_SET_SELECTED_FEATURES)
export const setSelectedFeatureCollection = createAction(MAP_INTERACTIVITY_SET_SELECTED_FEATURE_COLLECTION)
export const setIsMapInitialized = createAction(MAP_INTERACTIVITY_IS_MAP_INITIALIZED, isMapInitialized => {
  return { isMapInitialized }
})

export const selectMapFeature = (feature) => {
  return (dispatch, getState) => {
    let selectedState = feature
    let boundingBox = extent(selectedState)

    let newCorners = [
        [boundingBox[0], boundingBox[1]],
        [boundingBox[2], boundingBox[3]]
    ]
    let newCamera = { bounds: newCorners, bearing: 0 }
    dispatch(mapCameraActions.setCamera(newCamera))
    // dispatch(mapCameraActions.setCameraBounds(selectedBounds))
  }
}

export const selectFoculPoint = (feature) => {
  return (dispatch, getState) => {
    if (feature == null) {
      throw new Error('feature cannot be null')
    }

    let selectedState = turfCircle(feature, TURF_CIRCLE_RADIUS_KM, TURF_CIRCLE_SIDES)
    let boundingBox = extent(selectedState)
    let newCorners = [
        [boundingBox[0], boundingBox[1]],
        [boundingBox[2], boundingBox[3]]
    ]
    let newCamera = { bounds: newCorners, bearing: 60 }
    dispatch(mapCameraActions.setCamera(newCamera))
  }
}

// set the map to the widest allowable bounds of the entire
// given feature collection.  Escapes gracefully if there's
// zilch zero nada loaded.
export const resetMap = () => {
  return (dispatch, getState) => {
    dispatch(mapCameraActions.setCameraBounds({ bounds: BOUNDING_BOX_OF_LOWER_48_STATES }))
  }
}

export const mapInteractivityActions = {
  selectMapFeature,
  setIsMapInitialized,
  resetMap
}

var actionHandlers = {
  [MAP_INTERACTIVITY_SET_SELECTED_FEATURES]: (state, { payload: { featureCollection } }) => {
    // check if feature
    let selectedItems
    if (featureCollection == null || featureCollection.features == null || featureCollection.features.length === 0) {
      selectedItems = DEFAULT_SETTINGS_STATE.selectedItems
    } else {
      selectedItems = [featureCollection]
    }

    return { ...state, selectedItems }
  },
  [MAP_INTERACTIVITY_SET_SELECTED_FEATURE_COLLECTION]: (state, { payload: { featureCollection } }) => {
    let selectedItems
    if (featureCollection == null || featureCollection.features == null || featureCollection.features.length === 0) {
      selectedItems = DEFAULT_SETTINGS_STATE.selectedItems
    } else {
      selectedItems = [featureCollection]
    }

    return { ...state, selectedItems }
  },
  [MAP_INTERACTIVITY_IS_MAP_INITIALIZED]: (state, { payload: { isMapInitialized } }) => {
    return { ...state, isMapInitialized }
  }
}

export default handleActions(actionHandlers, DEFAULT_SETTINGS_STATE)
