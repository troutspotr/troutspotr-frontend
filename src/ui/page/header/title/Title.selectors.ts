import { isEmpty } from 'lodash'
import { createSelector } from 'reselect'
import { isRootPageSelector } from 'ui/Location.selectors'
import { displayedStreamTitleSelector } from 'ui/routes/@usState/UsState.selectors'
import { isSearchVisibleSelector } from '../search/Search.selectors'
export const isTitleVisibleSelector = createSelector(
  [isSearchVisibleSelector],
  isSearchVisible => !isSearchVisible
)

const EMPTY_TITLE = ''
const SELECT_REGION = 'Select Region'
export const titleSelector = createSelector(
  [isRootPageSelector, isTitleVisibleSelector, displayedStreamTitleSelector],
  (isRootPage, isTitleVisible, displayedStreamTitle) => {
    if (isRootPage) {
      return SELECT_REGION
    }

    if (isTitleVisible === false) {
      return EMPTY_TITLE
    }

    return displayedStreamTitle
  }
)

export const isSearchIconVisibleSelector = createSelector(
  [isRootPageSelector, titleSelector],
  (isRootPage, title) => isRootPage === false && isEmpty(title) === false
)
