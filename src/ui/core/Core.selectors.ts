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

export const statesGeoJsonSelector = (reduxState: IReduxState): UsStateFeatureCollection | null =>
  reduxState.core.statesGeoJson
export const countiesGeoJsonSelector = (reduxState: IReduxState): CountyFeatureCollection | null =>
  reduxState.core.countiesGeoJson
export const regionsGeoJsonSelector = (reduxState: IReduxState): RegionFeatureCollection | null =>
  reduxState.core.regionsGeoJson

export const statesDictionarySelector = (reduxState: IReduxState): Dictionary<UsStateFeature> | null =>
  reduxState.core.statesDictionary
export const countiesDictionarySelector = (reduxState: IReduxState): Dictionary<CountyFeature> | null =>
  reduxState.core.countyDictionary
export const regionsDictionarySelector = (reduxState: IReduxState): Dictionary<RegionFeature> | null =>
  reduxState.core.regionDictionary
export const hasAgreedToTermsSelector = (reduxState: IReduxState): boolean =>
  reduxState.core.hasAgreedToTerms

export const tableOfContentsLoadingStatusSelector = (reduxState: IReduxState): LoadingStatus =>
  reduxState.core.tableOfContentsLoadingStatus
export const searchTextSelector = (reduxState: IReduxState): string => (reduxState.core.searchText || '')

export const viewSelector = (reduxState: IReduxState): View => reduxState.core.view

export const isListVisible = createSelector([viewSelector], view => view === View.list)

export const timeSelector = (reduxState: IReduxState): Date => reduxState.core.time

export const selectedStateSelector = createSelector(
  selectedStateIdSelector,
  statesDictionarySelector,
  (stateId: string, statesDictionary) => {
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
  (selectedStateId, selectedRegionId): string | null => {
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


const selectedRegion = (regionPathKey: string, regionsDictionary: any): RegionFeature | null => {
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

export const selectedRegionSelector = createSelector(
  [selectedRegionPathKeySelector, regionsDictionarySelector],
  selectedRegion
)
