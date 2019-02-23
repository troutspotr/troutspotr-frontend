import clamp from 'lodash-es/clamp'
import some from 'lodash-es/some'
import { createAction, handleActions } from 'redux-actions'
import { number } from '@storybook/addon-knobs';
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
  animationDurationMs: number | null
  linear: boolean
  easing(x: number): number
}
export const DEFAULT_CAMERA_STATE: ICameraReduxState = {
  bounds: BOUNDING_BOX_OF_LOWER_48_STATES,
  bearing: 0.0,
  pitch: 0.0,
  pixelBuffer: 10,
  animationDurationMs: null,
  linear: false,
  easing: (x: number) => x
}

// ------------------------------------
// Actions
// ------------------------------------
export const setCameraBounds = createAction(MAP_CAMERA_SET_BOUNDS, x => x)
export const setCameraBearing = createAction(MAP_CAMERA_SET_BEARING, x => x)
export const setCameraAngle = createAction(MAP_CAMERA_SET_ANGLE, x => x)
export const setCameraPixelBuffer = createAction(MAP_CAMERA_SET_PIXEL_BUFFER, x => x)
export const setCameraAnimationSpeed = createAction(MAP_CAMERA_SET_ANIMATION_SPEED, x => x)
export const setCamera = createAction(MAP_CAMERA_SET_CAMERA, (x: Partial<ICameraReduxState>) => x)

export const mapCameraActions = {
  setCameraBounds: setCameraBounds,
  setCameraBearing: setCameraBearing,
  setCameraAngle: setCameraAngle,
  setCameraPixelBuffer: setCameraPixelBuffer,
  setCameraAnimationSpeed: setCameraAnimationSpeed,
  setCamera: setCamera,
}

const MERCATOR_PROJECTION_BOUNDS = {
  longitude: [-180, 180],
  latitude: [-85, 85],
}

const cleanBounds = (minLong, minLat, maxLong, maxLat) => {
  const [floatMinLong, floatMinLat, floatMaxLong, floatMaxLat] = [minLong, minLat, maxLong, maxLat].map(x => parseFloat(x))
  const isInvalid = some([floatMinLong, floatMinLat, floatMaxLong, floatMaxLat], isNaN)
  if (isInvalid) {
    return null
  }

  const bounds = [
    [
      clamp(
        floatMinLong,
        MERCATOR_PROJECTION_BOUNDS.longitude[0],
        MERCATOR_PROJECTION_BOUNDS.longitude[1]
      ),
      clamp(floatMinLat, MERCATOR_PROJECTION_BOUNDS.latitude[0], MERCATOR_PROJECTION_BOUNDS.latitude[1]),
    ],
    [
      clamp(
        floatMaxLong,
        MERCATOR_PROJECTION_BOUNDS.longitude[0],
        MERCATOR_PROJECTION_BOUNDS.longitude[1]
      ),
      clamp(floatMaxLat, MERCATOR_PROJECTION_BOUNDS.latitude[0], MERCATOR_PROJECTION_BOUNDS.latitude[1]),
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
    // NOTE: I want this to be very explicity and not use prior state.
    const newState = {
      ...state,
      ...payload,
      animationDurationMs: payload.animationDurationMs || null,
      linear: payload.linear || false,
    }
    return newState
  },

  MAP_CAMERA_SET_ANIMATION_SPEED: (
    state: ICameraReduxState,
    { payload: { animationSpeed } }
  ): ICameraReduxState => ({
    ...state,
    animationDurationMs: clamp(animationSpeed, 0.00001, 5),
  }),
}

export default handleActions(actionHandlers, DEFAULT_CAMERA_STATE)
