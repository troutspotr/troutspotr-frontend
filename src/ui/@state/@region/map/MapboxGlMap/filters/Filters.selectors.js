import { createSelector } from 'reselect'
// import * as regionSelectors from 'ui/@state/@region/Region.selectors'
// import { isEmpty } from 'lodash'
import * as regionSelectors from 'ui/@state/@region/Region.selectors'
import { displayedStreamCentroidDataSelector } from 'ui/@state/State.selectors'

// import { PALS_SOURCE_ID,
//   TROUT_STREAM_SECTIONS_SOURCE_ID,
//   STREAMS_SOURCE_ID,
//   PAL_SECTIONS_SOURCE_ID,
//   STREAM_ACCESS_POINTS_SOURCE_ID,
//   RESTRICTION_SECTIONS_SOURCE_ID } from '../sources/Source.selectors'

export const STREAM_ACTIVE_LAYER_ID = 'stream-active-layer'
export const STREAM_QUITE_LAYER_ID = 'stream-quiet-layer'

export const TROUT_SECTIONS_ACTIVE_LAYER_ID = 'trout-sections-active-layer'
export const TROUT_SECTIONS_QUITE_LAYER_ID = 'trout-sections-quiet-layer'

export const PAL_SECTIONS_ACTIVE_LAYER_ID = 'pal-sections-active-layer'
export const PAL_SECTIONS_QUITE_LAYER_ID = 'pal-sections-quiet-layer'

export const RESTRICTION_SECTIONS_ACTIVE_LAYER_ID = 'restriction-sections-active-layer'
export const RESTRICTION_SECTIONS_QUITE_LAYER_ID = 'restriction-sections-quiet-layer'

export const STREAM_ACCESS_POINTS_ACTIVE_LABEL_LAYER_ID = 'stream-access-points-active-layer'
export const STREAM_ACCESS_POINTS_QUITE_LABEL_LAYER_ID = 'stream-access-points-quiet-layer'

export const STREAM_ACCESS_POINTS_LETTER_ACTIVE_LAYER_ID = 'stream-access-points-letter-active-layer'
export const STREAM_ACCESS_POINTS_LETTER_QUITE_LAYER_ID = 'stream-access-points-letter-quiet-layer'

export const STREAM_ACCESS_POINTS_MARKER_BORDER_ACTIVE_LAYER_ID = 'stream-access-points-marker-border-active-layer'
export const STREAM_ACCESS_POINTS_MARKER_BORDER_QUITE_LAYER_ID = 'stream-access-points-marker-border-quiet-layer'

export const STREAM_ACCESS_POINTS_MARKER_CENTER_ACTIVE_LAYER_ID = 'stream-access-points-marker-center-active-layer'
export const STREAM_ACCESS_POINTS_MARKER_CENTER_QUITE_LAYER_ID = 'stream-access-points-marker-center-quiet-layer'

export const GPS_LOCATION_OUTLINE_LAYER_ID = 'gps-location-outline-layer'
export const GPS_LOCATION_CENTER_LAYER_ID = 'gps-location-center-layer'

export const STREAM_CENTROID_LABEL_ACTIVE_LAYER_ID = 'stream-centroid-label-active-layer'
export const STREAM_CENTROID_LABEL_QUIET_LAYER_ID = 'stream-centroid-label-quiet-layer'
export const STREAM_CENTROID_LABEL_HIGHLIGHT_LAYER_ID = 'stream-centroid-label-highlight-layer'

export const PAL_SECTION_LAYER_ID = 'pal-layer'
export const SATELLITE_LAYER_ID = 'satellite-layer'

export const getSelectedStreamFilter = createSelector(
  [
    regionSelectors.visibleTroutStreamIdsSelector,
    displayedStreamCentroidDataSelector
  ],
  (
    visibleIds,
    displayedStreamCentroid
  ) => {
    let isStreamSelected = displayedStreamCentroid != null
    if (isStreamSelected) {
      return [displayedStreamCentroid.gid]
    }

    return visibleIds
  })

