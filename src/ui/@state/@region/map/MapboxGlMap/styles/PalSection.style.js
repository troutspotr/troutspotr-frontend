import * as colors from 'ui/core/Colors'
import {PAL_SECTIONS_ACTIVE_LAYER_ID, PAL_SECTIONS_QUITE_LAYER_ID} from '../filters/Filters.selectors'
import {PAL_SECTIONS_SOURCE_ID} from '../sources/Source.selectors'

export const PalSectionActiveStyle = {
  'id': PAL_SECTIONS_ACTIVE_LAYER_ID,
  'type': 'line',
  'source': PAL_SECTIONS_SOURCE_ID,
  'interactive': false,
  'filter': [
    '==',
    '$type',
    'LineString',
  ],
  'layout': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round',
  },
  'paint': {
    'line-color': colors.PalGreen,
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
          16.5,
          16,
        ],
        [
          18.0,
          7,
        ],
      ],
    },
    // Credit goes to MMA
    'line-opacity': 1.0,
    'line-dasharray': [
      1,
      0,
    ],
  },
}

export const PalSectionQuietStyle = {
  'id': PAL_SECTIONS_QUITE_LAYER_ID,
  'type': 'line',
  'source': PAL_SECTIONS_SOURCE_ID,
  'interactive': false,
  'layout': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round',
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
          16.5,
          16,
        ],
        [
          18.0,
          3,
        ],
      ],
    },
    'line-dasharray': [
      1,
      0,
    ],
  },
}
