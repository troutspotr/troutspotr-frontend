import clamp from 'lodash-es/clamp'
import some from 'lodash-es/some'
import { createAction, handleActions } from 'redux-actions'
// import { ICameraReduxState } from 'ui/redux/Store.redux.rootReducer'
// ------------------------------------
// Constants
// ------------------------------------
export const BOUNDING_BOX_OF_LOWER_48_STATES = [[-124.763068, 24.544701], [-66.949895, 49.384358]]
export const MAP_CAMERA_SET_BOUNDS = 'MAP_CAMERA_SET_BOUNDS'
export const MAP_CAMERA_SET_BEARING = 'MAP_CAMERA_SET_BEARING'
export const MAP_CAMERA_SET_ANGLE = 'MAP_CAMERA_SET_ANGLE'
export const MAP_CAMERA_SET_PIXEL_BUFFER = 'MAP_CAMERA_SET_PIXEL_BUFFER'
export const MAP_CAMERA_SET_ANIMATION_SPEED = 'MAP_CAMERA_SET_ANIMATION_SPEED'
export const MAP_CAMERA_SET_CAMERA = 'MAP_CAMERA_SET_CAMERA'

// ------------------------------------
// Default State
// ------------------------------------
export interface ICameraReduxState {
  bounds: number[][]
  bearing: number
  pitch: number
  pixelBuffer: number
  animationSpeed: number
}
export const DEFAULT_CAMERA_STATE: ICameraReduxState = {
  bounds: BOUNDING_BOX_OF_LOWER_48_STATES,
  bearing: 0.0,
  pitch: 0.0,
  pixelBuffer: 10,
  animationSpeed: 1.3,
}

// ------------------------------------
// Actions
// ------------------------------------
export const setCameraBounds = createAction(MAP_CAMERA_SET_BOUNDS, x => x)
export const setCameraBearing = createAction(MAP_CAMERA_SET_BEARING, x => x)
export const setCameraAngle = createAction(MAP_CAMERA_SET_ANGLE, x => x)
export const setCameraPixelBuffer = createAction(MAP_CAMERA_SET_PIXEL_BUFFER, x => x)
export const setCameraAnimationSpeed = createAction(MAP_CAMERA_SET_ANIMATION_SPEED, x => x)
export const setCamera = createAction(MAP_CAMERA_SET_CAMERA, x => x)

export const mapCameraActions = {
  setCameraBounds,
  setCameraBearing,
  setCameraAngle,
  setCameraPixelBuffer,
  setCameraAnimationSpeed,
  setCamera,
}

const MERCATOR_PROJECTION_BOUNDS = {
  longitude: [-180, 180],
  latitude: [-85, 85],
}

const cleanBounds = (minLong, minLat, maxLong, maxLat) => {
  ;[minLong, minLat, maxLong, maxLat] = [minLong, minLat, maxLong, maxLat].map(x => parseFloat(x))
  const isInvalid = some([minLong, minLat, maxLong, maxLat], isNaN)
  if (isInvalid) {
    return null
  }

  const bounds = [
    [
      clamp(
        minLong,
        MERCATOR_PROJECTION_BOUNDS.longitude[0],
        MERCATOR_PROJECTION_BOUNDS.longitude[1]
      ),
      clamp(minLat, MERCATOR_PROJECTION_BOUNDS.latitude[0], MERCATOR_PROJECTION_BOUNDS.latitude[1]),
    ],
    [
      clamp(
        maxLong,
        MERCATOR_PROJECTION_BOUNDS.longitude[0],
        MERCATOR_PROJECTION_BOUNDS.longitude[1]
      ),
      clamp(maxLat, MERCATOR_PROJECTION_BOUNDS.latitude[0], MERCATOR_PROJECTION_BOUNDS.latitude[1]),
    ],
  ]

  return bounds
}

const actionHandlers: {} = {
  MAP_CAMERA_SET_BOUNDS: (state: ICameraReduxState, { payload }): ICameraReduxState => {
    const { bounds } = payload
    const isBoundsValid = bounds != null && bounds.length === 2
    if (isBoundsValid === false) {
      return state
    }

    const cleanedBounds = cleanBounds(bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1])
    if (cleanedBounds == null) {
      return state
    }

    return { ...state, bounds: cleanedBounds }
  },

  MAP_CAMERA_SET_BEARING: (state: ICameraReduxState, { payload }): ICameraReduxState => {
    const newState = { ...state }
    newState.bearing = payload
    return newState
  },

  MAP_CAMERA_SET_ANGLE: (state: ICameraReduxState, { payload }): ICameraReduxState => {
    // Return { ...state, angle: clamp(payload, 0, 360) }
    const newState = { ...state }
    newState.pitch = clamp(payload, 0, 360)
    return newState
  },

  MAP_CAMERA_SET_PIXEL_BUFFER: (
    state: ICameraReduxState,
    { payload: { pixelBuffer } }
  ): ICameraReduxState => ({
    ...state,
    pixelBuffer: clamp(pixelBuffer, 0, 500),
  }),

  MAP_CAMERA_SET_CAMERA: (state: ICameraReduxState, { payload }): ICameraReduxState => {
    const newState = { ...state, ...payload }
    return newState
  },

  MAP_CAMERA_SET_ANIMATION_SPEED: (
    state: ICameraReduxState,
    { payload: { animationSpeed } }
  ): ICameraReduxState => ({
    ...state,
    animationSpeed: clamp(animationSpeed, 0.00001, 5),
  }),
}

export default handleActions(actionHandlers, DEFAULT_CAMERA_STATE)
