import { createSelector } from 'reselect'
import { isMapboxModuleLoadedSelector } from 'ui/core/MapboxModule.selectors'
import { regionLoadingStatusSelector } from 'ui/routes/@usState/@region/Region.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { ICameraReduxState } from './Map.redux.camera'
import { IMapInteractivity } from './Map.redux.interactivity'
import { LoadingStatus } from 'coreTypes/Ui'

export const getMapCameraSelector = (reduxState: IReduxState): ICameraReduxState =>
  reduxState.map.camera
export const getMapInteractivitySelector = (reduxState: IReduxState): IMapInteractivity =>
  reduxState.map.interactivity

export const isReadyToInsertLayersSelector = createSelector(
  [isMapboxModuleLoadedSelector, getMapInteractivitySelector, regionLoadingStatusSelector],
  (isMapboxModuleLoaded, interactivity) => {
    const isMapModuleLoaded = isMapboxModuleLoaded === LoadingStatus.Success
    const result = isMapModuleLoaded && interactivity.isMapInitialized
    return result
  }
)
