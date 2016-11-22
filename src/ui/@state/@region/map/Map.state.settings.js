'use strict'
import { handleActions } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------
// export const MAP_SETTINGS_TOKEN_KEY = 'pk.eyJ1IjoiY2FwIiwiYSI6Ik9TUW53bE0ifQ.jKQeBguXYI5q-uu3tAdlfQ'
// ------------------------------------
// Default State
// ------------------------------------
const DEFAULT_SETTINGS_STATE = {
  // token: MAP_SETTINGS_TOKEN_KEY
}

// ------------------------------------
// Actions
// ------------------------------------

export const mapSettingsActions = {}

const actionHandlers = {}

export default handleActions(actionHandlers, DEFAULT_SETTINGS_STATE)
