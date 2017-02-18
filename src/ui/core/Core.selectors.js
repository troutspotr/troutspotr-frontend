import { createSelector } from 'reselect'
import { locationSelector, isRootPageSelector } from 'ui/Location.selectors'
import { LIST } from './Core.state'
import { isEmpty, has } from 'lodash'

export const statesGeoJsonSelector = state => state.core.statesGeoJson
export const countiesGeoJsonSelector = state => state.core.countiesGeoJson
export const regionsGeoJsonSelector = state => state.core.regionsGeoJson

export const statesDictionarySelector = state => state.core.statesDictionary
export const countiesDictionarySelector = state => state.core.countyDictionary
export const regionsDictionarySelector = state => state.core.regionDictionary
export const hasAgreedToTermsSelector = state => state.core.hasAgreedToTerms
export const hasSeenIntroScreenSelector = state => state.core.hasSeenIntroScreen
export const hasSeenTermsOfServiceSelector = state => state.core.hasSeenTermsOfService
export const hasSeenPrivacyPolicySelector = state => state.core.hasSeenPrivacyPolicy
// export const streamCentroidsGeoJsonSelector = state => state.core.streamCentroidsGeoJson
export const tableOfContentsLoadingStatusSelector = state => state.core.tableOfContentsLoadingStatus
export const searchTextSelector = state => state.core.searchText

export const viewSelector = state => {
  return state.core.view
}

export const isListVisible = createSelector(
  [viewSelector],
  (view) => {
    return view === LIST
  })

export const selectedStateIdSelector = createSelector(
  [isRootPageSelector, locationSelector],
  (isRoot, location) => {
    if (isRoot) {
      return null
    }

    let params = location.pathname.split('/')
    let stateParam = params.length >= 2
      ? (params[1]).toLowerCase()
      : null

    return stateParam
  })

export const selectedRegionIdSelector = createSelector(
  [isRootPageSelector, locationSelector],
  (isRoot, location) => {
    if (isRoot) {
      return null
    }

    let params = location.pathname.split('/')
    let regionParam = params.length >= 3
      ? (params[2]).toLowerCase()
      : null

    return regionParam
  })

export const selectedStreamIdSelector = createSelector(
  [isRootPageSelector, locationSelector],
  (isRoot, location) => {
    if (isRoot) {
      return null
    }

    let params = location.pathname.split('/')
    let streamSlugParam = params.length >= 4
      ? (params[3]).toLowerCase()
      : null

    return streamSlugParam
  })

export const selectedStateSelector = createSelector(
  [selectedStateIdSelector, statesDictionarySelector],
  (stateId, statesDictionary) => {
    if (isEmpty(statesDictionary)) {
      return null
    }

    let isStateFound = has(statesDictionary, stateId)
    if (isStateFound === false) {
      return null
    }

    let state = statesDictionary[stateId]
    return state
  })

export const isSearchingSelector = createSelector(
  [searchTextSelector],
  (searchText) => {
    if (searchText == null) {
      return false
    }

    let isSearchNonEmpty = isEmpty(searchText) === false
    return isSearchNonEmpty
  })

export const selectedRegionSelector = createSelector(
  [selectedRegionIdSelector, regionsDictionarySelector],
  (regionId, regionsDictionary) => {
    if (isEmpty(regionsDictionary)) {
      return null
    }

    let isRegionFound = has(regionsDictionary, regionId)
    if (isRegionFound === false) {
      return null
    }

    let region = regionsDictionary[regionId]
    return region
  })
