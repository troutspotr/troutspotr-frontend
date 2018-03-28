import { isEmpty } from 'lodash'
import { createSelector } from 'reselect'
import {
  getHashSelector,
  isRootPageSelector,
  locationSelector,
  paramsSelector,
} from 'ui/Location.selectors'
export const isEnabledSelector = createSelector(
  [paramsSelector, isRootPageSelector],
  (params, isRootPage) => {
    if (params == null) {
      throw new Error('location cannot be null')
    }

    if (isRootPage) {
      return false
    }

    const isStreamRoute = params.streamId != null
    return isStreamRoute
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
