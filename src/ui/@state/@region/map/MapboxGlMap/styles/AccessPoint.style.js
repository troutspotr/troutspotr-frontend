import * as colors from './Colors'
import { STREAM_ACCESS_POINTS_ACTIVE_LAYER_ID,
  STREAM_ACCESS_POINTS_QUITE_LAYER_ID,
  STREAM_ACCESS_POINTS_MARKER_BORDER_ACTIVE_LAYER_ID,
  STREAM_ACCESS_POINTS_MARKER_BORDER_QUITE_LAYER_ID,
  STREAM_ACCESS_POINTS_MARKER_CENTER_ACTIVE_LAYER_ID,
  STREAM_ACCESS_POINTS_MARKER_CENTER_QUITE_LAYER_ID } from '../filters/Filters.selectors'
import { STREAM_ACCESS_POINTS_SOURCE_ID } from '../sources/Source.selectors'
export const AccessPointLabelActiveStyle = {
  'id': STREAM_ACCESS_POINTS_ACTIVE_LAYER_ID,
  'type': 'symbol',
  'source': STREAM_ACCESS_POINTS_SOURCE_ID,
  'interactive': false,
  'minzoom': 12,
  'layout': {
    'text-field': '{street_name}',
    'text-anchor': 'left',
    'text-size': 14,
    'text-offset': [
      0.5,
      0
    ],
    'text-font': [
      'DIN Offc Pro Regular',
      'Arial Unicode MS Regular'
    ]
  },
  'paint': {
    'text-color': colors.PalGreen,
    'text-halo-blur': 0,
    'text-halo-color': colors.MoodyGray,
    'text-halo-width': 3
  }
}

export const AccessPointLabelQuietStyle = {
  'id': STREAM_ACCESS_POINTS_QUITE_LAYER_ID,
  'type': 'symbol',
  'source': STREAM_ACCESS_POINTS_SOURCE_ID,
  'interactive': false,
  'minzoom': 12,
  'layout': {
    'text-field': '{street_name}',
    'text-anchor': 'left',
    'text-size': 14,
    'text-offset': [
      0.5,
      0
    ],
    'text-font': [
      'DIN Offc Pro Regular',
      'Arial Unicode MS Regular'
    ]
  },
  'paint': {
    'text-color': colors.MoodyGray,
    'text-halo-blur': 0,
    // 'text-halo-color': colors.MoodyGray,
    'text-halo-width': 3
  }
}

export const AccessPointMarkerBorderActiveStyle = {
  'id': STREAM_ACCESS_POINTS_MARKER_BORDER_ACTIVE_LAYER_ID,
  'type': 'circle',
  'source': STREAM_ACCESS_POINTS_SOURCE_ID,
  'interactive': false,
  'layout': {
    'visibility': 'visible'
  },
  'paint': {
    'circle-color': colors.MoodyGray,
    'circle-blur': {
      'base': 1,
      'stops': [
        [
          7,
          3
        ],
        [
          10,
          0
        ]
      ]
    },
    'circle-opacity': {
      'base': 1,
      'stops': [
        [
          7,
          0
        ],
        [
          9,
          1
        ]
      ]
    },
    'circle-radius': 6
  }
}

export const AccessPointMarkerBorderQuietStyle = {
  'id': STREAM_ACCESS_POINTS_MARKER_BORDER_QUITE_LAYER_ID,
  'type': 'circle',
  'source': STREAM_ACCESS_POINTS_SOURCE_ID,
  'interactive': false,
  'layout': {
    'visibility': 'visible'
  },
  'paint': {
    'circle-color': colors.MoodyGray,
    'circle-blur': {
      'base': 1,
      'stops': [
        [
          7,
          3
        ],
        [
          10,
          0
        ]
      ]
    },
    'circle-opacity': {
      'base': 1,
      'stops': [
        [
          7,
          0
        ],
        [
          9,
          1
        ]
      ]
    },
    'circle-radius': 6
  }
}

export const AccessPointMarkerCenterActiveStyle =
  {
    'id': STREAM_ACCESS_POINTS_MARKER_CENTER_ACTIVE_LAYER_ID,
    'source': STREAM_ACCESS_POINTS_SOURCE_ID,
    'type': 'circle',
    'interactive': false,
    'paint': {
      'circle-color': colors.PalGreen,
      'circle-opacity': 1,
      'circle-blur': 0,
      'circle-radius': {
        'base': 1.6,
        'stops': [
          [
            7,
            0
          ],
          [
            10,
            4
          ]
        ]
      }
    }
  }

export const AccessPointMarkerCenterQuietStyle =
  {
    'id': STREAM_ACCESS_POINTS_MARKER_CENTER_QUITE_LAYER_ID,
    'source': STREAM_ACCESS_POINTS_SOURCE_ID,
    'type': 'circle',
    'interactive': false,
    'paint': {
      'circle-color': colors.StreamGray,
      'circle-opacity': 1,
      'circle-blur': 0,
      'circle-radius': {
        'base': 1.6,
        'stops': [
          [
            7,
            0
          ],
          [
            10,
            4
          ]
        ]
      }
    }
  }
