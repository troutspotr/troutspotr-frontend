// import { createSelector } from 'reselect'

export const statesGeoJsonSelector = state => state.geo.statesGeoJson
export const countiesGeoJsonSelector = state => state.geo.countiesGeoJson
export const regionsGeoJsonSelector = state => state.geo.regionsGeoJson

export const statesDictionarySelector = state => state.geo.statesDictionary
export const countiesDictionarySelector = state => state.geo.countyDictionary
export const regionsDictionarySelector = state => state.geo.regionDictionary

export const streamCentroidsGeoJsonSelector = state => state.geo.streamCentroidsGeoJson
export const tableOfContentsLoadingStatusSelector = state => state.geo.tableOfContentsLoadingStatus
