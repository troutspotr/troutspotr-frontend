import { createSelector } from 'reselect'
import { isMapboxModuleLoadedSelector } from 'ui/core/MapboxModule.selectors'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import { regionLoadingStatusSelector } from 'ui/routes/_state/_region/Region.selectors'
export const getMapCameraSelector = state => state.map.camera
export const getMapGroundSelector = state => state.map.ground
export const getMapSettingsSelector = state => state.map.settings
export const getMapInteractivitySelector = state => state.map.interactivity

export const isReadyToInsertLayersSelector = createSelector(
  [isMapboxModuleLoadedSelector, getMapInteractivitySelector, regionLoadingStatusSelector],
  (isMapboxModuleLoaded, interactivity) => {
    const isMapModuleLoaded = isMapboxModuleLoaded === LOADING_CONSTANTS.IS_SUCCESS
    const result = isMapModuleLoaded && interactivity.isMapInitialized
    return result
  }
)
