import { createSelector } from 'reselect'
import { waterOpenersDictionarySelector } from 'ui/@state/State.selectors'
import { hasAgreedToTermsSelector, isSearchingSelector } from 'ui/core/Core.selectors'
import { has } from 'lodash'
export const isExpandedBoolSelector = state => {
  return state.minimap.isExpanded
}

export const isExpandedSelector = createSelector(
  [isExpandedBoolSelector, hasAgreedToTermsSelector],
  (isExpanded, hasAgreedToTermsSelector) => {
    return isExpanded && hasAgreedToTermsSelector
  })

// this determines if the collection of stream centroids
// should be displayed. We only want to display them
// if people have expanded the minimap and are searching.

export const isStreamCentroidsDisplayedSelector = createSelector(
  [isExpandedSelector, isSearchingSelector],
  (isExpanded, isSearching) => {
    return isExpanded && isSearching
  }
)

/* eslint-disable camelcase */
export const getIsOpenSelector = createSelector(
  [waterOpenersDictionarySelector],
  (waterOpenersDictionary) => {
    if (waterOpenersDictionary == null) {
      return () => false
    }

    return (waterId) => {
      if (has(waterOpenersDictionary, waterId) === false) {
        return false
      }

      return waterOpenersDictionary[waterId].isOpenSeason
    }
  })
