import { createAction } from 'redux-actions'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
export const GPS_UPDATE_GPS_POSITION = 'GPS_UPDATE_GPS_POSITION'
export const GPS_ACTIVATE_GPS_TRACKING = 'GPS_ACTIVATE_GPS_TRACKING'
import { isGpsTrackingActiveStateSelector, isGpsTrackingSupportedStateSelector } from './Gps.selectors'

const MPLS_COORDINATES = [-91.59273, 43.69093]
const STUTTER_RANGE = 0.0002
const CENTER = STUTTER_RANGE * -0.5
let GPS_WATCH_CALLBACK_ID = null
const MAX_TIMEOUT_LENGTH_MILLISECONDS = 20 * 1000

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

export const startGpsTracking = () => {
  return async (dispatch, getState) => {
    try {
      let state = getState()
      let isActive = isGpsTrackingActiveStateSelector(state)
      let isSupported = isGpsTrackingSupportedStateSelector(state)
      if (isActive || isSupported === false) {
        return
      }
      dispatch(activateGpsTracking())

      GPS_WATCH_CALLBACK_ID = navigator.geolocation.watchPosition((position) => {
        console.log(position)
        let { latitude, longitude, accuracy } = position.coords
        dispatch(updateGpsPosition(longitude, latitude, LOADING_CONSTANTS.IS_SUCCESS, accuracy))
      }, (error) => {
        console.log('gps error', error)
        alert(error.code)
        alert(error.message)
        dispatch(stopGpsTracking())
      }, {
        enableHighAccuracy: true,
        timeout: MAX_TIMEOUT_LENGTH_MILLISECONDS
      })
      // setTimeout(() => {
      //   GPS_WATCH_CALLBACK_ID = setInterval(() => {
      //     let randomXCoordinate = Math.random() * STUTTER_RANGE + CENTER
      //     let randomYCoordinate = Math.random() * STUTTER_RANGE + CENTER
      //     let newCoordiantes = [
      //       MPLS_COORDINATES[0] + randomXCoordinate,
      //       MPLS_COORDINATES[1] + randomYCoordinate
      //     ].map(x => x)

      //     dispatch(updateGpsPosition(newCoordiantes[0], newCoordiantes[1]))
      //   }, 20)
      // }, 300)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }
}

export const stopGpsTracking = () => {
  return async (dispatch) => {
    navigator.geolocation.clearWatch(GPS_WATCH_CALLBACK_ID)
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
