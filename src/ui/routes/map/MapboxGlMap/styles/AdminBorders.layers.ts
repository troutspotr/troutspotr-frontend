export const FONT_ROBOTO_REGULAR = ['roboto-regular']
import { Layer } from 'mapbox-gl'
import { ILayerProperties } from './ICreateLayer'
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
        'line-color': pallete.secondaryRoadBorder,
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
