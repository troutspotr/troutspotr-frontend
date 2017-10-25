import {createSelector} from 'reselect'
import {isRootPageSelector, locationSelector} from 'ui/Location.selectors'
import {LIST} from './Core.state'
import {has, isEmpty} from 'lodash'

export const statesGeoJsonSelector = (state) => state.core.statesGeoJson
export const countiesGeoJsonSelector = (state) => state.core.countiesGeoJson
export const regionsGeoJsonSelector = (state) => state.core.regionsGeoJson

export const statesDictionarySelector = (state) => state.core.statesDictionary
export const countiesDictionarySelector = (state) => state.core.countyDictionary
export const regionsDictionarySelector = (state) => state.core.regionDictionary
export const hasAgreedToTermsSelector = (state) => state.core.hasAgreedToTerms
export const hasSeenIntroScreenSelector = (state) => state.core.hasSeenIntroScreen
export const hasSeenTermsOfServiceSelector = (state) => state.core.hasSeenTermsOfService
export const hasSeenPrivacyPolicySelector = (state) => state.core.hasSeenPrivacyPolicy
// Export const streamCentroidsGeoJsonSelector = state => state.core.streamCentroidsGeoJson
export const tableOfContentsLoadingStatusSelector = (state) => state.core.tableOfContentsLoadingStatus
export const searchTextSelector = (state) => state.core.searchText

export const viewSelector = (state) => state.core.view

export const isListVisible = createSelector(
  [viewSelector],
  (view) => view === LIST)

export const selectedStateIdSelector = createSelector(
  [
    isRootPageSelector,
    locationSelector,
  ],
  (isRoot, location) => {
    if (isRoot) {
      return null
    }

    const params = location.pathname.split('/')
    const stateParam = params.length >= 2
      ? (params[1]).toLowerCase()
      : null

    return stateParam
  })

export const selectedRegionIdSelector = createSelector(
  [
    isRootPageSelector,
    locationSelector,
  ],
  (isRoot, location) => {
    if (isRoot) {
      return null
    }

    const params = location.pathname.split('/')
    const regionParam = params.length >= 3
      ? (params[2]).toLowerCase()
      : null

    return regionParam
  })

export const selectedStreamIdSelector = createSelector(
  [
    isRootPageSelector,
    locationSelector,
  ],
  (isRoot, location) => {
    if (isRoot) {
      return null
    }

    const params = location.pathname.split('/')
    const streamSlugParam = params.length >= 4
      ? (params[3]).toLowerCase()
      : null

    return streamSlugParam
  })

export const selectedStateSelector = createSelector(
  [
    selectedStateIdSelector,
    statesDictionarySelector,
  ],
  (stateId, statesDictionary) => {
    if (isEmpty(statesDictionary)) {
      return null
    }

    const isStateFound = has(statesDictionary, stateId)
    if (isStateFound === false) {
      return null
    }

    const state = statesDictionary[stateId]
    return state
  })

export const isSearchingSelector = createSelector(
  [searchTextSelector],
  (searchText) => {
    if (searchText == null) {
      return false
    }

    const isSearchNonEmpty = isEmpty(searchText) === false
    return isSearchNonEmpty
  })

export const selectedRegionPathKeySelector = createSelector(
  [
    selectedStateIdSelector,
    selectedRegionIdSelector,
    ],
    (selectedStateId, selectedRegionId) => {
      if (isEmpty(selectedStateId)) {
        return null
      }

      if (isEmpty(selectedRegionId)) {
        return null
      }

      const regionPathKey = `${selectedStateId}/${selectedRegionId}`
      return regionPathKey
    })

export const selectedRegionSelector = createSelector(
  [
    selectedRegionPathKeySelector,
    regionsDictionarySelector,
  ],
  (regionPathKey, regionsDictionary) => {
    if (isEmpty(regionsDictionary)) {
      return null
    }

    if (isEmpty(selectedRegionPathKeySelector)) {
      return null
    }
    debugger
    const isRegionFound = has(regionsDictionary, regionPathKey)
    if (isRegionFound === false) {
      return null
    }

    const region = regionsDictionary[regionPathKey]
    return region
  })
