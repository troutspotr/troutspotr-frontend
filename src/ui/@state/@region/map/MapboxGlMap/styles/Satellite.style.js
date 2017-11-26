import {SATELLITE_LAYER_ID} from '../filters/Filters.selectors'
const SATELLITE_SOURCE_ID = 'mapbox://mapbox.satellite'

// Mapbox satellite gets funky around
// Zoom level 16.5 - that's the highest
// Resolution we can get. switch
// To 16.5 only.
const SATELLITE_ZOOM_LEVEL = 13.0
export const SatelliteStyle = {
  'id': SATELLITE_LAYER_ID,
  'type': 'raster',
  'source': SATELLITE_SOURCE_ID,
  // 'interactive': false,
  'minzoom': SATELLITE_ZOOM_LEVEL + 0.01,
  'layout': {'visibility': 'visible'},
  'paint': {
    'raster-opacity': {
      'base': 1.6,
      'stops': [
        [
          SATELLITE_ZOOM_LEVEL,
          0,
        ],
        [
          SATELLITE_ZOOM_LEVEL + 0.2,
          1,
        ],
      ],
    },
  },
}