export const getStreamsActiveFilter = createSelector(
  [getSelectedStreamFilter],
  (visibleTroutStreamIds) => {
    return ['in', 'gid'].concat(visibleTroutStreamIds)
  })

export const getStreamsQuietFilter = createSelector(
  [getSelectedStreamFilter],
  (visibleTroutStreamIds) => {
    return ['!in', 'gid'].concat(visibleTroutStreamIds)
  })

export const getStreamCentroidsActiveFilter = createSelector(
  [getSelectedStreamFilter],
  (visibleTroutStreamIds) => {
    return ['in', 'gid'].concat(visibleTroutStreamIds)
  })

export const getStreamCentroidsHighlightFilter = createSelector(
  [getSelectedStreamFilter, displayedStreamCentroidDataSelector],
  (visibleTroutStreamIds, displayedStreamCentroid) => {
    if (displayedStreamCentroid != null) {
      return ['in', 'gid'].concat([displayedStreamCentroid.gid])
    }
    // return an empty filter
    return ['in', 'gid'].concat([-1])
  })

export const getStreamCentroidsQuietFilter = createSelector(
  [getSelectedStreamFilter],
  (visibleTroutStreamIds) => {
    return ['!in', 'gid'].concat(visibleTroutStreamIds)
  })

export const getDerivedFeatureActiveFilter = createSelector(
  [getSelectedStreamFilter],
  (visibleTroutStreamIds) => {
    return ['in', 'stream_gid'].concat(visibleTroutStreamIds)
  })

export const getDerivedFeatureQuietFilter = createSelector(
  [getSelectedStreamFilter],
  (visibleTroutStreamIds) => {
    return ['!in', 'stream_gid'].concat(visibleTroutStreamIds)
  })

const STREAM_ACCESS_POINT_ACTIVE_FILTER_BASE = [
  'all',
  [
    '==',
    '$type',
    'Point'
  ],
  [
    'any',
    [
      '==',
      'bridgeType',
      'publicTrout'
    ],
    [
      '==',
      'bridgeType',
      'permissionRequired'
    ]
  ]
]

const STREAM_ACCESS_POINT_QUIET_FILTER_BASE = [
  'all',
  [
    '==',
    '$type',
    'Point'
  ],
  [
    'any',
    [
      '==',
      'bridgeType',
      'publicTrout'
    ]
  ]
]

export const getAccessPointActiveFilter = createSelector(
  [getSelectedStreamFilter,
    getDerivedFeatureActiveFilter],
  (visibleTroutStreamIds, derivedFeatureActiveFilter) => {
    let result = STREAM_ACCESS_POINT_ACTIVE_FILTER_BASE.concat([derivedFeatureActiveFilter])
    return result
  })

export const getAccessPointQuietFilter = createSelector(
  [getSelectedStreamFilter,
    getDerivedFeatureQuietFilter],
  (visibleTroutStreamIds, derivedQuietFilter) => {
    let result = STREAM_ACCESS_POINT_QUIET_FILTER_BASE.concat([derivedQuietFilter])
    // let result = derivedQuietFilter
    return result
  })

export const getAccessPointQuietLabelFilter = createSelector(
  [getSelectedStreamFilter,
    getDerivedFeatureQuietFilter],
  (visibleTroutStreamIds, derivedQuietFilter) => {
    let result = STREAM_ACCESS_POINT_QUIET_FILTER_BASE.concat([derivedQuietFilter])
    return result
  })

