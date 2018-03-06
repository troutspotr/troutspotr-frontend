export const FONT_ROBOTO_REGULAR = ['roboto-regular']
import { Layer } from 'mapbox-gl'
import { ILayerProperties } from './ICreateLayer'

export const getSatelliteLayers = (layerProps: ILayerProperties): Layer[] => {
  const {
    isOnline,
    satelliteZoomLevel,
    satellitePrefetchZoomLevel,
    satelliteTransitionScalar,
  } = layerProps
  if (isOnline === false) {
    return []
  }

  return [
    {
      id: 'mapbox-satellite',
      type: 'raster',
      source: 'mapbox://mapbox.satellite',
      minzoom: satellitePrefetchZoomLevel,
      layout: {
        visibility: 'visible',
      },
      paint: {
        'raster-saturation': {
          base: 1,
          stops: [
            [satelliteZoomLevel + 0.2 * satelliteTransitionScalar, -0.8],
            [satelliteZoomLevel + 0.6 * satelliteTransitionScalar, 0],
          ],
        },
        'raster-opacity': {
          base: 1,
          stops: [
            [satelliteZoomLevel, 0],
            [satelliteZoomLevel + 0.3 * satelliteTransitionScalar, 1],
          ],
        },
        'raster-contrast': {
          base: 1,
          stops: [
            [satelliteZoomLevel, -0.38],
            [satelliteZoomLevel + 0.5 * satelliteTransitionScalar, 0],
          ],
        },
      },
    },
  ] as Layer[]
}
