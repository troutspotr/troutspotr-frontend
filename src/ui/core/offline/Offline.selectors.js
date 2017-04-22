import { createSelector } from 'reselect'

export const isOfflineSelector = state => {
  if (state == null) {
    debugger
    return false
  }

  if (state.offline == null) {
    debugger
    return false
  }

  return state.offline.isOffline === false
}
export const cachedEndpointsSelector = state => state.offline.cachedEndpoints

import { isEmpty, keyBy } from 'lodash'

const EMPTY_DICTIONARY = {}

export const cachedEndpointsDictionarySelector = createSelector(
  [cachedEndpointsSelector],
  (cachedEndpoints) => {
    if (isEmpty(cachedEndpoints)) {
      return EMPTY_DICTIONARY
    }

    return keyBy(cachedEndpoints, x => x)
  })