export const getStreamFilters = createSelector(
  [
    getStreamsActiveFilter,
    getStreamsQuietFilter,
    getDerivedFeatureActiveFilter,
    getDerivedFeatureQuietFilter,
    getAccessPointActiveFilter,
    getAccessPointQuietFilter,
    getStreamCentroidsActiveFilter,
    getStreamCentroidsQuietFilter,
    getStreamCentroidsHighlightFilter
  ],
  (activeFilter,
    quietFilter,
    derivedFeatureActiveFilter,
    derivedFeatureQuietFilter,
    accessPointActiveFilter,
    accessPointQuietFilter,
    centroidActiveFilter,
    centroidQuietFilter,
    centroidHighlightFilter
    ) => {
    let streamAccessActiveLabel = {
      filterDefinition: accessPointActiveFilter,
      layerId: STREAM_ACCESS_POINTS_ACTIVE_LABEL_LAYER_ID
    }

    let streamAccessQuietLabel = {
      filterDefinition: accessPointQuietFilter,
      layerId: STREAM_ACCESS_POINTS_QUITE_LABEL_LAYER_ID
    }
// getStreamCentroidsActiveFilter
// getStreamCentroidsQuietFilter
    let streamCentroidActiveLabel = {
      filterDefinition: centroidActiveFilter,
      layerId: STREAM_CENTROID_LABEL_ACTIVE_LAYER_ID
    }

    let streamCentroidQuietLabel = {
      filterDefinition: centroidQuietFilter,
      layerId: STREAM_CENTROID_LABEL_QUIET_LAYER_ID
    }

    let streamCentroidHighlightLabel = {
      filterDefinition: centroidHighlightFilter,
      layerId: STREAM_CENTROID_LABEL_HIGHLIGHT_LAYER_ID
    }

    return [{ // streams
      filterDefinition: activeFilter,
      layerId: STREAM_ACTIVE_LAYER_ID
    }, {
      filterDefinition: quietFilter,
      layerId: STREAM_QUITE_LAYER_ID
    }, { // trout sections
      filterDefinition: derivedFeatureActiveFilter,
      layerId: TROUT_SECTIONS_ACTIVE_LAYER_ID
    }, {
      filterDefinition: derivedFeatureQuietFilter,
      layerId: TROUT_SECTIONS_QUITE_LAYER_ID
    }, { // pal sections
      filterDefinition: derivedFeatureActiveFilter,
      layerId: PAL_SECTIONS_ACTIVE_LAYER_ID
    }, {
      filterDefinition: derivedFeatureQuietFilter,
      layerId: PAL_SECTIONS_QUITE_LAYER_ID
    }, { // restriction sections
      filterDefinition: derivedFeatureActiveFilter,
      layerId: RESTRICTION_SECTIONS_ACTIVE_LAYER_ID
    }, {
      filterDefinition: derivedFeatureQuietFilter,
      layerId: RESTRICTION_SECTIONS_QUITE_LAYER_ID
    },

      streamCentroidActiveLabel,
      streamCentroidQuietLabel,
      streamCentroidHighlightLabel,
      streamAccessActiveLabel,
      streamAccessQuietLabel,
    { // stream access center
      filterDefinition: accessPointActiveFilter,
      layerId: STREAM_ACCESS_POINTS_MARKER_BORDER_ACTIVE_LAYER_ID
    }, {
      filterDefinition: accessPointQuietFilter,
      layerId: STREAM_ACCESS_POINTS_MARKER_BORDER_QUITE_LAYER_ID
    }, { // stream access center border
      filterDefinition: accessPointActiveFilter,
      layerId: STREAM_ACCESS_POINTS_MARKER_CENTER_ACTIVE_LAYER_ID
    }, { // stream access label
      filterDefinition: accessPointQuietFilter,
      layerId: STREAM_ACCESS_POINTS_MARKER_CENTER_QUITE_LAYER_ID
    }, { // stream access active letter
      filterDefinition: accessPointActiveFilter,
      layerId: STREAM_ACCESS_POINTS_LETTER_ACTIVE_LAYER_ID
    }, { // stream access quiet letter
      filterDefinition: accessPointQuietFilter,
      layerId: STREAM_ACCESS_POINTS_LETTER_QUITE_LAYER_ID
    }]
  })
