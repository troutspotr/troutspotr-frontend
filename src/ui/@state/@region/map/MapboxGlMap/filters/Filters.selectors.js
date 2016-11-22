import { createSelector } from 'reselect'
// import * as regionSelectors from 'ui/@state/@region/Region.selectors'
// import { isEmpty } from 'lodash'
import * as regionSelectors from 'ui/@state/@region/Region.selectors'

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

export const STREAM_ACCESS_POINTS_ACTIVE_LAYER_ID = 'stream-access-points-active-layer'
export const STREAM_ACCESS_POINTS_QUITE_LAYER_ID = 'stream-access-points-quiet-layer'

export const STREAM_ACCESS_POINTS_MARKER_BORDER_ACTIVE_LAYER_ID = 'stream-access-points-marker-border-active-layer'
export const STREAM_ACCESS_POINTS_MARKER_BORDER_QUITE_LAYER_ID = 'stream-access-points-marker-border-quiet-layer'

export const STREAM_ACCESS_POINTS_MARKER_CENTER_ACTIVE_LAYER_ID = 'stream-access-points-marker-center-active-layer'
export const STREAM_ACCESS_POINTS_MARKER_CENTER_QUITE_LAYER_ID = 'stream-access-points-marker-center-quiet-layer'

export const PAL_SECTION_LAYER_ID = 'pal-layer'

export const getStreamsActiveFilter = createSelector(
  [regionSelectors.visibleTroutStreamIdsSelector],
  (visibleTroutStreamIds) => {
    return ['in', 'gid'].concat(visibleTroutStreamIds)
  })

export const getStreamsQuietFilter = createSelector(
  [regionSelectors.visibleTroutStreamIdsSelector],
  (visibleTroutStreamIds) => {
    return ['!in', 'gid'].concat(visibleTroutStreamIds)
  })

export const getDerivedFeatureActiveFilter = createSelector(
  [regionSelectors.visibleTroutStreamIdsSelector],
  (visibleTroutStreamIds) => {
    return ['in', 'stream_gid'].concat(visibleTroutStreamIds)
  })

export const getDerivedFeatureQuietFilter = createSelector(
  [regionSelectors.visibleTroutStreamIdsSelector],
  (visibleTroutStreamIds) => {
    return ['!in', 'stream_gid'].concat(visibleTroutStreamIds)
  })

const STREAM_ACCESS_POINT_FILER_BASE = [
  'all',
  [
    '==',
    '$type',
    'Point'
  ],
  [
    'all',
    [
      '==',
      'is_over_publicly_accessible_land',
      1
    ],
    [
      '>=',
      'is_over_trout_stream',
      1
    ]
  ]
]

export const getAccessPointActiveFilter = createSelector(
  [regionSelectors.visibleTroutStreamIdsSelector,
    getDerivedFeatureActiveFilter],
  (visibleTroutStreamIds, derivedFeatureActiveFilter) => {
    // console.log(STREAM_ACCESS_POINT_FILER_BASE)

    let result = STREAM_ACCESS_POINT_FILER_BASE.concat([derivedFeatureActiveFilter])
    // let result = derivedFeatureActiveFilter
    return result
  })

export const getAccessPointQuietFilter = createSelector(
  [regionSelectors.visibleTroutStreamIdsSelector,
    getDerivedFeatureQuietFilter],
  (visibleTroutStreamIds, derivedQuietFilter) => {
    // console.log(STREAM_ACCESS_POINT_FILER_BASE)

    let result = STREAM_ACCESS_POINT_FILER_BASE.concat([derivedQuietFilter])
    // let result = derivedQuietFilter
    return result
  })

export const getStreamFilters = createSelector(
  [
    getStreamsActiveFilter,
    getStreamsQuietFilter,
    getDerivedFeatureActiveFilter,
    getDerivedFeatureQuietFilter,
    getAccessPointActiveFilter,
    getAccessPointQuietFilter
  ],
  (activeFilter,
    quietFilter,
    derivedFeatureActiveFilter,
    derivedFeatureQuietFilter,
    accessPointActiveFilter,
    accessPointQuietFilter) => {
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
    }, { // stream access point border
      filterDefinition: accessPointActiveFilter,
      layerId: STREAM_ACCESS_POINTS_ACTIVE_LAYER_ID
    }, {
      filterDefinition: accessPointQuietFilter,
      layerId: STREAM_ACCESS_POINTS_QUITE_LAYER_ID
    }, { // stream access center
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
    }]
  })
