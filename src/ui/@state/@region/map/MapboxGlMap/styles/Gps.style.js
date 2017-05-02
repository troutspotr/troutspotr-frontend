import * as colors from 'ui/core/Colors'
import { GPS_LOCATION_OUTLINE_LAYER_ID,
  GPS_LOCATION_CENTER_LAYER_ID } from '../filters/Filters.selectors'

import { GPS_LOCATION_SOURCE_ID } from '../sources/Source.selectors'

const createCircleStyle = x => {
  return {
    'base': 1.6,
    'stops': [
      [
        7,
        2 + x
      ],
      [
        10,
        4 + x
      ],
      [
        14,
        6 + x
      ]
    ]
  }
}

const DEFAULT_RADIUS = createCircleStyle(0)

const OUTER_RADIUS = createCircleStyle(1.5)

export const AccessPointMarkerBorderActiveStyle = {
  'id': GPS_LOCATION_OUTLINE_LAYER_ID,
  'type': 'circle',
  'source': GPS_LOCATION_SOURCE_ID,
  'interactive': false,
  'layout': {
    'visibility': 'visible'
  },
  'paint': {
    'circle-color': colors.MoodyGray,
    'circle-radius': OUTER_RADIUS
  }
}

export const AccessPointMarkerCenterActiveStyle =
  {
    'id': GPS_LOCATION_CENTER_LAYER_ID,
    'source': GPS_LOCATION_SOURCE_ID,
    'type': 'circle',
    'interactive': false,
    'paint': {
      // 'circle-color': colors.PalGreen,
      'circle-color': colors.Red,
      'circle-opacity': 1,
      'circle-blur': 0,
      'circle-radius': DEFAULT_RADIUS
    }
  }

import { layerGeneratorBetter, UNDER_LABEL_PLACEHOLDER } from './Style.selectors'
let border = layerGeneratorBetter(AccessPointMarkerBorderActiveStyle, UNDER_LABEL_PLACEHOLDER)
let center = layerGeneratorBetter(AccessPointMarkerCenterActiveStyle, UNDER_LABEL_PLACEHOLDER)

AccessPointMarkerBorderActiveStyle
AccessPointMarkerCenterActiveStyle
export const GpsLayers = [
  border,
  center
]
