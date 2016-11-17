import { createSelector } from 'reselect'
import { locationSelector, isRootPageSelector } from 'ui/Location.selectors'
import { regionsDictionarySelector, statesDictionarySelector } from 'ui/Geo.selectors'
import { isEmpty, lowerCase, has } from 'lodash'
export const viewSelector = state => {
  return state.core.view
}

export const selectedStateSelector = createSelector(
  [isRootPageSelector, locationSelector, statesDictionarySelector],
  (isRoot, location, statesDictionary) => {
    if (isRoot) {
      return null
    }

    if (isEmpty(statesDictionary)) {
      return null
    }
    let params = location.pathname.split('/')
    let stateParam = params.length >= 2
      ? lowerCase(params[1])
      : null

    let isStateFound = has(statesDictionary, stateParam)
    if (isStateFound === false) {
      return null
    }

    let state = statesDictionary[stateParam]
    return state
  })

export const selectedRegionSelector = createSelector(
  [isRootPageSelector, locationSelector, regionsDictionarySelector],
  (isRoot, location, regionsDictionary) => {
    if (isRoot) {
      return null
    }

    if (isEmpty(regionsDictionary)) {
      return null
    }

    let params = location.pathname.split('/')
    let regionParam = params.length >= 3
      ? lowerCase(params[2])
      : null

    let isRegionFound = has(regionsDictionary, regionParam)
    if (isRegionFound === false) {
      return null
    }

    let region = regionsDictionary[regionParam]
    return region
  })
