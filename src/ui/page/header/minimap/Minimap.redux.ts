import { createAction, handleActions } from 'redux-actions'
import { IMinimapSelection, setSelectedMinimapGeometry } from 'ui/core/Core.redux'
import { browserHistory } from 'react-router'
export const MINIMAP_SET_SIZE = 'MINIMAP_SET_SIZE'
export const setIsExpanded = createAction(MINIMAP_SET_SIZE, (x: boolean) => x)

export const handleRegionSelection = (minimapSelection: IMinimapSelection) => async (
  dispatch
): Promise<void> => {
  if (minimapSelection == null || minimapSelection.usStateShortName == null) {
    return
  }

  dispatch(setSelectedMinimapGeometry(minimapSelection))

  if (minimapSelection.regionPathName != null) {
    setTimeout(() => browserHistory.push(`/${minimapSelection.regionPathName}`), 150)
  }
}

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
