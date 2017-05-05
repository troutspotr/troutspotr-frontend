import { createSelector } from 'reselect'
import * as regionSelectors from 'ui/@state/@region/Region.selectors'
import { getGpsCoordinateFeatureSelector } from 'ui/core/gps/Gps.selectors'
import { isEmpty } from 'lodash'

export const PALS_SOURCE_ID = 'pals-src'
export const TROUT_STREAM_SECTIONS_SOURCE_ID = 'trout-stream-sections-src'
export const STREAMS_SOURCE_ID = 'streams-src'
export const STREAM_CENTROIDS_SOURCE_ID = 'stream-centroids-src'
export const PAL_SECTIONS_SOURCE_ID = 'pal-sections-src'
export const STREAM_ACCESS_POINTS_SOURCE_ID = 'stream-access-points-src'
export const RESTRICTION_SECTIONS_SOURCE_ID = 'restriction-sections-src'
export const GPS_LOCATION_SOURCE_ID = 'gps-location-src'

export const streamSourceSelector = createSelector(
  [regionSelectors.streamsSelector],
  (streams) => {
    if (isEmpty(streams)) {
      return null
    }
    let streamSourceLayer = sourceGenerator(STREAMS_SOURCE_ID, streams)
    return streamSourceLayer
  })

export const streamCentroidSourceSelector = createSelector(
  [regionSelectors.streamCentroidsSelector],
  (centroids) => {
    if (isEmpty(centroids)) {
      return null
    }

    let centroidsSourceLayer = sourceGenerator(STREAM_CENTROIDS_SOURCE_ID, centroids)
    return centroidsSourceLayer
  })

export const troutSectionSourceSelector = createSelector(
  [regionSelectors.troutStreamSectionsSelector],
  (troutSections) => {
    if (isEmpty(troutSections)) {
      return null
    }
    let troutSectionsSource = sourceGenerator(TROUT_STREAM_SECTIONS_SOURCE_ID, troutSections)
    return troutSectionsSource
  })

export const palSourceSelector = createSelector(
  [regionSelectors.palsSelector],
  (pals) => {
    if (isEmpty(pals)) {
      return null
    }
    let palsSource = sourceGenerator(PALS_SOURCE_ID, pals)
    return palsSource
  })

export const restrictionSectionSourceSelector = createSelector(
  [regionSelectors.restrictionSectionsSelector],
  (restrictionSections) => {
    if (isEmpty(restrictionSections)) {
      return null
    }
    let restrictionSectionsSource = sourceGenerator(RESTRICTION_SECTIONS_SOURCE_ID, restrictionSections)
    return restrictionSectionsSource
  })

export const palSectionSourceSelector = createSelector(
  [regionSelectors.palSectionsSelector],
  (palSections) => {
    if (isEmpty(palSections)) {
      return null
    }
    let palSectionsSource = sourceGenerator(PAL_SECTIONS_SOURCE_ID, palSections)
    return palSectionsSource
  })

export const gpsLocationSourceSelector = createSelector(
  [getGpsCoordinateFeatureSelector],
  (gpsLocation) => {
    if (isEmpty(gpsLocation)) {
      return null
    }
    let gpsLocationSource = sourceGenerator(GPS_LOCATION_SOURCE_ID, gpsLocation)
    return gpsLocationSource
  })

export const streamAccessPointsSourceSelector = createSelector(
  [regionSelectors.streamAccessPointSelector],
  (streamAccessPoints) => {
    if (isEmpty(streamAccessPoints)) {
      return null
    }
    let streamAccessPointsSource = sourceGenerator(STREAM_ACCESS_POINTS_SOURCE_ID, streamAccessPoints)
    return streamAccessPointsSource
  })

export const getMapboxGlSources = createSelector(
  [
    streamSourceSelector,
    streamCentroidSourceSelector,
    troutSectionSourceSelector,
    palSourceSelector,
    restrictionSectionSourceSelector,
    palSectionSourceSelector,
    streamAccessPointsSourceSelector
  ],
  (streamSource,
    centroidsSource,
    troutSectionSource,
    palSource,
    restrictionSectionSource,
    palSectionSource,
    streamAccessPointsSource) => {
    let result = [
      streamSource,
      centroidsSource,
      troutSectionSource,
      palSource,
      restrictionSectionSource,
      palSectionSource,
      streamAccessPointsSource].filter(x => x != null)
    return result
  })

const sourceGenerator = (sourceId, sourceData) => {
  return {
    sourceId,
    sourceData
  }
}
