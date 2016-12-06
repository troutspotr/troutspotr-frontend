import * as colors from 'ui/core/Colors'
import { STREAM_ACCESS_POINTS_ACTIVE_LAYER_ID,
  STREAM_ACCESS_POINTS_QUITE_LAYER_ID,
  STREAM_ACCESS_POINTS_MARKER_BORDER_ACTIVE_LAYER_ID,
  STREAM_ACCESS_POINTS_MARKER_BORDER_QUITE_LAYER_ID,
  STREAM_ACCESS_POINTS_MARKER_CENTER_ACTIVE_LAYER_ID,
  STREAM_ACCESS_POINTS_MARKER_CENTER_QUITE_LAYER_ID,
  STREAM_ACCESS_POINTS_LETTER_ACTIVE_LAYER_ID,
  STREAM_ACCESS_POINTS_LETTER_QUITE_LAYER_ID } from '../filters/Filters.selectors'
import { STREAM_ACCESS_POINTS_SOURCE_ID } from '../sources/Source.selectors'
export const AccessPointLabelActiveStyle = {
  'id': STREAM_ACCESS_POINTS_ACTIVE_LAYER_ID,
  'type': 'symbol',
  'source': STREAM_ACCESS_POINTS_SOURCE_ID,
  'interactive': true,
  'minzoom': 10,
  'layout': {
    'text-field': '{street_name}',
    // 'text-allow-overlap': true,
    // 'text-ignore-placement': true,
    'text-anchor': 'left',
    'text-size': 12,
    'text-offset': [
      1.0,
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
    // 'text-allow-overlap': true,
    // 'text-ignore-placement': true,
    'text-anchor': 'left',
    'text-size': 12,
    'text-offset': [
      1.0,
      0
    ],
    'text-font': [
      'DIN Offc Pro Regular',
      'Arial Unicode MS Regular'
    ]
  },
  'paint': {
    'text-color': colors.MoodyGray
  }
}

export const AccessPointLetterLabelActiveStyle = {
  'id': STREAM_ACCESS_POINTS_LETTER_ACTIVE_LAYER_ID,
  'type': 'symbol',
  'source': STREAM_ACCESS_POINTS_SOURCE_ID,
  'interactive': true,
  'minzoom': 10,
  'layout': {
    'text-field': '{alphabetLetter}',
    // 'text-allow-overlap': true,
    // 'text-ignore-placement': true,
    'text-anchor': 'center',
    'text-size': 10,
    'text-font': [
      'DIN Offc Pro Bold',
      'Arial Unicode MS Regular'
    ]
  },
  'paint': {
    'text-color': colors.MoodyGray
  }
}

export const AccessPointLabelLetterQuietStyle = {
  'id': STREAM_ACCESS_POINTS_LETTER_QUITE_LAYER_ID,
  'type': 'symbol',
  'source': STREAM_ACCESS_POINTS_SOURCE_ID,
  'interactive': false,
  'minzoom': 12,
  'layout': {
    'text-field': '{alphabetLetter}',
    // 'text-allow-overlap': true,
    // 'text-ignore-placement': true,
    'text-anchor': 'center',
    'text-size': 10,
    'text-font': [
      'DIN Offc Pro Bold',
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
    'circle-radius': 8
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
    'circle-radius': 8
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
            6
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
            6
          ]
        ]
      }
    }
  }
