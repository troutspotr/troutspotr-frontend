import {createAction} from 'redux-actions'
export const MINIMAP_SET_SIZE = 'MINIMAP_SET_SIZE'

export const isExpaned = createAction(MINIMAP_SET_SIZE)

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MINIMAP_SET_SIZE]: (state, {payload}) => {
    const newState = {...state, ...{'isExpanded': payload}}
    return newState
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {'isExpanded': false}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
