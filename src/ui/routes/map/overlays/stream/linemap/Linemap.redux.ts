import { IStream } from 'coreTypes/stream/IStream';
import { IAccessPointGeoJsonProps } from 'coreTypes/accessPoint/IAccessPoint';
import { navigateToAccessPoint, selectFoculPoint } from 'ui/routes/map/Map.redux.interactivity';
import { browserHistory } from 'react-router'
import * as qs from 'query-string'
import { StreamFeature } from 'api/region/IRegionGeoJSON';
import along from '@turf/along'
import * as d3Scale from 'd3-scale'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer';
import { locationSelector } from 'ui/Location.selectors'
import { setLinestringOffset } from 'ui/routes/@usState/@region/Region.redux';
import debounce from 'lodash-es/debounce'
import { Point, Feature } from '@turf/helpers';
const zoomScale = d3Scale.scaleLinear()
  .domain([0, 60])
  .range([8, 14])

const ALONG_OPTIONS = {
  units: 'miles'
}

const findPointAlong = (offset: number, stream: StreamFeature): Feature<Point, any> | null => {
  try {
    const pointAlong = along(stream, offset, ALONG_OPTIONS)
    return pointAlong
  } catch (e) {
    return null
  }
}

const debouncedUrlUpdate = debounce((pointAlong: Feature<Point, any>, stream: StreamFeature, state: IReduxState) => {
  if (pointAlong == null) {
    return
  }

  const zoom = zoomScale(stream.properties.length_mi)
  if (pointAlong == null) {
    return
  }
  
  const [longitude, latitude] = pointAlong.geometry.coordinates
  if (isNaN(longitude) || isNaN(latitude)) {
    return
  }

  const newQueryString = {
    x: longitude.toFixed(5),
    y: latitude.toFixed(5),
    z: zoom.toFixed(1),
  }

  // solve the query string problem
  if (newQueryString == null) {
    return
  }

  const previousQueryString = {}
  const newQueryParams = {
    ...previousQueryString,
    ...newQueryString
  }
  const serializedString = qs.stringify(newQueryParams)

  // solve the go to url problem

  const { pathname = null } = locationSelector(state)
  if (pathname == null) {
    return
  }
  const newUrl = `${pathname}?${serializedString}`
  browserHistory.push(newUrl)
}, 500)

export const updateUrlFromOffset = (pointAlong: Feature<Point, any>, stream: StreamFeature) => (dispatch, getState) => {
  debouncedUrlUpdate(pointAlong, stream, getState())
}
export const handleOffsetChange = (offset: number | null, radius: number, stream: StreamFeature) => (dispatch: any, getState: () => IReduxState): void => {
  // solve the "along" problem
  if (offset ==  null || offset < 0) {
    dispatch(setLinestringOffset(offset))
    return
  }

  const pointAlong = findPointAlong(offset, stream)
  if (pointAlong == null) {
    return
  }

  dispatch(setLinestringOffset(offset))
  const overrides = {
    pitch: 0,
    linear: true,
    animationDurationMs: 160,
  }
  dispatch(selectFoculPoint(pointAlong.geometry.coordinates, radius, overrides))
  // updateUrlFromOffset(pointAlong, stream)(dispatch, getState)
}

export const handleStreamSelect = (selectedStream: IStream, ap: IAccessPointGeoJsonProps) => (dispatch: any, getState: any): void => {
   if (selectedStream == null || ap == null) {
     return
   }

   navigateToAccessPoint(ap.gid)(dispatch, getState)
}
