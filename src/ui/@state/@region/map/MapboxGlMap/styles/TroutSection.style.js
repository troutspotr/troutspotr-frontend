import * as colors from 'ui/core/Colors'
import {TROUT_SECTIONS_ACTIVE_LAYER_ID, TROUT_SECTIONS_QUITE_LAYER_ID} from '../filters/Filters.selectors'
import {TROUT_STREAM_SECTIONS_SOURCE_ID} from '../sources/Source.selectors'
import {SATELLITE_ZOOM_LEVEL} from './Satellite.style'
export const TroutSectionActiveStyle = {
  'id': TROUT_SECTIONS_ACTIVE_LAYER_ID,
  'type': 'line',
  'source': TROUT_STREAM_SECTIONS_SOURCE_ID,
  'interactive': false,
  'layout': {
    'visibility': 'visible',
    'line-join': 'round',
    'line-cap': 'round',
  },
  'paint': {
    'line-color': colors.StreamBlue,
    'line-width': {
      'base': 1.5,
      'stops': [
        [
          8.5,
          1,
        ],
        [
          10,
          1.25,
        ],
        [
          SATELLITE_ZOOM_LEVEL,
          6,
        ],
        [
          18.0,
          3,
        ],
      ],
    },
  },
}

export const TroutSectionQuietStyle = {
  'id': TROUT_SECTIONS_QUITE_LAYER_ID,
  'type': 'line',
  'source': TROUT_STREAM_SECTIONS_SOURCE_ID,
  'interactive': false,
  'layout': {
    'visibility': 'visible',
    'line-join': 'round',
    'line-cap': 'round',
  },
  'paint': {
    'line-color': colors.StreamGray,
    'line-width': {
      'base': 1.5,
      'stops': [
        [
          8.5,
          1,
        ],
        [
          10,
          1.25,
        ],
        [
          SATELLITE_ZOOM_LEVEL,
          6,
        ],
        [
          18.0,
          3,
        ],
      ],
    },
  },
}
