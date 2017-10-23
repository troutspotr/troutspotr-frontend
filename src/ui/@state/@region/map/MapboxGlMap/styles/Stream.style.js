import * as colors from 'ui/core/Colors'
import {STREAM_ACTIVE_LAYER_ID,
  STREAM_CENTROID_LABEL_ACTIVE_LAYER_ID,
  STREAM_CENTROID_LABEL_HIGHLIGHT_LAYER_ID,
  STREAM_CENTROID_LABEL_QUIET_LAYER_ID,
  STREAM_QUITE_LAYER_ID} from '../filters/Filters.selectors'

import {FONT_ROBOTO_REGULAR} from './Base.style'
import {STREAMS_SOURCE_ID, STREAM_CENTROIDS_SOURCE_ID} from '../sources/Source.selectors'

const CENTROID_LABEL_MIN_ZOOM = 8
const CENTROID_LABEL_MAX_ZOOM = 13.3
const CENTROID_LABEL_TEXT_SIZE = 10
const CENTROID_LABEL_TEXT_PADDING = 15

export const StreamActiveStyle = {
  'id': STREAM_ACTIVE_LAYER_ID,
  'type': 'line',
  'source': STREAMS_SOURCE_ID,
  'interactive': true,
  'layout': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round',
  },
  'paint': {
    'line-color': colors.StreamGray,
    'line-width': 1,
  },
}
export const StreamQuietStyle = {
  'id': STREAM_QUITE_LAYER_ID,
  'type': 'line',
  'source': STREAMS_SOURCE_ID,
  'interactive': true,
  'layout': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round',
  },
  'paint': {
    'line-color': colors.StreamGray,
    'line-width': 1,
  },
}

export const StreamCentroidsActiveStyle = {
  'id': STREAM_CENTROID_LABEL_ACTIVE_LAYER_ID,
  'type': 'symbol',
  'source': STREAM_CENTROIDS_SOURCE_ID,
  'interactive': true,
  'minzoom': CENTROID_LABEL_MIN_ZOOM,
  'maxzoom': CENTROID_LABEL_MAX_ZOOM,
  'layout': {
    'text-field': '{name}',
    'text-anchor': 'left',
    'text-size': {
      'base': 1,
      'stops': [
        [
          CENTROID_LABEL_MIN_ZOOM,
          CENTROID_LABEL_TEXT_SIZE - 5,
        ],
        [
          CENTROID_LABEL_MIN_ZOOM + 1,
          CENTROID_LABEL_TEXT_SIZE,
        ],
        [
          CENTROID_LABEL_MIN_ZOOM + 3,
          CENTROID_LABEL_TEXT_SIZE + 2,
        ],
      ],
    },

    'text-padding': CENTROID_LABEL_TEXT_PADDING,
    'text-rotate': 0,
    'text-offset': [
      1.0,
      0,
    ],
    'text-font': FONT_ROBOTO_REGULAR,
  },
  'paint': {
    'text-opacity': {
      'base': 1,
      'stops': [
        [
          CENTROID_LABEL_MIN_ZOOM,
          0.1,
        ],
        [
          CENTROID_LABEL_MIN_ZOOM + 1,
          0.5,
        ],
        [
          CENTROID_LABEL_MIN_ZOOM + 3,
          0.7,
        ],
      ],
    },
    'text-color': colors.OffWhite,
    'text-halo-blur': 0,
    'text-halo-color': colors.MoodyGray,
    'text-halo-width': 1.5,
  },
}

export const StreamCentroidsQuietStyle = {
  'id': STREAM_CENTROID_LABEL_QUIET_LAYER_ID,
  'type': 'symbol',
  'source': STREAM_CENTROIDS_SOURCE_ID,
  'interactive': true,
  'minzoom': CENTROID_LABEL_MIN_ZOOM,
  'maxzoom': CENTROID_LABEL_MAX_ZOOM,
  'layout': {
    'text-field': '{name}',
    'text-anchor': 'left',
    'text-size': {
      'base': 1,
      'stops': [
        [
          CENTROID_LABEL_MIN_ZOOM,
          CENTROID_LABEL_TEXT_SIZE - 5,
        ],
        [
          CENTROID_LABEL_MIN_ZOOM + 1,
          CENTROID_LABEL_TEXT_SIZE,
        ],
      ],
    },

    'text-padding': CENTROID_LABEL_TEXT_PADDING,
    'text-rotate': 0,
    'text-offset': [
      1.0,
      0,
    ],
    'text-font': FONT_ROBOTO_REGULAR,
  },
  'paint': {
    'text-opacity': 0.1,
    'text-color': colors.OffWhite,
    'text-halo-blur': 0,
    'text-halo-color': colors.MoodyGray,
    'text-halo-width': 1.5,
  },
}

export const StreamCentroidsHighlightStyle = {
  'id': STREAM_CENTROID_LABEL_HIGHLIGHT_LAYER_ID,
  'type': 'symbol',
  'source': STREAM_CENTROIDS_SOURCE_ID,
  'interactive': true,
  'minzoom': CENTROID_LABEL_MIN_ZOOM - 3,
  'maxzoom': CENTROID_LABEL_MAX_ZOOM,
  'layout': {
    'text-field': '{name}',
    'text-anchor': 'left',
    'text-size': CENTROID_LABEL_TEXT_SIZE + 4,

    'text-padding': CENTROID_LABEL_TEXT_PADDING,
    'text-rotate': 0,
    'text-offset': [
      1.0,
      0,
    ],
    'text-font': FONT_ROBOTO_REGULAR,
  },
  'paint': {
    'text-opacity': 0.7,
    'text-color': colors.StreamBlue,
    'text-halo-blur': 0,
    'text-halo-color': colors.MoodyGray,
    'text-halo-width': 1.5,
  },
}
