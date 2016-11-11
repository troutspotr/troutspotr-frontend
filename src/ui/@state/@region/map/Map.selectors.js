import { createSelector } from 'reselect'
import { isMapboxModuleLoadedSelector } from 'ui/core/MapboxModule.selectors'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
export const getMapCamera = state => state.map.camera
export const getMapGround = state => state.map.ground
export const getMapSettings = state => state.map.settings
export const getMapInteractivity = state => state.map.interactivity

const emptyGeoJson = {
  type: 'FeatureCollection',
  features: []
}

export const isReadyToInsertLayersSelector = createSelector(
  [isMapboxModuleLoadedSelector, getMapInteractivity],
  (isMapboxModuleLoaded, interactivity) => {
    let isDataReady = true
    let isMapModuleLoaded = isMapboxModuleLoaded === LOADING_CONSTANTS.IS_SUCCESS
    let result = isDataReady && isMapModuleLoaded && interactivity.isMapInitialized
    return result
  })
