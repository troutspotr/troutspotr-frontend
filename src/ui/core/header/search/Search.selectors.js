import {createSelector} from 'reselect'
import {isRootPageSelector, locationSelector} from 'ui/Location.selectors'
import {isExpandedSelector} from '../minimap/Minimap.selectors'

export const isSearchVisibleSelector = createSelector(
  [
    locationSelector,
    isExpandedSelector,
    isRootPageSelector,
  ],
  (location, isMinimapExpanded, isRootPage) => {
    if (isRootPage) {
      return false
    }

    if (isMinimapExpanded) {
      return true
    }

    // If (isRootPage) {
    //   Return true
    // }

    // I don't really know how to do this part yet..
    // I would like to have more sophisticated access
    // To the params in state.

    // Guess for now.
    const params = location.pathname.split('/')
      .filter((x) => x.length > 0)

    const isOnStreamDetails = params.length > 2
    if (isOnStreamDetails) {
      return false
    }

    return true
  }
)
