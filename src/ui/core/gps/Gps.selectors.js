import { createSelector } from 'reselect'
import { point } from '@turf/helpers'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import { isEmpty } from 'lodash'
export const isGpsTrackingActiveStateSelector = state => state.gps.isGpsTrackingActive
export const gpsCoordinatesLoadingStatusStateSelector = state => state.gps.gpsCoordinatesLoadingStatus
export const gpsCoordinatesStateSelector = state => state.gps.gpsCoordinates
export const isGpsTrackingSupportedStateSelector = state => state.gps.isGpsTrackingSupported
export const gpsAccuracyMetersStateSelector = state => state.gps.gpsAccuracyMeters

const getMessage = (loadingStatus) => {
  let message = ''
  if (loadingStatus === LOADING_CONSTANTS.IS_PENDING) {
    'Loading location'
  } else if (loadingStatus === LOADING_CONSTANTS.IS_FAILED) {
    'Failed to load location'
  } else if (loadingStatus === LOADING_CONSTANTS.IS_NOT_STARTED) {
    'Location not loaded yet'
  } else {
    message = ''
  }

  return message
}

export const getGpsCoordinateFeatureSelector = createSelector(
  [
    isGpsTrackingSupportedStateSelector,
    isGpsTrackingActiveStateSelector,
    gpsCoordinatesLoadingStatusStateSelector,
    gpsCoordinatesStateSelector,
    gpsAccuracyMetersStateSelector
  ],
  (isGpsSupported, isGpsActive, loadingStatus, gpsCoordinates, accuracy) => {
    if (isGpsSupported === false || isGpsActive === false) {
      return null
    }

    if (isEmpty(gpsCoordinates) || gpsCoordinates[0] == null || gpsCoordinates[0] == null) {
      return null
    }
    let message = getMessage(loadingStatus)
    let props = {
      message,
      loadingStatus,
      accuracy
    }

    let feature = point(gpsCoordinates, props)
    return feature
  })

export const isGpsFailedSelector = createSelector(
  [gpsCoordinatesLoadingStatusStateSelector],
  (loadingStatus) => {
    return loadingStatus === LOADING_CONSTANTS.IS_FAILED
  })

export const getIsGpsActiveButLoading = createSelector(
  [gpsCoordinatesLoadingStatusStateSelector, isGpsTrackingActiveStateSelector, isGpsTrackingSupportedStateSelector],
  (loadingStatus, isActive, isSupported) => {
    if (isSupported === false) {
      return false
    }

    if (isActive && loadingStatus === LOADING_CONSTANTS.IS_PENDING) {
      return true
    }

    return false
  })

export const getIsActiveAndSuccessful = createSelector(
  [gpsCoordinatesLoadingStatusStateSelector, isGpsTrackingActiveStateSelector, isGpsTrackingSupportedStateSelector],
  (loadingStatus, isActive, isSupported) => {
    if (isSupported === false) {
      return false
    }

    if (isActive && loadingStatus === LOADING_CONSTANTS.IS_SUCCESS) {
      return true
    }

    return false
  })
