import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
export const GPS_UPDATE_GPS_POSITION = 'GPS_UPDATE_GPS_POSITION'
export const GPS_ACTIVATE_GPS_TRACKING = 'GPS_ACTIVATE_GPS_TRACKING'
import { isGpsTrackingActiveStateSelector, isGpsTrackingSupportedStateSelector } from './Gps.selectors'
import AnonymousAnalyzerApi from 'api/AnonymousAnalyzerApi'

let GPS_WATCH_CALLBACK_ID = null
const MAX_TIMEOUT_LENGTH_MILLISECONDS = 20 * 1000
// const MPLS_COORDINATES = [-91.81467, 43.87948]
// const STUTTER_RANGE = 0.002
// const CENTER = -0.001

export const updateGpsPosition = createAction(GPS_UPDATE_GPS_POSITION, (
  longitude,
  latitude,
  status = LOADING_CONSTANTS.IS_SUCCESS,
  accuracy = 1) => {
  return {
    gpsCoordinates: [longitude, latitude],
    gpsCoordinatesLoadingStatus: status,
    isGpsTrackingActive: true,
    gpsAccuracyMeters: accuracy
  }
})

const throttleGpsUpdate = (dispatch, coordinates, accuracy = 1) => {
  let action = updateGpsPosition(coordinates[0], coordinates[1], LOADING_CONSTANTS.IS_SUCCESS, accuracy)
  // if (window.requestIdleCallback != null) {
  //   window.requestIdleCallback(() => {
  //     dispatch(action)
  //   })
  //   return
  // }

  if (window.requestAnimationFrame != null) {
    window.requestAnimationFrame(() => {
      dispatch(action)
    })
    return
  }
  dispatch(action)
}

export const startGpsTracking = () => {
  return async (dispatch, getState) => {
    AnonymousAnalyzerApi.recordEvent('start_gps', {})
    try {
      let state = getState()
      let isActive = isGpsTrackingActiveStateSelector(state)
      let isSupported = isGpsTrackingSupportedStateSelector(state)
      if (isActive || isSupported === false) {
        return
      }
      dispatch(activateGpsTracking())
      setTimeout(() => {
        GPS_WATCH_CALLBACK_ID = navigator.geolocation.watchPosition((position) => {
          console.log(position)
          let { latitude, longitude, accuracy } = position.coords
          throttleGpsUpdate(dispatch, [longitude, latitude], accuracy)
          // dispatch(updateGpsPosition(longitude, latitude, LOADING_CONSTANTS.IS_SUCCESS, accuracy))
        }, (error) => {
          console.log('gps error', error)
          dispatch(stopGpsTracking())
          dispatch(setGpsTrackingFailure())
        }, {
          enableHighAccuracy: true,
          timeout: MAX_TIMEOUT_LENGTH_MILLISECONDS
        })
      }, 1000)
      // setTimeout(() => {
      //   GPS_WATCH_CALLBACK_ID = setInterval(() => {
      //     let randomXCoordinate = Math.random() * STUTTER_RANGE + CENTER
      //     let randomYCoordinate = Math.random() * STUTTER_RANGE + CENTER
      //     let newCoordinates = [
      //       MPLS_COORDINATES[0] + randomXCoordinate,
      //       MPLS_COORDINATES[1] + randomYCoordinate
      //     ].map(x => x)
      //     throttleGpsUpdate(dispatch, newCoordinates, 1)
      //   }, 1000)
      // }, 1000)
    } catch (error) {
      dispatch(stopGpsTracking())
      dispatch(setGpsTrackingFailure())
    }
  }
}

export const stopGpsTracking = () => {
  return async (dispatch) => {
    AnonymousAnalyzerApi.recordEvent('stop_gps', {})
    navigator.geolocation.clearWatch(GPS_WATCH_CALLBACK_ID)
    clearInterval(GPS_WATCH_CALLBACK_ID)
    dispatch(deactivateGpsTracking())
  }
}

export const activateGpsTracking = createAction(GPS_UPDATE_GPS_POSITION, () => {
  return {
    isGpsTrackingActive: true,
    gpsCoordinatesLoadingStatus: LOADING_CONSTANTS.IS_PENDING,
    gpsCoordinates: null
  }
})

export const deactivateGpsTracking = createAction(GPS_UPDATE_GPS_POSITION, () => {
  return {
    isGpsTrackingActive: false,
    gpsCoordinatesLoadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED,
    gpsCoordinates: null
  }
})

export const setGpsTrackingFailure = createAction(GPS_UPDATE_GPS_POSITION, () => {
  return {
    isGpsTrackingActive: false,
    gpsCoordinatesLoadingStatus: LOADING_CONSTANTS.IS_FAILED,
    gpsCoordinates: null
  }
})

const initialState = {
  isGpsTrackingActive: false,
  gpsCoordinatesLoadingStatus: LOADING_CONSTANTS.IS_NOT_STARTED,
  gpsCoordinates: null,
  isGpsTrackingSupported: ('geolocation' in navigator),
  gpsAccuracyMeters: 1
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GPS_UPDATE_GPS_POSITION] : (state, { payload }) => {
    let newState = { ...state, ...payload }
    return newState
  }
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
