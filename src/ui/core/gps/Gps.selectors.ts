import { point } from '@turf/helpers'
import isEmpty from 'lodash-es/isEmpty'
import { createSelector } from 'reselect'
import { LOADING_CONSTANTS, Loading } from 'ui/core/LoadingConstants'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'

export const isGpsTrackingActiveStateSelector = (reduxState: IReduxState): boolean =>
  reduxState.gps.isGpsTrackingActive
export const gpsCoordinatesLoadingStatusStateSelector = (reduxState: IReduxState): Loading =>
  reduxState.gps.gpsCoordinatesLoadingStatus
export const gpsCoordinatesStateSelector = (reduxState: IReduxState): [number, number] =>
  reduxState.gps.gpsCoordinates
export const isGpsTrackingSupportedStateSelector = (reduxState: IReduxState): boolean =>
  reduxState.gps.isGpsTrackingSupported
export const gpsAccuracyMetersStateSelector = (reduxState: IReduxState): number =>
  reduxState.gps.gpsAccuracyMeters

const emptyMessage = ''
const getMessage = (loadingStatus): string => {
  if (loadingStatus === LOADING_CONSTANTS.IS_PENDING) {
    return 'Loading location'
  } else if (loadingStatus === LOADING_CONSTANTS.IS_FAILED) {
    return 'Failed to load location'
  } else if (loadingStatus === LOADING_CONSTANTS.IS_NOT_STARTED) {
    return 'Location not loaded yet'
  }

  return emptyMessage
}

export const getGpsCoordinateFeatureSelector = createSelector(
  [
    isGpsTrackingSupportedStateSelector,
    isGpsTrackingActiveStateSelector,
    gpsCoordinatesLoadingStatusStateSelector,
    gpsCoordinatesStateSelector,
    gpsAccuracyMetersStateSelector,
  ],
  (isGpsSupported, isGpsActive, loadingStatus, gpsCoordinates, accuracy) => {
    if (isGpsSupported === false || isGpsActive === false) {
      return null
    }

    if (isEmpty(gpsCoordinates) || gpsCoordinates[0] == null || gpsCoordinates[0] == null) {
      return null
    }
    const message = getMessage(loadingStatus)
    const props = {
      message,
      loadingStatus,
      accuracy,
    }

    const feature = point(gpsCoordinates, props)
    return feature
  }
)

export const isGpsFailedSelector = createSelector(
  [gpsCoordinatesLoadingStatusStateSelector],
  loadingStatus => loadingStatus === Loading.Failed
)

export const getIsGpsActiveButLoading = createSelector(
  [
    gpsCoordinatesLoadingStatusStateSelector,
    isGpsTrackingActiveStateSelector,
    isGpsTrackingSupportedStateSelector,
  ],
  (loadingStatus, isActive, isSupported) => {
    if (isSupported === false) {
      return false
    }

    if (isActive && loadingStatus === Loading.Pending) {
      return true
    }

    return false
  }
)

export const getIsActiveAndSuccessful = createSelector(
  [
    gpsCoordinatesLoadingStatusStateSelector,
    isGpsTrackingActiveStateSelector,
    isGpsTrackingSupportedStateSelector,
  ],
  (loadingStatus, isActive, isSupported) => {
    if (isSupported === false) {
      return false
    }

    if (isActive && loadingStatus === Loading.Success) {
      return true
    }

    return false
  }
)
