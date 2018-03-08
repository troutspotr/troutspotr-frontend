import { isEmpty } from 'lodash'
import { createSelector } from 'reselect'
import { getHashSelector, isRootPageSelector, locationSelector, paramsSelector } from 'ui/Location.selectors'
export const isEnabledSelector = createSelector(
  [paramsSelector, isRootPageSelector],
  (params, isRootPage) => {
    if (params == null) {
      throw new Error('location cannot be null')
    }

    if (isRootPage) {
      return false
    }

    // I don't really know how to do this part yet..
    // I would like to have more sophisticated access
    // To the params in state.

    // Guess for now.

    const isOnStreamDetails = params.region != null
    return isOnStreamDetails
  }
)

export const previousSelector = createSelector(
  [isEnabledSelector, locationSelector, getHashSelector],
  (isEnabled, location, hash) => {
    if (isEnabled === false) {
      return null
    }

    const params = location.pathname.split('/').filter(x => x.length > 0)

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
  }
)
