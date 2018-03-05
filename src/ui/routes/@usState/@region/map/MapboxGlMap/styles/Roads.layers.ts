export const FONT_ROBOTO_REGULAR = ['roboto-regular']
import { Layer } from 'mapbox-gl'
import { IMapColors } from './MapColors'

export const getRoadsLayers = (colorsDictionary: IMapColors): Layer[] => {
  return [
    {
      id: 'road-pedestrian-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 12,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'pedestrian'], ['==', 'structure', 'none']],
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
          stops: [[13.9, 0], [14, 1]],
        },
      },
    },
    {
      id: 'road-street-low',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street'], ['==', 'structure', 'none']],
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
          stops: [[11, 0], [11.25, 1], [14, 1], [14.01, 0]],
        },
      },
    },
    {
      id: 'road-street_limited-low',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street_limited'], ['==', 'structure', 'none']],
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
          stops: [[11, 0], [11.25, 1], [14, 1], [14.01, 0]],
        },
      },
    },
    {
      id: 'road-service-link-track-case',
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
          ['!in', 'structure', 'bridge', 'tunnel'],
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
        'line-opacity': {
          base: 1,
          stops: [[13.9, 0], [14, 1]],
        },
      },
    },
    {
      id: 'road-street_limited-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street_limited'], ['==', 'structure', 'none']],
      ],
      layout: {
        'line-cap': 'round',
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
        'line-opacity': {
          base: 1,
          stops: [[13.9, 0], [14, 1]],
        },
      },
    },
    {
      id: 'road-street-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street'], ['==', 'structure', 'none']],
      ],
      layout: {
        'line-cap': 'round',
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
        'line-opacity': {
          base: 1,
          stops: [[13.9, 0], [14, 1]],
        },
      },
    },
    {
      id: 'road-main-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
      ],
      layout: {
        'line-cap': 'round',
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
        'line-opacity': {
          base: 1,
          stops: [[6, 0], [7, 0.4], [9, 0.5], [10, 1]],
        },
      },
    },
    {
      id: 'road-primary-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'class', 'primary']],
      ],
      layout: {
        'line-cap': 'round',
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
        'line-opacity': {
          base: 1,
          stops: [[6.5, 0], [7, 0.4], [9, 0.5], [10, 1]],
        },
      },
    },
    {
      id: 'road-motorway_link-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 10,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
      ],
      layout: {
        'line-cap': 'round',
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
          stops: [[6, 0], [7, 0.4], [9, 0.5], [10, 1]],
        },
      },
    },
    {
      id: 'road-trunk_link-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'type', 'trunk_link']],
      ],
      layout: {
        'line-cap': 'round',
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
          stops: [[6, 0], [7, 0.4], [9, 0.5], [10, 1]],
        },
      },
    },
    {
      id: 'road-trunk-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 5,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'class', 'trunk']],
      ],
      layout: {
        'line-cap': 'round',
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
          stops: [[5, 0.5], [9, 1.4], [18, 32]],
        },
        'line-opacity': {
          base: 1,
          stops: [[6, 0], [6.1, 1]],
        },
      },
    },
    {
      id: 'road-motorway-case',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
      ],
      layout: {
        'line-cap': 'round',
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
        'line-opacity': 1,
      },
    },
    {
      id: 'road-construction',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 14,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'construction'], ['==', 'structure', 'none']],
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
      id: 'road-sidewalks',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 16,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['in', 'type', 'crossing', 'sidewalk']],
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
          stops: [[16, 0], [16.25, 1]],
        },
      },
    },
    {
      id: 'road-path',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['!in', 'structure', 'bridge', 'tunnel'],
          ['!in', 'type', 'crossing', 'sidewalk', 'steps'],
          ['==', 'class', 'path'],
        ],
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
      id: 'road-steps',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'type', 'steps']],
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
      id: 'road-trunk_link',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'type', 'trunk_link']],
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
        'line-opacity': 1,
      },
    },
    {
      id: 'road-motorway_link',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 10,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
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
        'line-opacity': 1,
      },
    },
    {
      id: 'road-pedestrian',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 12,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'pedestrian'], ['==', 'structure', 'none']],
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
      id: 'road-service-link-track',
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
          ['!in', 'structure', 'bridge', 'tunnel'],
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
      id: 'road-street_limited',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street_limited'], ['==', 'structure', 'none']],
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
      id: 'road-street',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 11,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'class', 'street'], ['==', 'structure', 'none']],
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
      id: 'road-secondary-tertiary',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
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
      id: 'road-primary',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 6.5,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'class', 'primary']],
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
      id: 'road-trunk',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 5,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'class', 'trunk']],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[5, 0.5], [9, 1.4], [18, 32]],
        },
        'line-color': colorsDictionary.secondaryRoadFill,
        'line-opacity': 1,
      },
    },
    {
      id: 'road-motorway',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['!in', 'structure', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
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
          base: 1,
          stops: [[5, 0], [5.2, 1]],
        },
      },
    },
    {
      id: 'road-rail',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['!in', 'structure', 'bridge', 'tunnel'],
          ['in', 'class', 'major_rail', 'minor_rail'],
        ],
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
  ] as Layer[]
}
