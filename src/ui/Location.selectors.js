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

export const isRootPageByUrl = url => {
  let isRoot = url === ROOT
  return isRoot
}
