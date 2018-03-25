import isEmpty from 'lodash-es/isEmpty'
import { createSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { ILocation } from './redux/Routing.redux'
export const locationSelector = (state: IReduxState): ILocation => state.routing.location
// tslint:disable-next-line:no-any
export const paramsSelector = (state: IReduxState): any => state.routing.params
const ROOT = '/'

export const getIsRootPage = (location: ILocation): boolean => {
  if (location == null) {
    return false
  }
  // this is the fastest way to inspect if this is root or not.
  return location.pathname === ROOT
}
export const isRootPageSelector = createSelector(locationSelector, getIsRootPage)

export const getIsStatePage = (location: ILocation, params: any) => {
  if (location == null || params == null || location.pathname == null) {
    return false
  }

  if (params.usState == null) {
    return false
  }

  if (params.credits != null || params.region != null) {
    return false
  }

  const isState = location.pathname.split('/').filter(x => x.length > 0).length === 1
  return isState
}

export const isStatePageSelector = createSelector(locationSelector, paramsSelector, getIsStatePage)

export const getHashSelector = createSelector(locationSelector, (location: ILocation): string => {
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

export const getParam = (p: any, k: string): string => {
  return p == null || p[k] == null ? null : p[k]
}

export const selectedStateIdSelector = createSelector(paramsSelector, (params: any): string => {
  return getParam(params, 'usState')
})

export const selectedRegionIdSelector = createSelector(paramsSelector, (params: any): string => {
  return getParam(params, 'region')
})

export const selectedStreamIdSelector = createSelector(paramsSelector, (params: any): string => {
  return getParam(params, 'streamId')
})
