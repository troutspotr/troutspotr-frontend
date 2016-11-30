import * as colors from 'ui/core/Colors'
import { PAL_SECTIONS_ACTIVE_LAYER_ID, PAL_SECTIONS_QUITE_LAYER_ID } from '../filters/Filters.selectors'
import { PAL_SECTIONS_SOURCE_ID } from '../sources/Source.selectors'

export const PalSectionActiveStyle = {
  'id': PAL_SECTIONS_ACTIVE_LAYER_ID,
  'type': 'line',
  'source': PAL_SECTIONS_SOURCE_ID,
  'interactive': false,
  'filter': [
    '==',
    '$type',
    'LineString'
  ],
  'layout': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': colors.PalGreen,
    'line-width': {
      'base': 1.4,
      'stops': [
        [
          8.5,
          2
        ],
        [
          10,
          2.75
        ],
        [
          18,
          30
        ]
      ]
    },
    // credit goes to MMA
    'line-opacity': 1.0,
    'line-dasharray': [
      1,
      0
    ]
  }
}

export const PalSectionQuietStyle = {
  'id': PAL_SECTIONS_QUITE_LAYER_ID,
  'type': 'line',
  'source': PAL_SECTIONS_SOURCE_ID,
  'interactive': false,
  'layout': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': colors.StreamGray,
    'line-width': {
      'base': 1.4,
      'stops': [
        [
          8.5,
          2
        ],
        [
          10,
          2.75
        ],
        [
          18,
          30
        ]
      ]
    },
    'line-opacity': {
      'base': 1.3,
      'stops': [
        [
          12,
          1
        ],
        [
          15,
          0
        ]
      ]
    },
    'line-dasharray': [
      1,
      0
    ]
  }
}
