import { createSelector } from 'reselect'
import { isSearchVisibleSelector } from '../search/Search.selectors'
import { isRootPageSelector } from 'ui/Location.selectors'
export const isTitleVisibleSelector = createSelector([isSearchVisibleSelector], (isSearchVisible) => {
  return !isSearchVisibleSelector
})

const PLACEHOLDER_TITLE = 'MN, SE Driftless'
const SELECT_REGION = 'Select Region'
export const subtitleSelector = createSelector([isRootPageSelector], (isRootPage) => {
  if (isRootPage) {
    return SELECT_REGION
  }

  return PLACEHOLDER_TITLE
})
