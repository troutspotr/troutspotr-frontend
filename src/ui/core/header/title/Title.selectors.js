import { createSelector } from 'reselect'
import { isSearchVisibleSelector } from '../search/Search.selectors'
export const isTitleVisibleSelector = createSelector([isSearchVisibleSelector], (isSearchVisible) => {
  return !isSearchVisible
})

const EMPTY_TITLE = ''
export const titleSelector = createSelector([isTitleVisibleSelector], (isTitleVisible) => {
  if (isTitleVisible === false) {
    return EMPTY_TITLE
  }

  return 'Whitewater River, North Branch'
})
