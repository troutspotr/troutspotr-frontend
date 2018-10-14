import { selectedStateIdSelector, selectedRegionIdSelector } from 'ui/Location.selectors'
import extent from '@turf/bbox'
import turfCircle from '@turf/circle'
import { createAction, handleActions } from 'redux-actions'
import { BOUNDING_BOX_OF_LOWER_48_STATES, mapCameraActions } from './Map.redux.camera'
import { AllGeoJSON, Coord, featureCollection } from '@turf/helpers'
import { ACCESSPOINT_CIRCLE_LABEL_LAYER, ACCESSPOINT_CIRCLE_BORDER_LAYER, ACCESSPOINT_CIRCLE_LAYER } from './MapboxGlMap/styles/AccessPoints.layers';
import { STREAM_LAYER_ID, TROUT_SECTION_LAYER_ID } from './MapboxGlMap/styles/Stream.layers';
import { streamAccessPointIdDictionarySelector, troutStreamDictionarySelector } from '../@usState/@region/Region.selectors';
import { browserHistory } from 'react-router';
// ------------------------------------
// Constants
// ------------------------------------

const TURF_CIRCLE_RADIUS_KM = 0.16
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

export const navigateToStream = (streamGid: number) => (dispatch, getState) => {
  const reduxState = getState()
  const troutStreamDictionary = troutStreamDictionarySelector(reduxState)

  const streamObject = troutStreamDictionary[streamGid]
  if (streamObject == null) {
    console.error(`could not find stream id ${streamGid}`)
    return
  }
  const { stream } = streamObject
  const url = `/${selectedStateIdSelector(reduxState)}/${selectedRegionIdSelector(reduxState)}/${stream.properties.slug}`
  browserHistory.push(url)
  try {
    const allTroutSectionsOfSelectedStream = featureCollection(streamObject.sections as any)
    dispatch(selectMapFeature(allTroutSectionsOfSelectedStream))
  } catch(e) {
  }
}

export const navigateToAccessPoint = (accessPointGid: number) => (dispatch, getState) => {
  const reduxState = getState()
  const accessPointDictionary = streamAccessPointIdDictionarySelector(reduxState)
  const troutStreamDictionary = troutStreamDictionarySelector(reduxState)
  
  const accessPoint = accessPointDictionary[accessPointGid]
  if (accessPoint == null) {
    console.error(`could not find accessPoint id ${accessPointGid}`)
    return
  }

  const {
    stream_gid = null
  } = accessPoint.properties

  if (stream_gid == null || troutStreamDictionary[stream_gid] == null) {
    console.error(`could not find stream_gid of ${stream_gid}`)
    return
  }
  const { stream } = troutStreamDictionary[stream_gid]
  const url = `/${selectedStateIdSelector(reduxState)}/${selectedRegionIdSelector(reduxState)}/${stream.properties.slug}#${accessPoint.properties.slug}`
  browserHistory.push(url)

  try {
    dispatch(selectFoculPoint([accessPoint.properties.centroid_longitude, accessPoint.properties.centroid_latitude]))
  } catch(e) {
  }
}

export const handleFeatureSelection = (features: {[key:string]: AllGeoJSON[] }) => (dispatch, getState) => {
  const mostImportantFeatureId = findMostImportantFeatureThatWasClicked(features)
  if (mostImportantFeatureId == null || LAYERS_IN_ORDER_OF_PRIORITY[mostImportantFeatureId] == null) {
    return
  }

  const type = LAYERS_IN_ORDER_OF_PRIORITY[mostImportantFeatureId]
  const asdfasdf = features[mostImportantFeatureId][0].properties.gid
  navigateOracle[type](asdfasdf)(dispatch, getState)
}

const navigateOracle = {
  'accessPoint': navigateToAccessPoint,
  'stream': navigateToStream,
}

export const LAYERS_IN_ORDER_OF_PRIORITY = {
  [ACCESSPOINT_CIRCLE_LABEL_LAYER]: 'accessPoint',
  [ACCESSPOINT_CIRCLE_BORDER_LAYER]: 'accessPoint',
  [ACCESSPOINT_CIRCLE_LAYER]: 'accessPoint',
  [STREAM_LAYER_ID]: 'stream',
  // [TROUT_SECTION_LAYER_ID]: 'stream',
  // [`${TROUT_SECTION_LAYER_ID}_DEACTIVATED`]: 'stream',
}

export const findMostImportantFeatureThatWasClicked = (featureLookupTable: {[key:string]: AllGeoJSON[] }) => {
  if (featureLookupTable == null) {
    return null
  }
  const keyValue = Object.entries(LAYERS_IN_ORDER_OF_PRIORITY)
    .find(([layerIdKey, type]) => {
      const lookupValue = featureLookupTable[layerIdKey]
      return lookupValue != null
    })

  return keyValue == null
    ? null
    : keyValue[0]
}

export const selectMapFeature = (feature: AllGeoJSON) => (dispatch, getState) => {
  if (feature == null) {
    console.error('cannot zoom on null feature.')
    return
  }
  const selectedState = feature
  const boundingBox = extent(selectedState)

  const newCorners = [[boundingBox[0], boundingBox[1]], [boundingBox[2], boundingBox[3]]]
  const newCamera = { bounds: newCorners, pitch: 0 }
  dispatch(mapCameraActions.setCamera(newCamera))
}

export const selectFoculPoint = (feature: Coord) => (dispatch, getState) => {
  if (feature == null) {
    throw new Error('feature cannot be null')
  }
  const selectedState = turfCircle(feature, TURF_CIRCLE_RADIUS_KM)
  const boundingBox = extent(selectedState)
  const newCorners = [[boundingBox[0], boundingBox[1]], [boundingBox[2], boundingBox[3]]]
  const newCamera = { bounds: newCorners, pitch: 60 }
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
