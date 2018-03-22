import isEmpty from 'lodash-es/isEmpty'
import { createSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { ILocation } from './redux/Routing.redux'
export const locationSelector = (state: IReduxState): ILocation => state.routing.location
// tslint:disable-next-line:no-any
export const paramsSelector = (state: IReduxState): any => state.routing.params
const ROOT = '/'

export const isRootPageByUrl = (url): boolean => {
  const isRoot = url === ROOT
  return isRoot
}

export const isStatePageByUrl = (url): boolean => {
  const isRoot = isRootPageByUrl(url)
  if (isRoot) {
    return false
  }

  const isState = url.split('/').filter(x => x.length > 0).length === 1
  return isState
}

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
