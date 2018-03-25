import { has } from 'lodash'
import { createSelector } from 'reselect'
import { hasAgreedToTermsSelector, isSearchingSelector } from 'ui/core/Core.selectors'
import { waterOpenersDictionarySelector } from 'ui/routes/@usState/UsState.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
export const isExpandedBoolSelector = (state: IReduxState) => state.minimap.isExpanded

export const isExpandedSelector = createSelector(
  [isExpandedBoolSelector, hasAgreedToTermsSelector],
  (isExpanded, hasAgreedToTerms): boolean => isExpanded && hasAgreedToTerms
)

// This determines if the collection of stream centroids
// Should be displayed. We only want to display them
// If people have expanded the minimap and are searching.

export const isStreamCentroidsDisplayedSelector = createSelector(
  isExpandedSelector,
  isSearchingSelector,
  (isExpanded, isSearching): boolean => isExpanded && isSearching
)

/* eslint-disable camelcase */
export const getIsOpenSelector = createSelector(
  [waterOpenersDictionarySelector],
  waterOpenersDictionary => {
    if (waterOpenersDictionary == null) {
      return () => false
    }

    return waterId => {
      if (has(waterOpenersDictionary, waterId) === false) {
        return false
      }

      return waterOpenersDictionary[waterId].isOpenSeason
    }
  }
)
