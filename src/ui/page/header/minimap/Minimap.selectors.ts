import { has } from 'lodash'
import { createSelector } from 'reselect'
import { hasAgreedToTermsSelector, isSearchingSelector } from 'ui/core/Core.selectors'
import { waterOpenersDictionarySelector } from 'ui/routes/@usState/UsState.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { isRootPageSelector } from '../../../Location.selectors';
export const isExpandedBoolSelector = (state: IReduxState) => state.minimap.isExpanded
export const selectedUsStateName = (state: IReduxState) => state.minimap.selectedUsStateName
export const selectedRegionPathName = (state: IReduxState) => state.minimap.selectedRegionPathName

export const isExpandedSelector = createSelector(
  // add new selector
  [isExpandedBoolSelector, hasAgreedToTermsSelector, isRootPageSelector],
  (isExpanded, hasAgreedToTerms, isRootPage: boolean): boolean => (isExpanded && hasAgreedToTerms) || (isRootPage )
)

export const isCloseButtonShownSelector = createSelector(
  // add new selector
  [isExpandedSelector, isRootPageSelector],
  (isExpanded, isRootPage: boolean): boolean => (isExpanded) && (isRootPage === false)
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
