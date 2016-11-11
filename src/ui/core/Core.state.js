import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const MAP = 'map'
export const LIST = 'list'
export const REGION_SET_VIEW = 'REGION_SET_VIEW'

// ------------------------------------
// Actions
// ------------------------------------
export const setViewToMap = createAction(REGION_SET_VIEW, x => MAP)
export const setViewToList = createAction(REGION_SET_VIEW, x => LIST)

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export const setViewToListAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(setViewToList())
        resolve()
      }, 200)
    })
  }
}

export const setViewToMapAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(setViewToMap())
        resolve()
      }, 200)
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGION_SET_VIEW] : (state, { payload }) => {
    let view = payload || initialState.view
    let newState = { ...state, ...{ view } }
    return newState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  view: LIST,
  isMapModuleLoaded: false,
  isMapReadyToDisplay: false
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
