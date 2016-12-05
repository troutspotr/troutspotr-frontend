import { createSelector } from 'reselect'
import { isEmpty } from 'lodash'
export const locationSelector = state => {
  return state.location
}

const ROOT = '/'
export const isRootPageSelector = createSelector(
  [locationSelector], (location) => {
    let isRoot = isRootPageByUrl(location.pathname)
    return isRoot
  }
)

export const isStatePageSelector = createSelector(
  [locationSelector], (location) => {
    let isState = isStatePageByUrl(location.pathname)
    return isState
  }
)

export const getHashSelector = createSelector(
  [locationSelector],
  (location) => {
    if (isEmpty(location)) {
      return null
    }

    if (isEmpty(location.hash)) {
      return null
    }
    if (location.hash.charAt(0) === '#') {
      return location.hash.substring(1)
    }
    return location.hash
  })

export const isRootPageByUrl = url => {
  let isRoot = url === ROOT
  return isRoot
}

export const isStatePageByUrl = url => {
  let isRoot = isRootPageByUrl(url)
  if (isRoot) {
    return false
  }

  let isState = url.split('/')
    .filter(x => x.length > 0).length === 1
  return isState
}
