export const FONT_ROBOTO_REGULAR = ['roboto-regular']
import { Layer } from 'mapbox-gl'
import { IMapColors } from './MapColors'

export const getBridgeLayers = (colorsDictionary: IMapColors): Layer[] => {
  return [
    {
      id: 'bridge-pedestrian-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'pedestrian'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[14, 2], [18, 14.5]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': 0,
        'line-opacity': {
          base: 1,
          stops: [[13.99, 0], [14, 1]],
        },
      },
    },
    {
      id: 'bridge-street-low',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12.5, 0.5], [14, 2], [18, 18]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-opacity': {
          stops: [[11.5, 0], [12, 1], [14, 1], [14.01, 0]],
        },
      },
    },
    {
      id: 'bridge-street_limited-low',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street_limited'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12.5, 0.5], [14, 2], [18, 18]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-opacity': {
          stops: [[11.5, 0], [12, 1], [14, 1], [14.01, 0]],
        },
      },
    },
    {
      id: 'bridge-service-link-track-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 14,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['!=', 'type', 'trunk_link'],
          ['==', 'structure', 'bridge'],
          ['in', 'class', 'link', 'service', 'track'],
        ],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.75], [20, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[14, 0.5], [18, 12]],
        },
      },
    },
    {
      id: 'bridge-street_limited-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street_limited'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.75], [20, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[13, 0], [14, 2], [18, 18]],
        },
      },
    },
    {
      id: 'bridge-street-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.75], [20, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-opacity': {
          base: 1,
          stops: [[13.99, 0], [14, 1]],
        },
        'line-gap-width': {
          base: 1.5,
          stops: [[13, 0], [14, 2], [18, 18]],
        },
      },
    },
    {
      id: 'bridge-secondary-tertiary-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'structure', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.2,
          stops: [[10, 0.75], [18, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[8.5, 0.5], [10, 0.75], [18, 26]],
        },
        'line-translate': [0, 0],
      },
    },
    {
      id: 'bridge-primary-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'primary'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[5, 0.75], [16, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-translate': [0, 0],
      },
    },
    {
      id: 'bridge-trunk_link-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'structure', 'bridge'], ['==', 'type', 'trunk_link']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.75], [20, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[12, 0.5], [14, 2], [18, 18]],
        },
        'line-opacity': {
          base: 1,
          stops: [[10.99, 0], [11, 1]],
        },
      },
    },
    {
      id: 'bridge-motorway_link-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['<=', 'layer', 1],
          ['==', 'class', 'motorway_link'],
          ['==', 'structure', 'bridge'],
        ],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.75], [20, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[12, 0.5], [14, 2], [18, 18]],
        },
        'line-opacity': 1,
      },
    },
    {
      id: 'bridge-trunk-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'trunk'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[10, 1], [16, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
      },
    },
    {
      id: 'bridge-motorway-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'motorway'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[7, 0.5], [10, 1], [16, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
      },
    },
    {
      id: 'bridge-construction',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 14,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'construction'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-join': 'miter',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12.5, 0.5], [14, 2], [18, 18]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-opacity': {
          base: 1,
          stops: [[13.99, 0], [14, 1]],
        },
        'line-dasharray': {
          base: 1,
          stops: [
            [14, [0.4, 0.8]],
            [15, [0.3, 0.6]],
            [16, [0.2, 0.3]],
            [17, [0.2, 0.25]],
            [18, [0.15, 0.15]],
          ],
        },
      },
    },
    {
      id: 'bridge-path',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!=', 'type', 'steps'], ['==', 'class', 'path'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[15, 1], [18, 4]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-dasharray': {
          base: 1,
          stops: [[14, [1, 0]], [15, [1.75, 1]], [16, [1, 0.75]], [17, [1, 0.5]]],
        },
        'line-opacity': {
          base: 1,
          stops: [[14, 0], [14.25, 1]],
        },
      },
    },
    {
      id: 'bridge-steps',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'structure', 'bridge'], ['==', 'type', 'steps']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[15, 1], [18, 4]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-dasharray': {
          base: 1,
          stops: [[14, [1, 0]], [15, [1.75, 1]], [16, [1, 0.75]], [17, [0.3, 0.3]]],
        },
        'line-opacity': {
          base: 1,
          stops: [[14, 0], [14.25, 1]],
        },
      },
    },
    {
      id: 'bridge-trunk_link',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['!in', 'layer', 2, 3, 4, 5],
          ['==', 'structure', 'bridge'],
          ['==', 'type', 'trunk_link'],
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.5], [14, 2], [18, 18]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
      },
    },
    {
      id: 'bridge-motorway_link',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['!in', 'layer', 2, 3, 4, 5],
          ['==', 'class', 'motorway_link'],
          ['==', 'structure', 'bridge'],
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.5], [14, 2], [18, 18]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
      },
    },
    {
      id: 'bridge-pedestrian',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'pedestrian'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[14, 0.5], [18, 12]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-opacity': 1,
        'line-dasharray': {
          base: 1,
          stops: [[14, [1, 0]], [15, [1.5, 0.4]], [16, [1, 0.2]]],
        },
      },
    },
    {
      id: 'bridge-service-link-track',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 14,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['!=', 'type', 'trunk_link'],
          ['==', 'structure', 'bridge'],
          ['in', 'class', 'link', 'service', 'track'],
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[14, 0.5], [18, 12]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
      },
    },
    {
      id: 'bridge-street_limited',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street_limited'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12.5, 0.5], [14, 2], [18, 18]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-opacity': {
          base: 1,
          stops: [[13.99, 0], [14, 1]],
        },
      },
    },
    {
      id: 'bridge-street',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street'], ['==', 'structure', 'bridge']],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12.5, 0.5], [14, 2], [18, 18]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-opacity': {
          base: 1,
          stops: [[13.99, 0], [14, 1]],
        },
      },
    },
    {
      id: 'bridge-secondary-tertiary',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'structure', 'bridge'], ['in', 'type', 'secondary', 'tertiary']],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[8.5, 0.5], [10, 0.75], [18, 26]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-opacity': {
          base: 1.2,
          stops: [[5, 0], [5.5, 1]],
        },
      },
    },
    {
      id: 'bridge-primary',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'structure', 'bridge'], ['==', 'type', 'primary']],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-opacity': {
          base: 1.2,
          stops: [[5, 0], [5.5, 1]],
        },
      },
    },
    {
      id: 'bridge-trunk',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['!in', 'layer', 2, 3, 4, 5],
          ['==', 'class', 'trunk'],
          ['==', 'structure', 'bridge'],
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
      },
    },
    {
      id: 'bridge-motorway',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['!in', 'layer', 2, 3, 4, 5],
          ['==', 'class', 'motorway'],
          ['==', 'structure', 'bridge'],
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
      },
    },
    {
      id: 'bridge-rail',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'structure', 'bridge'], ['in', 'class', 'major_rail', 'minor_rail']],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-width': {
          base: 1,
          stops: [[14, 0.75], [20, 1]],
        },
      },
    },
    {
      id: 'bridge-trunk_link-2-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'structure', 'bridge'], ['==', 'type', 'trunk_link'], ['>=', 'layer', 2]],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.75], [20, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-gap-width': {
          base: 1.5,
          stops: [[12, 0.5], [14, 2], [18, 18]],
        },
        'line-opacity': {
          base: 1,
          stops: [[10.99, 0], [11, 1]],
        },
      },
    },
    {
      id: 'bridge-motorway_link-2-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['==', 'class', 'motorway_link'],
          ['==', 'structure', 'bridge'],
          ['>=', 'layer', 2],
        ],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.75], [20, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[12, 0.5], [14, 2], [18, 18]],
        },
        'line-opacity': 1,
      },
    },
    {
      id: 'bridge-trunk-2-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'trunk'], ['==', 'structure', 'bridge'], ['>=', 'layer', 2]],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[10, 1], [16, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-gap-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
      },
    },
    {
      id: 'bridge-motorway-2-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'motorway'], ['==', 'structure', 'bridge'], ['>=', 'layer', 2]],
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[7, 0.5], [10, 1], [16, 2]],
        },
        'line-color': colorsDictionary.secondaryRoadBorder,
        'line-gap-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
      },
    },
    {
      id: 'bridge-trunk_link-2',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'structure', 'bridge'], ['==', 'type', 'trunk_link'], ['>=', 'layer', 2]],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.5], [14, 2], [18, 18]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
      },
    },
    {
      id: 'bridge-motorway_link-2',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['==', 'class', 'motorway_link'],
          ['==', 'structure', 'bridge'],
          ['>=', 'layer', 2],
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12, 0.5], [14, 2], [18, 18]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
      },
    },
    {
      id: 'bridge-trunk-2',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'trunk'], ['==', 'structure', 'bridge'], ['>=', 'layer', 2]],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
      },
    },
    {
      id: 'bridge-motorway-2',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'motorway'], ['==', 'structure', 'bridge'], ['>=', 'layer', 2]],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
      },
    },
  ] as Layer[]
}
