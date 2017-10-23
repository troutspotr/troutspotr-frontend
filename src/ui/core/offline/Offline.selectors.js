import {isEmpty, keyBy} from 'lodash'
import {createSelector} from 'reselect'
import {regionsDictionarySelector} from 'ui/core/Core.selectors'
export const isOfflineSelector = (state) => {
  if (state == null) {
    return false
  }

  if (state.offline == null) {
    return false
  }

  return state.offline.isOffline
}

export const cachedEndpointsSelector = (state) => state.offline.cachedEndpoints

const EMPTY_DICTIONARY = {}

export const cachedEndpointsDictionarySelector = createSelector(
  [cachedEndpointsSelector],
  (cachedEndpoints) => {
    if (isEmpty(cachedEndpoints)) {
      return EMPTY_DICTIONARY
    }

    return keyBy(cachedEndpoints, (x) => x)
  })

export const cachedRegionsDictionary = createSelector(
  [
    cachedEndpointsSelector,
    regionsDictionarySelector,
  ],
  (endpoints, regionDictionary) => {
    if (isEmpty(endpoints)) {
      return EMPTY_DICTIONARY
    }

    if (isEmpty(regionDictionary)) {
      return EMPTY_DICTIONARY
    }

    const cachedRegionDictionary = endpoints.reduce((dictionary, endpoint) => {
      const tokens = endpoint.split('/')
        .filter((x) => x.length > 0)
      if (tokens.length <= 3) {
        return dictionary
      }

      const regionFileName = tokens[3]
      const isTopojsonFile = regionFileName.indexOf('.topo.json') >= 0
      if (isTopojsonFile === false) {
        return dictionary
      }
      const regionName = regionFileName.split('.')[0]
      // I believe we index by name.
      const region = regionDictionary[regionName]
      const regionId = region.properties.gid
      dictionary[regionId] = region
      return dictionary
    }, {})

    return cachedRegionDictionary
  })
