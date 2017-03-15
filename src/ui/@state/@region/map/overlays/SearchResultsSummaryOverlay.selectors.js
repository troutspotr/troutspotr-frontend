import { createSelector } from 'reselect'
import { isSearchingSelector } from 'ui/core/Core.selectors'
import { isExpandedSelector } from 'ui/core/header/minimap/Minimap.selectors'
import { selectedStreamObjectSelector } from 'ui/@state/@region/Region.selectors'
import { isEmpty } from 'lodash'

export const isSearchOverlayDisplayedSelector = createSelector(
  [isSearchingSelector, isExpandedSelector, selectedStreamObjectSelector],
  (isSearching, isExpanded, selectedStream) => {
    if (isExpanded) {
      return true
    }

    let hasSelectedStream = isEmpty(selectedStream) === false
    if (hasSelectedStream) {
      return false
    }

    if (isSearching) {
      return true
    }

    return false
  })
