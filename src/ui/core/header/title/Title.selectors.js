import {createSelector} from 'reselect'
import {isSearchVisibleSelector} from '../search/Search.selectors'
import {displayedStreamTitleSelector} from 'ui/@state/State.selectors'
import {isRootPageSelector} from 'ui/Location.selectors'
import {isEmpty} from 'lodash'
export const isTitleVisibleSelector = createSelector([isSearchVisibleSelector], (isSearchVisible) => !isSearchVisible)

const EMPTY_TITLE = ''
const SELECT_REGION = 'Select Region'
export const titleSelector = createSelector(
  [
    isRootPageSelector,
    isTitleVisibleSelector,
    displayedStreamTitleSelector,
  ],
  (isRootPage, isTitleVisible, displayedStreamTitle) => {
    if (isRootPage) {
      return SELECT_REGION
    }

    if (isTitleVisible === false) {
      return EMPTY_TITLE
    }

    return displayedStreamTitle
  })

export const isSearchIconVisibleSelector = createSelector(
  [
    isRootPageSelector,
    titleSelector,
  ],
  (isRootPage, title) => isRootPage === false && isEmpty(title) === false)
