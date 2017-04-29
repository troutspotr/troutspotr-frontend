import * as colors from 'ui/core/Colors'
import { GPS_LOCATION_MARKER_BORDER_LAYER_ID,
  GPS_LOCATION_MARKER_CENTER_LAYER_ID } from '../filters/Filters.selectors'

import { GPS_LOCATION_POINT_SOURCE_ID } from '../sources/Source.selectors'


export const AccessPointMarkerBorderActiveStyle = {
  'id': GPS_LOCATION_MARKER_BORDER_LAYER_ID,
  'type': 'circle',
  'source': GPS_LOCATION_POINT_SOURCE_ID,
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
    'id': GPS_LOCATION_MARKER_CENTER_LAYER_ID,
    'source': GPS_LOCATION_POINT_SOURCE_ID,
    'type': 'circle',
    'interactive': false,
    'paint': {
      // 'circle-color': colors.PalGreen,
      'circle-color': {
        property: 'bridgeType',
        type: 'categorical',
        stops: [
          ['publicTrout', colors.PalGreen],
          ['permissionRequired', colors.StreamBlue],
          ['unsafe', colors.MoodyGray],
          ['uninteresting', 'red']
        ]
      },
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
