import { createAction } from 'redux-actions'
import BaseApi from 'api/BaseApi'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
export const GPS_UPDATE_GPS_POSITION = 'GPS_UPDATE_GPS_POSITION'
export const GPS_ACTIVATE_GPS_TRACKING = 'GPS_ACTIVATE_GPS_TRACKING'
import { isGpsTrackingActiveStateSelector, isGpsTrackingSupportedStateSelector } from './Gps.selectors'

const MPLS_COORDINATES = [-93.268284, 44.963323]
const STUTTER_RANGE = 1
const CENTER = STUTTER_RANGE * -0.5
let FAKE_INTERVAL = null

export const updateGpsPosition = createAction(GPS_UPDATE_GPS_POSITION, (
  longitude,
  latitude,
  status = LOADING_CONSTANTS.IS_SUCCESS) => {
  return {
    gpsCoordinates: [longitude, latitude],
    gpsCoordinatesLoadingStatus: status,
    isGpsTrackingActive: true
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

      setTimeout(() => {
        FAKE_INTERVAL = setInterval(() => {
          let randomXCoordinate = Math.random() * STUTTER_RANGE - CENTER
          let randomYCoordinate = Math.random() * STUTTER_RANGE - CENTER
          let newCoordiantes = [
            MPLS_COORDINATES[0] + randomXCoordinate,
            MPLS_COORDINATES[1] + randomYCoordinate
          ].map(x => x)

          dispatch(updateGpsPosition(newCoordiantes[0], newCoordiantes[1]))
        }, 20)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }
}

export const stopGpsTracking = () => {
  return async (dispatch) => {
      clearInterval(FAKE_INTERVAL)
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
  isGpsTrackingSupported: ('geolocation' in navigator) ? true : false
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GPS_UPDATE_GPS_POSITION] : (state, { payload }) => {
    let newState = { ...state, ...payload }
    return newState
  },
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
