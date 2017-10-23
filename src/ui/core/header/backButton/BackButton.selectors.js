import {createSelector} from 'reselect'
import {getHashSelector, isRootPageSelector, locationSelector} from 'ui/Location.selectors'
import {isEmpty} from 'lodash'
export const isEnabledSelector = createSelector(
  [
    locationSelector,
    isRootPageSelector,
  ],
  (location, isRootPage) => {
    if (location == null) {
      throw new Error('location cannot be null')
    }

    if (isRootPage) {
      return false
    }

    // I don't really know how to do this part yet..
    // I would like to have more sophisticated access
    // To the params in state.

    // Guess for now.
    const params = location.pathname.split('/')
      .filter((x) => x.length > 0)

    const isOnStreamDetails = params.length > 2
    // Console.log(isOnStreamDetails)
    return isOnStreamDetails
  }
)

export const previousSelector = createSelector(
  [
    isEnabledSelector,
    locationSelector,
    getHashSelector,
  ],
  (isEnabled, location, hash) => {
    if (isEnabled === false) {
      return null
    }

    const params = location.pathname.split('/')
      .filter((x) => x.length > 0)

    // Chop off the last part.
    const isStreamSelected = params.length === 3

    const isAccessPointSelected = isStreamSelected && isEmpty(hash) === false
    if (isAccessPointSelected) {
      // Just remove the hash
      const routeWithoutHash = `/${params.join('/')}`
      return routeWithoutHash
    }

    params.pop()
    const previous = `/${params.join('/')}`
    return previous
  })
