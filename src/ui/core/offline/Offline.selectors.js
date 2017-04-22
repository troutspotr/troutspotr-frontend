import { createSelector } from 'reselect'
import { regionsDictionarySelector } from 'ui/core/Core.selectors'
export const isOfflineSelector = state => {
  if (state == null) {
    return false
  }

  if (state.offline == null) {
    return false
  }

  return state.offline.isOffline
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

export const cachedRegionsDictionary = createSelector(
  [cachedEndpointsSelector, regionsDictionarySelector],
  (endpoints, regionDictionary) => {
    if (isEmpty(endpoints)) {
      return EMPTY_DICTIONARY
    }

    if (isEmpty(regionDictionary)) {
      return EMPTY_DICTIONARY
    }

    let cachedRegionDictionary = endpoints.reduce((dictionary, endpoint) => {
      let tokens = endpoint.split('/')
        .filter(x => x.length > 0)
      if (tokens.length <= 3) {
        return dictionary
      }

      let regionFileName = tokens[3]
      let isTopojsonFile = regionFileName.indexOf('.topo.json') >= 0
      if (isTopojsonFile === false) {
        return dictionary
      }
      let regionName = regionFileName.split('.')[0]
      // I believe we index by name.
      let region = regionDictionary[regionName]
      let regionId = region.properties.gid
      dictionary[regionId] = region
      return dictionary
    }, {})

    return cachedRegionDictionary
  })
