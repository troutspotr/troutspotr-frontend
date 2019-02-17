import isEmpty from 'lodash-es/isEmpty'
import { createSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { ILocation } from './redux/Routing.redux'
import { Feature, LineString, MultiPolygon, Point } from 'geojson';
import { point } from '@turf/helpers';

export const locationSelector = (state: IReduxState): ILocation => state.routing.location
// tslint:disable-next-line:no-any
export const paramsSelector = (state: IReduxState): any => state.routing.params
export const hashSelector = (state: IReduxState): any => state.routing.location.hash
export const queryParametersSelector = (state: IReduxState): any => state.routing.location.query
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

export const getHashSelector = createSelector(locationSelector, (location: ILocation): string | null => {
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

export const selectedAccessPointIdSelector = createSelector(hashSelector, (hash: any): string => {
  if (hash == null || hash.length === 0) {
    return null
  }

  return hash.replace('#', '')
})


export interface ISelectedPoint {
  latitude: number,
  longitude: number,
  zoom: number
}
export const selectedCustomLocationPointGeoJson = createSelector(
  queryParametersSelector,
  (query: any): Feature<Point, ISelectedPoint> | null => {
    const isValid = query != null && query.x != null && query.y != null && query.z != null
    if (isValid === false) {
      return null
    }
    const latitude = parseFloat(query.x)
    const longitude = parseFloat(query.y)
    const zoom = parseFloat(query.z) || null
    const geojson =  point([query.x, query.y], { latitude, longitude, zoom })
    return geojson
  }
)
