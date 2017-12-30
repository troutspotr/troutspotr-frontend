import {createSelector} from 'reselect'
import {isMapboxModuleLoadedSelector} from 'ui/core/MapboxModule.selectors'
import {LOADING_CONSTANTS} from 'ui/core/LoadingConstants'
import {regionLoadingStatusSelector} from 'ui/@state/@region/Region.selectors'
// Import { displayedStreamCentroidDataSelector } from 'ui/@state/State.selectors'
export const getMapCameraSelector = (state) => state.map.camera
export const getMapGroundSelector = (state) => state.map.ground
export const getMapSettingsSelector = (state) => state.map.settings
export const getMapInteractivitySelector = (state) => state.map.interactivity

export const isReadyToInsertLayersSelector = createSelector(
  [
    isMapboxModuleLoadedSelector,
    getMapInteractivitySelector,
    regionLoadingStatusSelector,
  ],
  (isMapboxModuleLoaded, interactivity) => {
    // Let isDataReady = regionStatus === LOADING_CONSTANTS.IS_SUCCESS
    const isMapModuleLoaded = isMapboxModuleLoaded === LOADING_CONSTANTS.IS_SUCCESS
    const result = isMapModuleLoaded && interactivity.isMapInitialized
    return result
  })
