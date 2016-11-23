import { createSelector } from 'reselect'
import { isMapboxModuleLoadedSelector } from 'ui/core/MapboxModule.selectors'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import { regionLoadingStatusSelector } from 'ui/@state/@region/Region.selectors'
import { displayedStreamCentroidDataSelector } from 'ui/@state/State.selectors'
export const getMapCameraSelector = state => state.map.camera
export const getMapGroundSelector = state => state.map.ground
export const getMapSettingsSelector = state => state.map.settings
export const getMapInteractivitySelector = state => state.map.interactivity

const emptyGeoJson = {
  type: 'FeatureCollection',
  features: []
}

export const isReadyToInsertLayersSelector = createSelector(
  [isMapboxModuleLoadedSelector, getMapInteractivitySelector, regionLoadingStatusSelector],
  (isMapboxModuleLoaded, interactivity) => {
    // let isDataReady = regionStatus === LOADING_CONSTANTS.IS_SUCCESS
    let isMapModuleLoaded = isMapboxModuleLoaded === LOADING_CONSTANTS.IS_SUCCESS
    let result = isMapModuleLoaded && interactivity.isMapInitialized
    return result
  })

