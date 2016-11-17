import { createSelector } from 'reselect'
import { locationSelector, isRootPageSelector } from 'ui/Location.selectors'

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

export const previousSelector = createSelector([isEnabledSelector, locationSelector], (isEnabled, location) => {
  if (isEnabled === false) {
    return null
  }

  let params = location.pathname.split('/')
    .filter(x => x.length > 0)

  // chop off the last part.
  params.pop()

  let previous = `/${params.join('/')}`
  console.log(previous)
  return previous
})
