import { point, featureCollection, FeatureCollection } from '@turf/helpers'
import isEmpty from 'lodash-es/isEmpty'
import { createSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { LoadingStatus } from 'coreTypes/Ui'

export const isGpsTrackingActiveStateSelector = (reduxState: IReduxState): boolean =>
  reduxState.gps.isGpsTrackingActive
export const gpsCoordinatesLoadingStatusStateSelector = (reduxState: IReduxState): LoadingStatus =>
  reduxState.gps.gpsCoordinatesLoadingStatus
export const gpsCoordinatesStateSelector = (reduxState: IReduxState): [number, number] =>
  reduxState.gps.gpsCoordinates
export const isGpsTrackingSupportedStateSelector = (reduxState: IReduxState): boolean =>
  reduxState.gps.isGpsTrackingSupported
export const gpsAccuracyMetersStateSelector = (reduxState: IReduxState): number =>
  reduxState.gps.gpsAccuracyMeters

const emptyMessage = ''
const getMessage = (loadingStatus: LoadingStatus): string => {
  if (loadingStatus === LoadingStatus.Pending) {
    return 'Loading location'
  } else if (loadingStatus === LoadingStatus.Failed) {
    return 'Failed to load location'
  } else if (loadingStatus === LoadingStatus.NotStarted) {
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
  loadingStatus => loadingStatus === LoadingStatus.Failed
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

    if (isActive && loadingStatus === LoadingStatus.Pending) {
      return true
    }

    return false
  }
)

const emptyFeatureCollection = featureCollection([])
export const gpsFeatureCollectionSelector = createSelector(
  gpsCoordinatesStateSelector,
  isGpsFailedSelector,
  (coords: [number, number], isFailed: boolean): FeatureCollection<any, any> => {
    if (coords == null || isFailed) {
      return emptyFeatureCollection
    }

    const p = point(coords)
    return featureCollection([p])
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

    if (isActive && loadingStatus === LoadingStatus.Success) {
      return true
    }

    return false
  }
)
