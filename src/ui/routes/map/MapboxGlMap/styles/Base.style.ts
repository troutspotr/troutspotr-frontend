/* eslint-disable max-lines */
import { Layer, Style as MapboxStyle } from 'mapbox-gl'
export const FONT_ROBOTO_REGULAR = ['roboto-regular']
export const FONT_ROBOTO_BOLD = ['roboto-bold']
import { getAdminBorderLayers, drawRegion } from './AdminBorders.layers'
import { getBridgeLayers } from './Bridge.layers'
import { ILayerProperties } from './ICreateLayer'
import { getMapLabelLayers, centroids } from './MapLabels.layers'
import { getRoadsLayers } from './Roads.layers'
import { getSatelliteLayers } from './Satellite.layers'
import { buildSources } from '../MapboxGl.style.selectors';

export const createBackgroundLayers = (layerProps: ILayerProperties): Layer[] => {
  const { pallete } = layerProps
  return [
    {
      id: 'background',
      type: 'background',
      layout: {},
      paint: {
        'background-color': pallete.backgroundFill,
      },
    },
  ]
}

export const createWaterLayers = (layerProps: ILayerProperties): Layer[] => {
  const { pallete, isOnline, satelliteZoomLevel, satelliteTransitionScalar } = layerProps
  if (isOnline === false) {
    return []
  }

  const canalMinimumZoomLevel = 8
  const fuzzyRange = 1.5
  const shouldUseSimpleOpacityStops = canalMinimumZoomLevel + fuzzyRange >= satelliteZoomLevel
  const canalOpacityStops = shouldUseSimpleOpacityStops
    ? [[satelliteZoomLevel, 1], [satelliteZoomLevel + 1, 0]]
    : [
        [canalMinimumZoomLevel, 0],
        [canalMinimumZoomLevel + 0.5, 1],
        [satelliteZoomLevel, 1],
        [satelliteZoomLevel + 0.6 * satelliteTransitionScalar, 0],
      ]

  return [
    {
      id: 'waterway-river-canal',
      type: 'line',
      source: 'composite',
      'source-layer': 'waterway',
      minzoom: 8,
      filter: ['any', ['==', 'class', 'canal'], ['==', 'class', 'river']],
      layout: {
        'line-cap': {
          base: 1,
          stops: [[0, 'butt'], [11, 'round']],
        },
        'line-join': 'round',
      },
      paint: {
        'line-color': pallete.waterFill,
        'line-width': {
          base: 1.3,
          stops: [[canalMinimumZoomLevel + 0.5, 0.1], [20, 8]],
        },
        'line-opacity': {
          base: 1,
          stops: canalOpacityStops,
        },
      },
    },
    {
      id: 'water',
      type: 'fill',
      source: 'composite',
      'source-layer': 'water',
      layout: {},
      paint: {
        'fill-color': {
          base: 1,
          stops: [
            // [satelliteZoomLevel - 0.2, pallete.waterFill],
            // [satelliteZoomLevel + 0.4, pallete.waterOutline],
            [satelliteZoomLevel, pallete.waterFill],
            [satelliteZoomLevel + 0.4 * satelliteTransitionScalar, 'transparent'],
          ],
        },
        'fill-outline-color': {
          base: 1,
          stops: [
            // [satelliteZoomLevel - 0.2, pallete.waterFill],
            // [satelliteZoomLevel + 0.4, pallete.waterOutline],
            [satelliteZoomLevel, pallete.waterFill],
            [satelliteZoomLevel + 0.4 * satelliteTransitionScalar, 'transparent'],
          ],
        },
        // 'fill-opacity': {
        //   base: 1,
        //   stops: [[satelliteZoomLevel, 1], [satelliteZoomLevel + 0.3, 0]],
        // },
      },
    },
  ] as Layer[]
}

export const createAirports = (layerProps: ILayerProperties): Layer[] => {
  const { pallete, isOnline } = layerProps
  if (isOnline === false) {
    return []
  }

  return [
    {
      id: 'aeroway-polygon',
      type: 'fill',
      source: 'composite',
      'source-layer': 'aeroway',
      minzoom: 11,
      filter: ['all', ['!=', 'type', 'apron'], ['==', '$type', 'Polygon']],
      layout: {},
      paint: {
        'fill-color': pallete.secondaryRoadFill,
        'fill-opacity': {
          base: 1,
          stops: [[11, 0], [11.5, 1]],
        },
      },
    },
    {
      id: 'aeroway-runway',
      type: 'line',
      source: 'composite',
      'source-layer': 'aeroway',
      minzoom: 9,
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'type', 'runway']],
      layout: {},
      paint: {
        'line-color': pallete.secondaryRoadFill,
        'line-width': {
          base: 1.5,
          stops: [[9, 1], [18, 80]],
        },
      },
    },
    {
      id: 'aeroway-taxiway',
      type: 'line',
      source: 'composite',
      'source-layer': 'aeroway',
      minzoom: 9,
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'type', 'taxiway']],
      layout: {},
      paint: {
        'line-color': pallete.secondaryRoadFill,
        'line-width': {
          base: 1.5,
          stops: [[10, 0.5], [18, 20]],
        },
      },
    },
  ] as Layer[]
}

