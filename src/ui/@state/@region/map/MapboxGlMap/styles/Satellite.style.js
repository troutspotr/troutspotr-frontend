import { SATELLITE_LAYER_ID } from '../filters/Filters.selectors'
const SATELLITE_SOURCE_ID = 'mapbox://mapbox.satellite'
export const SatelliteStyle = {
  'id': SATELLITE_LAYER_ID,
  'type': 'raster',
  'source': SATELLITE_SOURCE_ID,
  // 'interactive': false,
  'minzoom': 16.51,
  'layout': {
    'visibility': 'visible'
  },
  'paint': {
    'raster-opacity': {
      'base': 1.6,
      'stops': [
        [
          16.5,
          0
        ],
        [
          16.7,
          1
        ]
      ]
    }
  }
}
