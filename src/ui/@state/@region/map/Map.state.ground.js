
import {
  createAction, handleActions,
}
  from 'redux-actions'
import {find} from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const MAP_GROUND_SET_MAP_STYLE = 'MAP_GROUND_SET_MAP_STYLE'

const DARK_MAP_NAME = 'mapbox://styles/mapbox/dark-v9'

const DARK_MAP = {
  'name': 'Dark',
  'type': 'vector',
  'url': DARK_MAP_NAME,
}

const AVAILABLE_MAPS = [DARK_MAP]

// ------------------------------------
// Default State
// ------------------------------------
const DEFAULT_GROUND_STATE = {
  'mapStyle': DARK_MAP_NAME,
  'availableMapStyles': AVAILABLE_MAPS,
}

// ------------------------------------
// Actions
// ------------------------------------
export const setMapStyle = createAction(MAP_GROUND_SET_MAP_STYLE)

export const mapGroundActions = {setMapStyle}

const actionHandlers = {
  'MAP_GROUND_SET_MAP_STYLE': (state, {'payload': {styleName}}) => {
    const soughtStyle = find(state.availableMapStyles, 'name', styleName)
    if (soughtStyle == null) {
      return state
    }

    return {...state, 'mapStyle': soughtStyle}
  },
}

export default handleActions(actionHandlers, DEFAULT_GROUND_STATE)
