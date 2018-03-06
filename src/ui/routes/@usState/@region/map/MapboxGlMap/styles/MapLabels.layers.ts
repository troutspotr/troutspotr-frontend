export const FONT_ROBOTO_REGULAR = ['roboto-regular']
import { Layer } from 'mapbox-gl'
import { ILayerProperties } from './ICreateLayer'

// export const createHalo

export const getMapLabelLayers = (originalLayerProps: ILayerProperties): Layer[] => {
  const { isOnline, isHighContrastEnabled } = originalLayerProps
  if (isOnline === false) {
    return []
  }

  // if it's high contrast mode, update our pallete.
  const layerProps = {
    ...originalLayerProps,
    pallete: {
      ...originalLayerProps.pallete,
    },
  }

  if (isHighContrastEnabled) {
    layerProps.pallete.secondaryLabelFill = originalLayerProps.pallete.primaryLabelFill
    layerProps.pallete.secondaryLabelBackground =
      originalLayerProps.pallete.secondaryLabelBackground
  }

  const { pallete } = layerProps

  const labels = [
    {
      id: 'waterway-label',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'waterway_label',
      minzoom: 12,
      filter: ['in', 'class', 'canal', 'river'],
      layout: {
        'text-field': '{name_en}',
        'text-font': FONT_ROBOTO_REGULAR,
        'symbol-placement': 'line',
        'text-pitch-alignment': 'viewport',
        'text-max-angle': 30,
        'text-size': {
          base: 1,
          stops: [[13, 12], [18, 16]],
        },
      },
      paint: {
        'text-halo-width': 0,
        'text-halo-blur': 0,
        'text-color': pallete.secondaryLabelFill,
      },
    },
    {
      id: 'poi-scalerank3',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'poi_label',
      filter: [
        'all',
        [
          '!in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo',
        ],
        ['==', 'scalerank', 3],
      ],
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [[16, 11], [20, 13]],
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': FONT_ROBOTO_REGULAR,
        'text-padding': 1,
        'text-offset': [0, 0],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'poi-parks-scalerank3',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'poi_label',
      filter: [
        'all',
        ['==', 'scalerank', 3],
        [
          'in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo',
        ],
      ],
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [[16, 11], [20, 12]],
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': FONT_ROBOTO_REGULAR,
        'text-padding': 2,
        'text-offset': [0, 0],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8,
      },
      paint: {
        'text-halo-blur': 0,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-color': pallete.secondaryLabelFill,
      },
    },
    {
      id: 'road-label-small',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'road_label',
      minzoom: 15,
      filter: [
        'all',
        [
          '!in',
          'class',
          'ferry',
          'golf',
          'link',
          'motorway',
          'path',
          'pedestrian',
          'primary',
          'secondary',
          'street',
          'street_limited',
          'tertiary',
          'track',
          'trunk',
        ],
        ['==', '$type', 'LineString'],
      ],
      layout: {
        'text-size': {
          base: 1,
          stops: [[15, 10], [20, 13]],
        },
        'text-max-angle': 30,
        'symbol-spacing': 500,
        'text-font': FONT_ROBOTO_REGULAR,
        'symbol-placement': 'line',
        'text-padding': 1,
        'text-rotation-alignment': 'map',
        'text-pitch-alignment': 'viewport',
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1.25,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'road-label-medium',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'road_label',
      minzoom: 13,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['in', 'class', 'link', 'pedestrian', 'street', 'street_limited'],
      ],
      layout: {
        'text-size': {
          base: 1,
          stops: [[11, 10], [20, 14]],
        },
        'text-max-angle': 30,
        'symbol-spacing': 500,
        'text-font': FONT_ROBOTO_REGULAR,
        'symbol-placement': 'line',
        'text-padding': 1,
        'text-rotation-alignment': 'map',
        'text-pitch-alignment': 'viewport',
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'road-label-large',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'road_label',
      minzoom: 12,
      filter: ['in', 'class', 'motorway', 'primary', 'secondary', 'tertiary', 'trunk'],
      layout: {
        'text-size': {
          base: 1,
          stops: [[9, 10], [20, 16]],
        },
        'text-max-angle': 30,
        'symbol-spacing': 400,
        'text-font': FONT_ROBOTO_REGULAR,
        'symbol-placement': 'line',
        'text-padding': 1,
        'text-rotation-alignment': 'map',
        'text-pitch-alignment': 'viewport',
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'poi-scalerank2',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'poi_label',
      filter: [
        'all',
        [
          '!in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo',
        ],
        ['==', 'scalerank', 2],
      ],
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [[14, 11], [20, 12]],
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': FONT_ROBOTO_REGULAR,
        'text-padding': 2,
        'text-offset': [0, 0],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'poi-parks-scalerank2',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'poi_label',
      filter: [
        'all',
        ['==', 'scalerank', 2],
        [
          'in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo',
        ],
      ],
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [[14, 11], [20, 12]],
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': FONT_ROBOTO_REGULAR,
        'text-padding': 2,
        'text-offset': [0, 0],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'water-label',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'water_label',
      minzoom: 5,
      filter: ['>', 'area', 10000],
      layout: {
        'text-field': '{name_en}',
        'text-font': FONT_ROBOTO_REGULAR,
        'text-max-width': 7,
        'text-size': {
          base: 1,
          stops: [[13, 13], [18, 18]],
        },
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'poi-parks-scalerank1',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'poi_label',
      filter: [
        'all',
        ['<=', 'scalerank', 1],
        [
          'in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo',
        ],
      ],
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [[10, 11], [18, 12]],
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': FONT_ROBOTO_REGULAR,
        'text-padding': 2,
        'text-offset': [0, 0],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'poi-scalerank1',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'poi_label',
      filter: [
        'all',
        [
          '!in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo',
        ],
        ['<=', 'scalerank', 1],
      ],
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [[10, 11], [18, 12]],
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': FONT_ROBOTO_REGULAR,
        'text-padding': 2,
        'text-offset': [0, 0],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-neighbourhood',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      minzoom: 12,
      maxzoom: 16,
      filter: ['==', 'type', 'neighbourhood'],
      layout: {
        'text-field': '{name_en}',
        'text-transform': 'uppercase',
        'text-letter-spacing': 0.1,
        'text-max-width': 7,
        'text-font': FONT_ROBOTO_REGULAR,
        'text-padding': 3,
        'text-size': {
          base: 1,
          stops: [[12, 11], [16, 16]],
        },
      },
      paint: {
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-color': pallete.secondaryLabelFill,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-suburb',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      minzoom: 11,
      maxzoom: 16,
      filter: ['==', 'type', 'suburb'],
      layout: {
        'text-field': '{name_en}',
        'text-transform': 'uppercase',
        'text-font': FONT_ROBOTO_REGULAR,
        'text-letter-spacing': 0.15,
        'text-max-width': 7,
        'text-padding': 3,
        'text-size': {
          base: 1,
          stops: [[11, 11], [15, 18]],
        },
      },
      paint: {
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-color': pallete.secondaryLabelFill,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-hamlet',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      minzoom: 10,
      maxzoom: 16,
      filter: ['==', 'type', 'hamlet'],
      layout: {
        'text-field': '{name_en}',
        'text-font': FONT_ROBOTO_REGULAR,
        'text-size': {
          base: 1,
          stops: [[12, 11.5], [15, 16]],
        },
      },
      paint: {
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1.25,
        'text-color': pallete.secondaryLabelFill,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-village',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      minzoom: 11,
      maxzoom: 15,
      filter: ['==', 'type', 'village'],
      layout: {
        'text-field': '{name_en}',
        'text-font': FONT_ROBOTO_REGULAR,
        'text-max-width': 7,
        'text-size': {
          base: 1,
          stops: [[10, 11.5], [16, 18]],
        },
      },
      paint: {
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1.25,
        'text-color': pallete.secondaryLabelFill,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-town',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      minzoom: 7.5,
      maxzoom: 15,
      filter: ['==', 'type', 'town'],
      layout: {
        'text-size': {
          base: 1,
          stops: [[7, 11.5], [15, 20]],
        },
        'text-font': {
          base: 1,
          stops: [[11, FONT_ROBOTO_REGULAR], [12, FONT_ROBOTO_REGULAR]],
        },
        'text-padding': 2,
        'text-offset': [0, 0],
        'text-field': '{name_en}',
        'text-max-width': 7,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1.25,
        'icon-opacity': {
          base: 1,
          stops: [[7.99, 1], [8, 0]],
        },
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-islands',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      maxzoom: 16,
      filter: ['==', 'type', 'island'],
      layout: {
        'text-line-height': 1.2,
        'text-size': {
          base: 1,
          stops: [[10, 11], [18, 16]],
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': FONT_ROBOTO_REGULAR,
        'text-padding': 2,
        'text-offset': [0, 0],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 7,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-city-sm',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      maxzoom: 14,
      filter: ['all', ['!in', 'scalerank', 0, 1, 2, 3, 4, 5], ['==', 'type', 'city']],
      layout: {
        'text-size': {
          base: 1,
          stops: [[6, 12], [14, 22]],
        },
        'text-font': {
          base: 1,
          stops: [[7, FONT_ROBOTO_REGULAR], [8, FONT_ROBOTO_REGULAR]],
        },
        'text-offset': [0, 0],
        'text-field': '{name_en}',
        'text-max-width': 7,
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1.25,
        'icon-opacity': {
          base: 1,
          stops: [[7.99, 1], [8, 0]],
        },
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-city-md-s',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      maxzoom: 14,
      filter: [
        'all',
        ['==', 'type', 'city'],
        ['in', 'ldir', 'E', 'S', 'SE', 'SW'],
        ['in', 'scalerank', 3, 4, 5],
      ],
      layout: {
        'text-field': '{name_en}',
        'text-size': {
          base: 0.9,
          stops: [[5, 12], [12, 22]],
        },
        'text-anchor': 'top',
        'text-offset': {
          base: 1,
          stops: [[7.99, [0, 0.1]], [8, [0, 0]]],
        },
        'text-font': {
          base: 1,
          stops: [[7, FONT_ROBOTO_REGULAR], [8, FONT_ROBOTO_REGULAR]],
        },
        'icon-image': 'dot-10',
      },
      paint: {
        'text-halo-width': 1,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-color': pallete.secondaryLabelFill,
        'text-halo-blur': 0,
        'icon-opacity': {
          base: 1,
          stops: [[7.99, 1], [8, 0]],
        },
      },
    },
    {
      id: 'place-city-md-n',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      maxzoom: 14,
      filter: [
        'all',
        ['==', 'type', 'city'],
        ['in', 'ldir', 'N', 'NE', 'NW', 'W'],
        ['in', 'scalerank', 3, 4, 5],
      ],
      layout: {
        'text-size': {
          base: 0.9,
          stops: [[5, 12], [12, 22]],
        },
        'text-font': {
          base: 1,
          stops: [[7, FONT_ROBOTO_REGULAR], [8, FONT_ROBOTO_REGULAR]],
        },
        'text-offset': {
          base: 1,
          stops: [[7.99, [0, -0.25]], [8, [0, 0]]],
        },
        'text-anchor': 'bottom',
        'text-field': '{name_en}',
        'text-max-width': 7,
        'icon-image': 'dot-10',
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'icon-opacity': {
          base: 1,
          stops: [[7.99, 1], [8, 0]],
        },
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-city-lg-s',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      minzoom: 1,
      maxzoom: 14,
      filter: [
        'all',
        ['<=', 'scalerank', 2],
        ['==', 'type', 'city'],
        ['in', 'ldir', 'E', 'S', 'SE', 'SW'],
      ],
      layout: {
        'icon-image': 'dot-11',
        'text-font': {
          base: 1,
          stops: [[7, FONT_ROBOTO_REGULAR], [8, FONT_ROBOTO_REGULAR]],
        },
        'text-offset': {
          base: 1,
          stops: [[7.99, [0, 0.15]], [8, [0, 0]]],
        },
        'text-anchor': {
          base: 1,
          stops: [[7, 'top'], [8, 'center']],
        },
        'text-field': '{name_en}',
        'text-max-width': 7,
        'text-size': {
          base: 0.9,
          stops: [[4, 12], [10, 22]],
        },
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'icon-opacity': {
          base: 1,
          stops: [[7.99, 1], [8, 0]],
        },
        'text-halo-blur': 0,
      },
    },
    {
      id: 'place-city-lg-n',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      minzoom: 1,
      maxzoom: 14,
      filter: [
        'all',
        ['<=', 'scalerank', 2],
        ['==', 'type', 'city'],
        ['in', 'ldir', 'N', 'NE', 'NW', 'W'],
      ],
      layout: {
        'icon-image': 'dot-11',
        'text-font': {
          base: 1,
          stops: [[7, FONT_ROBOTO_REGULAR], [8, FONT_ROBOTO_REGULAR]],
        },
        'text-offset': {
          base: 1,
          stops: [[7.99, [0, -0.25]], [8, [0, 0]]],
        },
        'text-anchor': {
          base: 1,
          stops: [[7, 'bottom'], [8, 'center']],
        },
        'text-field': '{name_en}',
        'text-max-width': 7,
        'text-size': {
          base: 0.9,
          stops: [[4, 12], [10, 22]],
        },
      },
      paint: {
        'text-color': pallete.secondaryLabelFill,
        'text-opacity': 1,
        'text-halo-color': pallete.secondaryLabelBackground,
        'text-halo-width': 1,
        'icon-opacity': {
          base: 1,
          stops: [[7.99, 1], [8, 0]],
        },
        'text-halo-blur': 0,
      },
    },
  ] as Layer[]

  if (isHighContrastEnabled) {
    labels.forEach(label => {
      if (label.type !== 'symbol') {
        return
      }

      const paint = label.paint
      paint['text-halo-blur'] = 10
      paint['text-halo-width'] = 10
      paint['text-halo-color'] = pallete.primaryLabelBackground

      const layout = label.layout
      if (layout['text-size'] != null && layout['text-size'].stops != null) {
        layout['text-size'].stops.forEach(x => {
          x[1] *= 1.2
        })
      }
    })
  }
  return labels
}
