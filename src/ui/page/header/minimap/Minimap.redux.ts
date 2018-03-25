import { createAction, handleActions } from 'redux-actions'
export const MINIMAP_SET_SIZE = 'MINIMAP_SET_SIZE'

export const setIsExpanded = createAction(MINIMAP_SET_SIZE, (x: boolean) => x)

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS: {} = {
  [MINIMAP_SET_SIZE]: (state: IMinimapReduxState, { payload }): IMinimapReduxState => {
    const newState = { ...state, ...{ isExpanded: payload } }
    return newState
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
export interface IMinimapReduxState {
  isExpanded: boolean
}

export const INITIAL_MINIMAP_STATE: IMinimapReduxState = { isExpanded: false }

export default handleActions(ACTION_HANDLERS, INITIAL_MINIMAP_STATE)
