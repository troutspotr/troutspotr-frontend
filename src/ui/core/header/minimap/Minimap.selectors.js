import { createSelector } from 'reselect'
import { waterOpenersDictionarySelector } from 'ui/@state/State.selectors'
import { hasAgreedToTermsSelector } from 'ui/core/Core.selectors'
import { has } from 'lodash'
export const isExpandedBoolSelector = state => {
  return state.minimap.isExpanded
}

export const isExpandedSelector = createSelector(
  [isExpandedBoolSelector, hasAgreedToTermsSelector],
  (isExpanded, hasAgreedToTermsSelector) => {
    return isExpanded && hasAgreedToTermsSelector
  })

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
