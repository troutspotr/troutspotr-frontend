import { Layer } from 'mapbox-gl'
import { ILayerProperties } from './ICreateLayer'

export const GPS_CENTER_LAYER_ID = 'gps_center_layer'
export const GPS_BORDER_BORDER_LAYER_ID = 'gps_border_layer'

const createCircleStyle = x => ({
  base: 1.6,
  stops: [[7, 2 + x], [10, 4 + x], [14, 6 + x]],
})

export const createGpsCenterLayer = (layerProps: ILayerProperties, sourceId: string): Layer => {
  const { pallete } = layerProps
  const centerLayer: Layer = {
    id: GPS_CENTER_LAYER_ID,
    source: sourceId,
    type: 'circle',
    paint: {
      // tslint:disable-next-line:no-duplicate-string
      'circle-color': pallete.gpsCenterColor,
      'circle-opacity': 1,
      'circle-blur': 0,
      'circle-radius': createCircleStyle(0),
      'circle-pitch-scale': 'map',
    },
  }

  return centerLayer
}

export const createGpsBorderLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const border1: Layer = {
    id: GPS_BORDER_BORDER_LAYER_ID + '1',
    type: 'circle',
    source: sourceId,
    layout: { visibility: 'visible' },
    paint: {
      'circle-color': 'transparent',
      'circle-stroke-color': 'white',
      'circle-stroke-width': 2,
      'circle-radius': createCircleStyle(4),
      'circle-pitch-scale': 'map',
    },
  }

  const border2: Layer = {
    id: GPS_BORDER_BORDER_LAYER_ID + '2',
    type: 'circle',
    source: sourceId,
    layout: { visibility: 'visible' },
    paint: {
      'circle-color': 'transparent',
      'circle-stroke-color': 'black',
      'circle-stroke-width': 6,
      'circle-radius': createCircleStyle(2),
      'circle-pitch-scale': 'map',
    },
  }
  const center = createGpsCenterLayer(layerProps, sourceId)
  return [border2, border1, center]
}
