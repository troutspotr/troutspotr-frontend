import { createSelector } from 'reselect'
import { isSearchVisibleSelector } from '../search/Search.selectors'
import { displayedStreamTitleSelector } from 'ui/@state/State.selectors'
export const isTitleVisibleSelector = createSelector([isSearchVisibleSelector], (isSearchVisible) => {
  return !isSearchVisible
})

const EMPTY_TITLE = ''
export const titleSelector = createSelector(
  [isTitleVisibleSelector, displayedStreamTitleSelector],
  (isTitleVisible, displayedStreamTitle) => {
    if (isTitleVisible === false) {
      return EMPTY_TITLE
    }

    return displayedStreamTitle
  })
