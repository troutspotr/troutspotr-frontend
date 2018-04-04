import { createAction, handleActions } from 'redux-actions'
import { IMinimapSelection } from 'ui/core/Core.redux'
import { browserHistory } from 'react-router'

export interface IMinimapReduxState {
  isExpanded: boolean
  selectedUsStateName: string
  selectedRegionPathName: string
}

export const INITIAL_MINIMAP_STATE: IMinimapReduxState = {
  isExpanded: false,
  selectedUsStateName: null,
  selectedRegionPathName: null,
}

export const GEO_SET_SELECTION = 'GEO_SET_SELECTION'
export const MINIMAP_SET_SIZE = 'MINIMAP_SET_SIZE'
export const setIsExpandedState = createAction(MINIMAP_SET_SIZE, (x: boolean) => x)
export const setIsExpanded = (isExpanded: boolean) => async (dispatch): Promise<void> => {
  dispatch(setIsExpandedState(isExpanded))
}

export const setSelectedMinimapGeometry = createAction(
  GEO_SET_SELECTION,
  (args: IMinimapSelection) => ({
    usStateShortName: args.usStateShortName == null ? null : args.usStateShortName.toLowerCase(),
    regionPathName: args.regionPathName == null ? null : args.regionPathName,
  })
)

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
const ACTION_HANDLERS: {
  [name: string]: (state: IMinimapReduxState, action: any) => IMinimapReduxState
} = {
  [MINIMAP_SET_SIZE]: (state: IMinimapReduxState, { payload }): IMinimapReduxState => {
    const newState = {
      ...state,
      ...{ isExpanded: payload },
      selectedUsStateName: null,
      selectedRegionPathName: null,
    }
    return newState
  },
  [GEO_SET_SELECTION]: (state: IMinimapReduxState, { payload }): IMinimapReduxState => {
    return {
      ...state,
      selectedUsStateName: payload.usStateShortName,
      selectedRegionPathName: payload.regionPathName,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions(ACTION_HANDLERS, INITIAL_MINIMAP_STATE)
