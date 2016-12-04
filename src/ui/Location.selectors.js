import { createSelector } from 'reselect'

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
