import { Layer, LineLayout, LinePaint } from 'mapbox-gl'
import { ILayerProperties } from './ICreateLayer'

export const RESTRICTED_LANDS_LAYER_ID = 'restricted_lands_geom_layer'
export const RESTRICTED_LANDS_BORDER_LAYER_ID = 'restricted_lands_border_layer'

const darkModePalLayerFillOpacityStops = () => [[4, 0.25], [9, 0.25], [12, 0.25], [14, 0.1], [16.7, 0.1], [17, 0.0]]
const lightModePalLayerFillOpacityStops = () => [[4, 0.25], [7, 0.3], [9, 0.3], [12, 0.4], [14, 0.5], [15, 0.3], [16.7, 0.1], [17, 0]]


export const getOpacityStops = (layerProps: ILayerProperties): number[][] => {
  const opacityStops = layerProps.isHighContrastEnabled
  ? lightModePalLayerFillOpacityStops()
  : darkModePalLayerFillOpacityStops()

  if (layerProps.isOnline === false) {
    const updatedStops = [...opacityStops]
    // update the last two stops
    const numberOfStops = updatedStops.length
    updatedStops[numberOfStops - 1][1] = 0.1
    return updatedStops
  }
  
  return opacityStops
}

export const createRestrictedLandsLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const { pallete } = layerProps
  const opacityStops = getOpacityStops(layerProps)
  const streamStyle: Layer = {
    id: RESTRICTED_LANDS_LAYER_ID,
    type: 'fill',
    source: sourceId,
    layout: { visibility: 'visible' },
    paint: {
      'fill-color': pallete.restrictionYellow,
      'fill-opacity': {
        base: 1,
        stops: opacityStops,
      },
    },
  }

  return [streamStyle]
}

export const createRestrictedLandsBorderLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const { pallete } = layerProps
  const lineLayout: LineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  }
  const linePaint: LinePaint = {
    'line-color': pallete.restrictionYellow,
    'line-opacity': {
      base: 1.0,
      stops: [[1, 0.7], [8, 0.7], [10, 0.6], [13, 0.8], [16, 0.3]],
    },
    // 'line-dasharray': [1, 2],
    'line-dasharray': [1, 2],
    'line-width': {
      base: 1.5,
      stops: [[1, 1], [8.5, 1], [10, 1], [12.5, 2], [15.5, 2], [18.0, 2]],
    },
  }

  const streamStyle: Layer = {
    id: RESTRICTED_LANDS_BORDER_LAYER_ID,
    type: 'line',
    source: sourceId,
    layout: lineLayout,
    paint: linePaint,
  }

  return [streamStyle]
}
