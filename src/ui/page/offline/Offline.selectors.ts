import isEmpty from 'lodash-es/isEmpty'
import keyBy from 'lodash-es/keyBy'
import { createSelector } from 'reselect'
import { regionsDictionarySelector } from 'ui/core/Core.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'

const VERSION = 'v5'
export const isOfflineSelector = (reduxState: IReduxState): boolean => {
  if (reduxState == null) {
    return false
  }

  if (reduxState.offline == null) {
    return false
  }

  return reduxState.offline.isOffline
}

export const cachedEndpointsSelector = (reduxState: IReduxState): string[] =>
  reduxState.offline.cachedEndpoints

const EMPTY_DICTIONARY = {}

export const cachedEndpointsDictionarySelector = createSelector(
  [cachedEndpointsSelector],
  cachedEndpoints => {
    if (isEmpty(cachedEndpoints)) {
      return EMPTY_DICTIONARY
    }
    return keyBy(cachedEndpoints, x => x)
  }
)

export const cachedRegionsDictionarySelector = createSelector(
  cachedEndpointsSelector,
  regionsDictionarySelector,
  (endpoints, regionDictionary) => {
    if (isEmpty(endpoints)) {
      return EMPTY_DICTIONARY
    }

    if (isEmpty(regionDictionary)) {
      return EMPTY_DICTIONARY
    }

    const cachedRegionDictionary = endpoints
      .filter(x => x.indexOf(VERSION) >= 0)
      .reduce((dictionary, endpoint) => {
        const tokens = endpoint.split('/').filter(x => x.length > 0)
        const isNotStateRegion = tokens.length <= 3
        if (isNotStateRegion) {
          return dictionary
        }

        const regionFileName = tokens[3]
        const stateName = tokens[2]
        const isTopojsonFile = regionFileName.indexOf('.topojson') >= 0
        if (isTopojsonFile === false) {
          return dictionary
        }
        const regionName = regionFileName.split('.')[0]
        // I believe we index by name.
        const regionKey = `${stateName}/${regionName}`
        const region = regionDictionary[regionKey]
        const regionId = region.properties.gid
        dictionary[regionId] = region
        return dictionary
      }, {})
    return cachedRegionDictionary
  }
)
