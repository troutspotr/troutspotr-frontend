import has from 'lodash-es/has'
import isEmpty from 'lodash-es/isEmpty'
import { createSelector } from 'reselect'
import { View, Theme } from 'ui/core/Core.redux'
import { selectedStateIdSelector, selectedRegionIdSelector } from 'ui/Location.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { Dictionary } from 'lodash'
import { LoadingStatus } from 'coreTypes/Ui'
import {
  CountyFeature,
  RegionFeature,
} from '../../coreTypes/tableOfContents/ITableOfContentsGeoJSON'
import {
  UsStateFeatureCollection,
  CountyFeatureCollection,
  RegionFeatureCollection,
  UsStateFeature,
} from '../../coreTypes/tableOfContents/ITableOfContentsGeoJSON'

export const themeSelector = (reduxState: IReduxState): Theme => {
  return reduxState.core.theme
}

export const statesGeoJsonSelector = (reduxState: IReduxState): UsStateFeatureCollection =>
  reduxState.core.statesGeoJson
export const countiesGeoJsonSelector = (reduxState: IReduxState): CountyFeatureCollection =>
  reduxState.core.countiesGeoJson
export const regionsGeoJsonSelector = (reduxState: IReduxState): RegionFeatureCollection =>
  reduxState.core.regionsGeoJson

export const statesDictionarySelector = (reduxState: IReduxState): Dictionary<UsStateFeature> =>
  reduxState.core.statesDictionary
export const countiesDictionarySelector = (reduxState: IReduxState): Dictionary<CountyFeature> =>
  reduxState.core.countyDictionary
export const regionsDictionarySelector = (reduxState: IReduxState): Dictionary<RegionFeature> =>
  reduxState.core.regionDictionary
export const hasAgreedToTermsSelector = (reduxState: IReduxState): boolean =>
  reduxState.core.hasAgreedToTerms
// export const hasSeenIntroScreenSelector = (reduxState: IReduxState): boolean =>
//   reduxState.core.hasSeenIntroScreen
// export const hasSeenTermsOfServiceSelector = (reduxState: IReduxState): boolean =>
//   reduxState.core.hasSeenTermsOfService
// export const hasSeenPrivacyPolicySelector = (reduxState: IReduxState): boolean =>
//   reduxState.core.hasSeenPrivacyPolicy
// Export const streamCentroidsGeoJsonSelector = (reduxState: IReduxState) => reduxState.core.streamCentroidsGeoJson
export const tableOfContentsLoadingStatusSelector = (reduxState: IReduxState): LoadingStatus =>
  reduxState.core.tableOfContentsLoadingStatus
export const searchTextSelector = (reduxState: IReduxState): string => reduxState.core.searchText

export const viewSelector = (reduxState: IReduxState): View => reduxState.core.view

export const isListVisible = createSelector([viewSelector], view => view === View.list)

export const selectedStateSelector = createSelector(
  [selectedStateIdSelector, statesDictionarySelector],
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
  }
)

export const isSearchingSelector = createSelector([searchTextSelector], searchText => {
  if (searchText == null) {
    return false
  }

  const isSearchNonEmpty = isEmpty(searchText) === false
  return isSearchNonEmpty
})

export const selectedRegionPathKeySelector = createSelector(
  [selectedStateIdSelector, selectedRegionIdSelector],
  (selectedStateId, selectedRegionId) => {
    if (isEmpty(selectedStateId)) {
      return null
    }

    if (isEmpty(selectedRegionId)) {
      return null
    }
    const regionPathKey = `${selectedStateId}/${selectedRegionId}`
    return regionPathKey
  }
)


const selectedRegion = (regionPathKey: string, regionsDictionary): RegionFeature => {
  if (isEmpty(regionsDictionary)) {
    return null
  }

  if (isEmpty(regionPathKey)) {
    return null
  }

  const isRegionFound = has(regionsDictionary, regionPathKey)
  if (isRegionFound === false) {
    return null
  }

  const region = regionsDictionary[regionPathKey]
  return region
}

export const selectedRegionSelector: RegionFeature = createSelector(
  [selectedRegionPathKeySelector, regionsDictionarySelector],
  selectedRegion
)
