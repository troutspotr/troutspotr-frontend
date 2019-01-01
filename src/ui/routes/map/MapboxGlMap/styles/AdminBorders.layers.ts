export const FONT_ROBOTO_REGULAR = ['roboto-regular']
import { Layer, LineLayout, LinePaint } from 'mapbox-gl'
import { ILayerProperties } from './ICreateLayer'

export const drawRegionStuff = (layerProps: ILayerProperties, sourceId: string, opacityMultiplier = 1): Layer[]  => {
  const lineLayout: LineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  }
  const baseLineWidth = {
    base: 1.5,
    stops: [[1, 6], [8.5, 5], [10, 4], [12.5, 2]],
  }

  const baselineOpacity = {
    base: 1.0,
    stops: [[1, 1], [8, 0.9], [10, 0.4], [15, 0.3]].map(stop => [stop[0], stop[1] * opacityMultiplier]),
  }

  const linePaint: LinePaint = {
    'line-color': layerProps.pallete.primaryLabelBackground,
    'line-opacity': baselineOpacity,
    'line-width': baseLineWidth,
  }

  return [
    {
    id: sourceId + '_selected_region_background',
    type: 'line',
    source: sourceId,
    layout: {
      ...lineLayout,
    },
    paint: linePaint
  },
  {
    id: sourceId + 'selected_region_foreground',
    type: 'line',
    source: sourceId,
    layout: lineLayout,
    paint: {
      ...linePaint,
      'line-color':  layerProps.pallete.primaryLabelFill,
      'line-dasharray': [2, 2],
      'line-width': {
        ...baseLineWidth,
        stops: baseLineWidth.stops.map(stop => [stop[0], stop[1] * 0.4])
      }
    },
  }]
}


export const drawRegion = (layerProps: ILayerProperties, sourceId: string): Layer[]  => {
  return sourceId === 'state'
    ? drawRegionStuff(layerProps, sourceId, 0.2)
    : drawRegionStuff(layerProps, sourceId)
}


export const drawLabelsRegion = (layerProps: ILayerProperties, sourceId: string): Layer[]  => {
  return [
    {
    id: 'region_label',
    type: 'symbol',
    source: 'region',
    minzoom: 8,
    layout: {
      'text-max-angle': 30,
      'symbol-spacing': 500,
      'text-font': FONT_ROBOTO_REGULAR,
      'symbol-placement': 'line',
      'text-field': '{long_name} Region',
      'text-offset': [0, 0],
      'text-anchor': 'top',
      'text-size': 14,
    },
    paint: {
      'text-color': layerProps.pallete.primaryLabelFill,
      'text-halo-color': layerProps.pallete.primaryLabelBackground,
      'text-halo-width': 0.5,
      'text-opacity': 0.8,
    },
    }
]
}


export const getAdminBorderLayers = (layerProps: ILayerProperties): Layer[] => {
  const { pallete, isOnline } = layerProps
  if (isOnline === false) {
    return []
  }
  return [
    {
      id: 'admin-3-4-boundaries-bg',
      type: 'line',
      source: 'composite',
      'source-layer': 'admin',
      filter: ['all', ['==', 'maritime', 0], ['>=', 'admin_level', 3]],
      layout: {
        'line-join': 'bevel',
      },
      paint: {
        'line-color': pallete.secondaryRoadBorder,
        'line-width': {
          base: 1,
          stops: [[3, 3.5], [10, 8]],
        },
        'line-opacity': {
          base: 1,
          stops: [[4, 0], [6, 0.75]],
        },
        'line-dasharray': [1, 0],
        'line-translate': [0, 0],
        'line-blur': {
          base: 1,
          stops: [[3, 0], [8, 3]],
        },
      },
    },
    {
      id: 'admin-2-boundaries-bg',
      type: 'line',
      source: 'composite',
      'source-layer': 'admin',
      minzoom: 1,
      filter: ['all', ['==', 'admin_level', 2], ['==', 'maritime', 0]],
      layout: {
        'line-join': 'miter',
      },
      paint: {
        'line-width': {
          base: 1,
          stops: [[3, 3.5], [10, 10]],
        },
        'line-color': pallete.secondaryRoadBorder,
        'line-opacity': {
          base: 1,
          stops: [[3, 0], [4, 0.5]],
        },
        'line-translate': [0, 0],
        'line-blur': {
          base: 1,
          stops: [[3, 0], [10, 2]],
        },
      },
    },
    {
      id: 'admin-3-4-boundaries',
      type: 'line',
      source: 'composite',
      'source-layer': 'admin',
      filter: ['all', ['==', 'maritime', 0], ['>=', 'admin_level', 3]],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-dasharray': {
          base: 1,
          stops: [[6, [2, 0]], [7, [2, 2, 6, 2]]],
        },
        'line-width': {
          base: 1,
          stops: [[7, 0.75], [12, 1.5]],
        },
        'line-opacity': {
          base: 1,
          stops: [[2, 0], [3, 1]],
        },
        'line-color': pallete.admin1BorderColor,
      },
    },
    {
      id: 'admin-2-boundaries',
      type: 'line',
      source: 'composite',
      'source-layer': 'admin',
      minzoom: 1,
      filter: ['all', ['==', 'admin_level', 2], ['==', 'disputed', 0], ['==', 'maritime', 0]],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': pallete.secondaryRoadFill,
        'line-width': {
          base: 1,
          stops: [[3, 0.5], [10, 2]],
        },
      },
    },
  ] as Layer[]
}