export const createBuildingsAndBarrierLayers = (layerProps: ILayerProperties): Layer[] => {
  const { pallete, isOnline } = layerProps
  if (isOnline === false) {
    return []
  }
  return [
    {
      id: 'barrier_line-land-polygon',
      type: 'fill',
      source: 'composite',
      'source-layer': 'barrier_line',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'land']],
      layout: {},
      paint: {
        'fill-color': pallete.backgroundFill,
        'fill-outline-color': pallete.backgroundFill,
      },
    },

    {
      id: 'building',
      type: 'fill',
      source: 'composite',
      'source-layer': 'building',
      minzoom: 15,
      filter: ['all', ['!=', 'type', 'building:part'], ['==', 'underground', 'false']],
      layout: {},
      paint: {
        'fill-color': pallete.buildingFill,
        'fill-opacity': {
          base: 1,
          stops: [[15.5, 0], [16, 0.4]],
        },
        'fill-outline-color': pallete.buildingFill,
      },
    },
  ]
}

export const createLayers = (
  layerProps: ILayerProperties,
  streams?: Layer[],
  pals?: Layer[],
  accessPoints?: Layer[],
  labels?: Layer[],
  gps?: Layer[]
): Layer[] => {
  return [
    ...createBackgroundLayers(layerProps),
    ...getSatelliteLayers(layerProps),
    ...createWaterLayers(layerProps),
    ...(pals != null ? pals : []),
    ...(streams != null ? streams : []),
    ...createAirports(layerProps),
    ...createBuildingsAndBarrierLayers(layerProps),

    // ROADS GO HERE
    ...getRoadsLayers(layerProps),

    // BRIDGES GO HERE
    ...getBridgeLayers(layerProps),

    // ADMIN
    ...getAdminBorderLayers(layerProps),
    ...drawRegion(layerProps, 'state'),
    ...drawRegion(layerProps, 'region'),
    // LABELS
    ...(accessPoints != null ? accessPoints : []),
    ...(gps != null ? gps : []),
    
    ...(labels != null ? labels : []),
    ...centroids(layerProps),
    ...getMapLabelLayers(layerProps),
  ] as Layer[]
}

export const BaseStyle: MapboxStyle = {
  version: 8,
  name: 'DarkTroutBase',
  center: [-91.86636953883972, 43.68162187731622],
  zoom: 16.67091316232325,
  bearing: -0.33453331132216135,
  pitch: 0,
  sources: {
    composite: {
      url: 'mapbox://mapbox.mapbox-streets-v7',
      type: 'vector',
    },
  },
  transition: {
    duration: 300,
    delay: 0,
  },
  sprite: 'mapbox://sprites/andest01/civsy0pgb00022kkxcbqtcogh',
  glyphs: '/map-fonts/{fontstack}/{range}.pbf',
  // glyphs: 'mapbox://fonts/andest01/{fontstack}/{range}.pbf',
  layers: null,
}

export const createSources = (
  layerProps: ILayerProperties,
  geoJsons?: Array<{ id: string; geojson: {} }>
) => {
  let sources = buildSources()
  const { isOnline } = layerProps

  const coreItems = {
    composite: {
      url: 'mapbox://mapbox.mapbox-streets-v7',
      type: 'vector',
    },
    'mapbox://mapbox.satellite': {
      url: 'mapbox://mapbox.satellite',
      type: 'raster',
      tileSize: layerProps.satelliteResolution,
    },
  }

  if (isOnline) {
    sources = {
      ...sources,
      ...coreItems,
    }
  }

  if (geoJsons == null || geoJsons.length === null) {
    const defaultEmptySources = buildSources()
    return { ...defaultEmptySources, ...sources }
  }

  return geoJsons.reduce((dictionary, item) => {
    dictionary[item.id] = {
      type: 'geojson',
      data: item.geojson,
    }

    return dictionary
  }, sources)
}

export const createStyle = (layerProps: ILayerProperties): MapboxStyle => {
  return {
    version: 8,
    name: 'TroutSpotr',
    center: [-91.86636953883972, 43.68162187731622],
    zoom: 16.67091316232325,
    bearing: -0.33453331132216135,
    pitch: 0,
    sources: createSources(layerProps),
    transition: {
      duration: 800,
      delay: 0,
    },
    sprite: 'mapbox://sprites/andest01/civsy0pgb00022kkxcbqtcogh',
    glyphs: '/map-fonts/{fontstack}/{range}.pbf',
    layers: createLayers(layerProps),
  }
}
