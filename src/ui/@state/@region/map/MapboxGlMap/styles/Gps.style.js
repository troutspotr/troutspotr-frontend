import * as colors from 'ui/core/Colors'
import { GPS_LOCATION_OUTLINE_LAYER_ID,
  GPS_LOCATION_CENTER_LAYER_ID } from '../filters/Filters.selectors'

import { GPS_LOCATION_SOURCE_ID } from '../sources/Source.selectors'

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
    'circle-radius': 8
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
      'circle-radius': 8
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
