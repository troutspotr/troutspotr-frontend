'use strict'
import { createAction, handleActions } from 'redux-actions'
import { some, clamp } from 'lodash'

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
const DEFAULT_CAMERA_STATE = {
  bounds: BOUNDING_BOX_OF_LOWER_48_STATES,
  bearing: 0.0,
  angle: 0.0,
  pixelBuffer: 60,
  animationSpeed: 1.3
}

// ------------------------------------
// Actions
// ------------------------------------
export const setCameraBounds = createAction(MAP_CAMERA_SET_BOUNDS)
export const setCameraBearing = createAction(MAP_CAMERA_SET_BEARING)
export const setCameraAngle = createAction(MAP_CAMERA_SET_ANGLE)
export const setCameraPixelBuffer = createAction(MAP_CAMERA_SET_PIXEL_BUFFER)
export const setCameraAnimationSpeed = createAction(MAP_CAMERA_SET_ANIMATION_SPEED)
export const setCamera = createAction(MAP_CAMERA_SET_CAMERA)

export const mapCameraActions = {
  setCameraBounds,
  setCameraBearing,
  setCameraAngle,
  setCameraPixelBuffer,
  setCameraAnimationSpeed,
  setCamera
}

const MERCATOR_PROJECTION_BOUNDS = {
  longitude: [-180, 180],
  latitude:  [-85, 85]
}

let cleanBounds = (minLong, minLat, maxLong, maxLat) => {
  [minLong, minLat, maxLong, maxLat] = [minLong, minLat, maxLong, maxLat].map(x => parseFloat(x))
  let isInvalid = some([minLong, minLat, maxLong, maxLat], isNaN)
  if (isInvalid) {
    return null
  }

  let bounds = [
    [
      clamp(minLong, MERCATOR_PROJECTION_BOUNDS.longitude[0], MERCATOR_PROJECTION_BOUNDS.longitude[1]),
      clamp(minLat, MERCATOR_PROJECTION_BOUNDS.latitude[0], MERCATOR_PROJECTION_BOUNDS.latitude[1])
    ],
    [
      clamp(maxLong, MERCATOR_PROJECTION_BOUNDS.longitude[0], MERCATOR_PROJECTION_BOUNDS.longitude[1]),
      clamp(maxLat, MERCATOR_PROJECTION_BOUNDS.latitude[0], MERCATOR_PROJECTION_BOUNDS.latitude[1])
    ]
  ]

  return bounds
}

const actionHandlers = {
  MAP_CAMERA_SET_BOUNDS: (state, { payload }) => {
    let { bounds } = payload
    let isBoundsValid = bounds != null && bounds.length === 2
    if (isBoundsValid === false) {
      return state
    }

    let cleanedBounds = cleanBounds(bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1])
    if (cleanedBounds == null) {
      return state
    }

    return { ...state, bounds: cleanedBounds }
  },

  MAP_CAMERA_SET_BEARING: (state, { payload }) => {
    let newState = { ...state }
    newState.bearing = payload
    return newState
  },

  MAP_CAMERA_SET_ANGLE: (state, { payload }) => {
    // return { ...state, angle: clamp(payload, 0, 360) }
    let newState = { ...state }
    newState.angle = clamp(payload, 0, 360)
    return newState
  },

  MAP_CAMERA_SET_PIXEL_BUFFER: (state, { payload: { pixelBuffer } }) => {
    return { ...state, pixelBuffer: clamp(pixelBuffer, 0, 500) }
  },

  MAP_CAMERA_SET_CAMERA: (state, { payload }) => {
    let newState = { ...state, ...payload }
    return newState
  },

  MAP_CAMERA_SET_ANIMATION_SPEED: (state, { payload: { animationSpeed } }) => {
    return { ...state, animationSpeed: clamp(animationSpeed, 0.00001, 5) }
  }
}

export default handleActions(actionHandlers, DEFAULT_CAMERA_STATE)
