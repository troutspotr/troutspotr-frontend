import * as colors from 'ui/core/Colors'
import { RESTRICTION_SECTIONS_ACTIVE_LAYER_ID, RESTRICTION_SECTIONS_QUITE_LAYER_ID } from '../filters/Filters.selectors'
import { RESTRICTION_SECTIONS_SOURCE_ID } from '../sources/Source.selectors'

export const RestrictionSectionActiveStyle = {
  'id': RESTRICTION_SECTIONS_ACTIVE_LAYER_ID,
  'type': 'line',
  'source': RESTRICTION_SECTIONS_SOURCE_ID,
  'source-layer': 'restrictionSection-19bqjx',
  'interactive': false,
  'layout': {
    'visibility': 'visible',
    'line-cap': 'butt',
    'line-join': 'miter'
  },
  'paint': {
    'line-offset': 0,
    'line-dasharray': {
      'base': 1,
      'stops': [
        [
          10,
          [
            1,
            0
          ]
        ],
        [
          12,
          [
            4,
            1
          ]
        ],
        [
          16,
          [
            3,
            4
          ]
        ]
      ]
    }, // colors.RestrictionYellow
    'line-color': {
      property: 'restriction_id',
      type: 'categorical',
      stops: [
        [0, colors.RestrictionYellow],
        [7, '#FF4E10'],
        [8, colors.RestrictionYellow],
        [17, colors.RestrictionYellow],
        [18, colors.StreamBlue],
        [19, colors.RestrictionYellow],
        [100, colors.RestrictionYellow]
      ]

    },
    'line-gap-width': {
      'base': 1.4,
      'stops': [
        [
          10,
          5
        ],
        [
          13,
          10
        ],
        [
          18,
          120
        ]
      ]
    },
    'line-width': {
      'base': 1.4,
      'stops': [
        [
          13,
          1
        ],
        [
          18,
          10
        ]
      ]
    },
    'line-opacity': {
      'base': 1,
      'stops': [
        [
          9,
          0
        ],
        [
          10,
          1
        ]
      ]
    }
  }
}

export const RestrictionSectionQuietStyle = {
  'id': RESTRICTION_SECTIONS_QUITE_LAYER_ID,
  'type': 'line',
  'source': RESTRICTION_SECTIONS_SOURCE_ID,
  'source-layer': 'restrictionSection-19bqjx',
  'interactive': false,
  'layout': {
    'visibility': 'visible',
    'line-cap': 'butt',
    'line-join': 'miter'
  },
  'paint': {
    'line-offset': 0,
    'line-dasharray': {
      'base': 1,
      'stops': [
        [
          10,
          [
            1,
            0
          ]
        ],
        [
          12,
          [
            4,
            1
          ]
        ],
        [
          16,
          [
            3,
            4
          ]
        ]
      ]
    },
    'line-color': colors.StreamGray,
    'line-gap-width': {
      'base': 1.4,
      'stops': [
        [
          10,
          5
        ],
        [
          13,
          10
        ],
        [
          18,
          120
        ]
      ]
    },
    'line-width': {
      'base': 1.4,
      'stops': [
        [
          13,
          1
        ],
        [
          18,
          10
        ]
      ]
    },
    'line-opacity': {
      'base': 1,
      'stops': [
        [
          9,
          0
        ],
        [
          10,
          1
        ]
      ]
    }
  }
}
