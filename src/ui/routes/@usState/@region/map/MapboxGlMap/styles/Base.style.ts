/* eslint-disable max-lines */
import { Style as MapboxStyle, Layer } from 'mapbox-gl'
export const FONT_ROBOTO_REGULAR = ['roboto-regular']
export const FONT_ROBOTO_BOLD = ['roboto-bold']
import { IMapColors } from './MapColors'
import { getRoadsLayers } from './Roads.layers'
import { getMapLabelLayers } from './MapLabels.layers'
import { getBridgeLayers } from './Bridge.layers'
import { getAdminBorderLayers } from './AdminBorders.layers'
export const createLayers = (colorsDictionary: IMapColors): Layer[] => {
  return [
    {
      id: 'background',
      type: 'background',
      layout: {},
      paint: {
        'background-color': colorsDictionary.backgroundFill,
      },
    },
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
        'line-color': colorsDictionary.waterFill,
        'line-width': {
          base: 1.3,
          stops: [[8.5, 0.1], [20, 8]],
        },
        'line-opacity': {
          base: 1,
          stops: [[8, 0], [8.5, 1]],
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
        'fill-color': colorsDictionary.waterFill,
      },
    },
    {
      id: 'barrier_line-land-polygon',
      type: 'fill',
      source: 'composite',
      'source-layer': 'barrier_line',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'land']],
      layout: {},
      paint: {
        'fill-color': colorsDictionary.backgroundFill,
        'fill-outline-color': colorsDictionary.backgroundFill,
      },
    },
    {
      id: 'aeroway-polygon',
      type: 'fill',
      source: 'composite',
      'source-layer': 'aeroway',
      minzoom: 11,
      filter: ['all', ['!=', 'type', 'apron'], ['==', '$type', 'Polygon']],
      layout: {},
      paint: {
        'fill-color': 'hsl(0, 0%, 27%)',
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
        'line-color': 'hsl(0, 0%, 27%)',
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
        'line-color': 'hsl(0, 0%, 27%)',
        'line-width': {
          base: 1.5,
          stops: [[10, 0.5], [18, 20]],
        },
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
        'fill-color': colorsDictionary.buildingFill,
        'fill-opacity': {
          base: 1,
          stops: [[15.5, 0], [16, 1]],
        },
        'fill-outline-color': colorsDictionary.buildingFill,
      },
    },
    // ROADS GO HERE
    ...getRoadsLayers(colorsDictionary),
  
    // BRIDGES GO HERE
    ...getBridgeLayers(colorsDictionary),

    // ADMIN
    ...getAdminBorderLayers(colorsDictionary),

    // LABELS
    ...getMapLabelLayers(colorsDictionary),
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

export const createStyle = (colorsDictionary: IMapColors): MapboxStyle => {
  return {
    version: 8,
    name: 'TroutSpotr',
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
      duration: 800,
      delay: 0,
    },
    sprite: 'mapbox://sprites/andest01/civsy0pgb00022kkxcbqtcogh',
    glyphs: '/map-fonts/{fontstack}/{range}.pbf',
    // glyphs: 'mapbox://fonts/andest01/{fontstack}/{range}.pbf',
    layers: createLayers(colorsDictionary),
  }
}