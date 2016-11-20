import { createSelector } from 'reselect'
import { locationSelector, isRootPageSelector } from 'ui/Location.selectors'
import { isExpandedSelector } from '../minimap/Minimap.selectors'

export const isSearchVisibleSelector = createSelector(
  [locationSelector, isExpandedSelector, isRootPageSelector],
  (location, isMinimapExpanded, isRootPage) => {
    if (isRootPage) {
      return false
    }

    if (isMinimapExpanded) {
      return true
    }

    // if (isRootPage) {
    //   return true
    // }

    // I don't really know how to do this part yet..
    // i would like to have more sophisticated access
    // to the params in state.

    // guess for now.
    let params = location.pathname.split('/')
      .filter(x => x.length > 0)

    let isOnStreamDetails = params.length > 2
    if (isOnStreamDetails) {
      return false
    }

    return true
  }
)
