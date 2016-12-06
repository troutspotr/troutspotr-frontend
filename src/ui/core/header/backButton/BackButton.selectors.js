import { createSelector } from 'reselect'
import { locationSelector, isRootPageSelector, getHashSelector } from 'ui/Location.selectors'
import { isEmpty } from 'lodash'
export const isEnabledSelector = createSelector(
  [locationSelector, isRootPageSelector],
  (location, isRootPage) => {
    if (location == null) {
      throw new Error('location cannot be null')
    }

    if (isRootPage) {
      return false
    }

    // I don't really know how to do this part yet..
    // i would like to have more sophisticated access
    // to the params in state.

    // guess for now.
    let params = location.pathname.split('/')
      .filter(x => x.length > 0)

    let isOnStreamDetails = params.length > 2
    // console.log(isOnStreamDetails)
    return isOnStreamDetails
  }
)

export const previousSelector = createSelector(
  [isEnabledSelector, locationSelector, getHashSelector],
  (isEnabled, location, hash) => {
    if (isEnabled === false) {
      return null
    }

    let params = location.pathname.split('/')
      .filter(x => x.length > 0)

    // chop off the last part.
    let isStreamSelected = params.length === 3

    let isAccessPointSelected = isStreamSelected && isEmpty(hash) === false
    if (isAccessPointSelected) {
      // just remove the hash
      let routeWithoutHash = `/${params.join('/')}`
      return routeWithoutHash
    }

    params.pop()
    let previous = `/${params.join('/')}`
    return previous
  })
