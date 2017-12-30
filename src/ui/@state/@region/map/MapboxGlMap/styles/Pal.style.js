import * as colors from 'ui/core/Colors'
import {PAL_SECTION_LAYER_ID} from '../filters/Filters.selectors'
import {PALS_SOURCE_ID} from '../sources/Source.selectors'

export const PalStyle = {
  'id': PAL_SECTION_LAYER_ID,
  'type': 'fill',
  'source': PALS_SOURCE_ID,
  'interactive': false,
  'filter': [
    '==',
    '$type',
    'Polygon',
  ],
  'layout': {'visibility': 'visible'},
  'paint': {
    'fill-color': colors.PalGreen,
    'fill-opacity': {
      'base': 1,
      'stops': [
        [
          7,
          0,
        ],
        [
          9,
          0.05,
        ],
        [
          12,
          0.05,
        ],
        [
          14,
          0.15,
        ],
        [
          16,
          0.25,
        ],
        [
          18,
          0.1,
        ],
      ],
    },
  },
}
