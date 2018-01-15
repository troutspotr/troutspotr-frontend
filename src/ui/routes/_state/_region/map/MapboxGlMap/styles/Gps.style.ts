const colors = require('ui/styles/_colors.scss')
import {
  GPS_LOCATION_CENTER_LAYER_ID,
  GPS_LOCATION_OUTLINE_LAYER_ID,
} from '../filters/Filters.selectors'
import { UNDER_LABEL_PLACEHOLDER, layerGeneratorBetter } from './Style.selectors'

import { GPS_LOCATION_SOURCE_ID } from '../sources/Source.selectors'

const createCircleStyle = x => ({
  base: 1.6,
  stops: [[7, 2 + x], [10, 4 + x], [14, 6 + x]],
})

const DEFAULT_RADIUS = createCircleStyle(0)

const OUTER_RADIUS = createCircleStyle(4)

export const AccessPointMarkerBorderActiveStyle = {
  id: GPS_LOCATION_OUTLINE_LAYER_ID,
  type: 'circle',
  source: GPS_LOCATION_SOURCE_ID,
  interactive: false,
  layout: { visibility: 'visible' },
  paint: {
    'circle-color': 'hsla(0, 100%, 50%, 0)',
    'circle-stroke-color': colors.White,
    'circle-stroke-width': 2,
    'circle-radius': OUTER_RADIUS,
    'circle-pitch-scale': 'map',
  },
}

export const AccessPointMarkerCenterActiveStyle = {
  id: GPS_LOCATION_CENTER_LAYER_ID,
  source: GPS_LOCATION_SOURCE_ID,
  type: 'circle',
  interactive: false,
  paint: {
    // 'circle-color': colors.PalGreen,
    'circle-color': colors.Red,
    'circle-opacity': 1,
    'circle-blur': 0,
    'circle-radius': DEFAULT_RADIUS,
    'circle-pitch-scale': 'map',
  },
}

const border = layerGeneratorBetter(AccessPointMarkerBorderActiveStyle, UNDER_LABEL_PLACEHOLDER)
const center = layerGeneratorBetter(AccessPointMarkerCenterActiveStyle, UNDER_LABEL_PLACEHOLDER)

AccessPointMarkerBorderActiveStyle
AccessPointMarkerCenterActiveStyle
export const GpsLayers = [border, center]
