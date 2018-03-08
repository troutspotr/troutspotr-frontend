import { Layer, LineLayout, LinePaint } from 'mapbox-gl'
import { ILayerProperties } from './ICreateLayer'

export const PAL_LAYER_ID = 'pal_geom_layer'
export const PAL_BORDER_LAYER_ID = 'pal_border_layer'

export const createPalLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const { pallete } = layerProps
  const streamStyle: Layer = {
    id: PAL_LAYER_ID,
    type: 'fill',
    source: sourceId,
    layout: { visibility: 'visible' },
    paint: {
      'fill-color': pallete.palSectionFill,
      'fill-opacity': {
        base: 1,
        stops: [[7, 0], [9, 0.05], [12, 0.1], [14, 0.15], [16, 0.25], [18, 0.1]],
      },
    },
  }

  return [streamStyle]
}

export const createPalBorderLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const { pallete } = layerProps
  const lineLayout: LineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  }
  const linePaint: LinePaint = {
    'line-color': pallete.palSectionFill,
    'line-opacity': {
      base: 1.0,
      stops: [[1, 0], [8, 0.1], [10, 0.2], [13, 0.4]],
    },
    'line-width': {
      base: 1.5,
      stops: [[1, 1.1], [8.5, 1], [10, 1], [12.5, 1], [15.5, 1], [18.0, 1]],
    },
  }

  const streamStyle: Layer = {
    id: PAL_BORDER_LAYER_ID,
    type: 'line',
    source: sourceId,
    layout: lineLayout,
    paint: linePaint,
  }

  return [streamStyle]
}
