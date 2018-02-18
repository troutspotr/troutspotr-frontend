import { createSelector } from 'reselect'
import { isEmpty } from 'lodash'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
export const locationSelector = (state: IReduxState) => state.routing.location

const ROOT = '/'
export const isRootPageSelector = createSelector([locationSelector], location => {
  const isRoot = isRootPageByUrl(location.pathname)
  return isRoot
})

export const isStatePageSelector = createSelector([locationSelector], location => {
  const isState = isStatePageByUrl(location.pathname)
  return isState
})

export const getHashSelector = createSelector([locationSelector], location => {
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
  const isRoot = url === ROOT
  return isRoot
}

export const isStatePageByUrl = url => {
  const isRoot = isRootPageByUrl(url)
  if (isRoot) {
    return false
  }

  const isState = url.split('/').filter(x => x.length > 0).length === 1
  return isState
}
