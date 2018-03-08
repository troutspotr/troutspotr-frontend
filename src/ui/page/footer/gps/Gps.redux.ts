import { getApi } from 'api/Api.module'
import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import {
  isGpsTrackingActiveStateSelector,
  isGpsTrackingSupportedStateSelector,
} from './Gps.selectors'

export const GPS_UPDATE_GPS_POSITION = 'GPS_UPDATE_GPS_POSITION'
export const GPS_ACTIVATE_GPS_TRACKING = 'GPS_ACTIVATE_GPS_TRACKING'

const GPS_WATCH_CALLBACK_ID = null
const MAX_TIMEOUT_LENGTH_MILLISECONDS = 20 * 1000

export const updateGpsPosition = createAction(
  GPS_UPDATE_GPS_POSITION,
  ({ longitude, latitude, status = LOADING_CONSTANTS.IS_SUCCESS, accuracy = 1 }) => ({
    gpsCoordinates: [longitude, latitude],
    gpsCoordinatesLoadingStatus: status,
    isGpsTrackingActive: true,
    gpsAccuracyMeters: accuracy,
  })
)

const throttleGpsUpdate = (dispatch, coordinates, accuracy = 1) => {
  const boopus = {
    longitude: coordinates[0],
    latitude: coordinates[1],
    status: LOADING_CONSTANTS.IS_SUCCESS,
    accuracy,
  }
  const action = updateGpsPosition(boopus)
  if (window.requestAnimationFrame != null) {
    window.requestAnimationFrame(() => {
      dispatch(action)
    })
    return
  }
  dispatch(action)
}

export const startGpsTracking = () => async (dispatch, getState) => {
  try {
    getApi().then(({ AnonymousAnalyzerApi }) => {
      AnonymousAnalyzerApi.recordEvent('stop_gps', {})
    })
  } catch (error) {}
  try {
    const state = getState()
    const isActive = isGpsTrackingActiveStateSelector(state)
    const isSupported = isGpsTrackingSupportedStateSelector(state)
    if (isActive || isSupported === false) {
      return
    }
    dispatch(activateGpsTracking())
    setTimeout(() => {
      GPS_WATCH_CALLBACK_ID = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude, accuracy } = position.coords
          throttleGpsUpdate(dispatch, [longitude, latitude], accuracy)
        },
        error => {
          dispatch(stopGpsTracking())
          dispatch(setGpsTrackingFailure())
        },
        {
          enableHighAccuracy: true,
          timeout: MAX_TIMEOUT_LENGTH_MILLISECONDS,
        }
      )
    }, 1000)
    /* eslint-disable extra-rules/no-commented-out-code */
    // SetTimeout(() => {
    //   GPS_WATCH_CALLBACK_ID = setInterval(() => {
    //     Let randomXCoordinate = Math.random() * STUTTER_RANGE + CENTER
    //     Let randomYCoordinate = Math.random() * STUTTER_RANGE + CENTER
    //     Let newCoordinates = [
    //       MPLS_COORDINATES[0] + randomXCoordinate,
    //       MPLS_COORDINATES[1] + randomYCoordinate
    //     ].map(x => x)
    //     ThrottleGpsUpdate(dispatch, newCoordinates, 1)
    //   }, 1000)
    // }, 1000)
    /* eslint-enable extra-rules/no-commented-out-code */
  } catch (error) {
    dispatch(stopGpsTracking())
    dispatch(setGpsTrackingFailure())
  }
}

export const stopGpsTracking = () => async dispatch => {
  try {
    getApi().then(({ AnonymousAnalyzerApi }) => {
      AnonymousAnalyzerApi.recordEvent('stop_gps', {})
    })
  } catch (error) {}

  navigator.geolocation.clearWatch(GPS_WATCH_CALLBACK_ID)
  clearInterval(GPS_WATCH_CALLBACK_ID)
  dispatch(deactivateGpsTracking())
}

export const activateGpsTracking = createAction(GPS_UPDATE_GPS_POSITION, () => ({
  isGpsTrackingActive: true,
  gpsCoordinatesLoadingStatus: LOADING_CONSTANTS.IS_PENDING,
  gpsCoordinates: null,
}))

export const deactivateGpsTracking = createAction(GPS_UPDATE_GPS_POSITION, () => ({
  isGpsTrackingActive: false,
  gpsCoordinatesLoadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED,
  gpsCoordinates: null,
}))

export const setGpsTrackingFailure = createAction(GPS_UPDATE_GPS_POSITION, () => ({
  isGpsTrackingActive: false,
  gpsCoordinatesLoadingStatus: LOADING_CONSTANTS.IS_FAILED,
  gpsCoordinates: null,
}))

const initialState = {
  isGpsTrackingActive: false,
  gpsCoordinatesLoadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED,
  gpsCoordinates: null,
  isGpsTrackingSupported: 'geolocation' in navigator,
  gpsAccuracyMeters: 1,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GPS_UPDATE_GPS_POSITION]: (state, { payload }) => {
    const newState = { ...state, ...payload }
    return newState
  },
}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
