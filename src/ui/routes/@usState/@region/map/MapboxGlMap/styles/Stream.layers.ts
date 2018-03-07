import { Layer, LineLayout, LinePaint } from 'mapbox-gl'
import { ILayerProperties } from './ICreateLayer'

export const STREAM_LAYER_ID = 'stream_layer'
export const TROUT_SECTION_LAYER_ID = 'trout_section_layer'
export const PAL_LAYER_ID = 'pal_layer'
export const RESTRICTION_SECTION_LAYER = 'restriction_layer'

export const createStreamLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const { pallete, streamSettings } = layerProps
  const lineLayout: LineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  }

  const linePaint: LinePaint = {
    'line-color': pallete.streamFill,
    'line-width': 1 * streamSettings.streamWidth,
  }
  const streamStyle: Layer = {
    id: STREAM_LAYER_ID,
    type: 'line',
    source: sourceId,
    layout: lineLayout,
    paint: linePaint,
  }

  return [streamStyle]
}

export const createTroutSectionLayerLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer[] => {
  const { pallete, streamSettings } = layerProps
  const lineLayout: LineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  }

  const linePaint: LinePaint = {
    'line-color': pallete.troutSectionFill,
    'line-width': {
      base: 1.5,
      stops: [
        [1, 1],
        [8.5, 1 * streamSettings.troutSectionWidth],
        [10, 1.25 * streamSettings.troutSectionWidth],
        [12.5, 6],
        [15.5, 7],
        [18.0, 7],
      ],
    },
  }
  const streamStyle: Layer = {
    id: TROUT_SECTION_LAYER_ID,
    type: 'line',
    source: sourceId,
    layout: lineLayout,
    paint: linePaint,
  }

  return [streamStyle]
}

export const createPalLayerLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const { pallete, streamSettings } = layerProps
  const lineLayout: LineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  }

  const linePaint: LinePaint = {
    'line-color': pallete.palSectionFill,
    'line-width': {
      base: 1.5,
      stops: [
        [1, 1.1],
        [8.5, 1 * streamSettings.publicSectionWidth],
        [10, 1.25 * streamSettings.publicSectionWidth],
        [12.5, 8.5],
        [15.5, 7],
        [18.0, 7],
      ],
    },
  }
  const streamStyle: Layer = {
    id: PAL_LAYER_ID,
    type: 'line',
    source: sourceId,
    layout: lineLayout,
    paint: linePaint,
  }

  return [streamStyle]
}

export const createPalBackdropLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const palBackdropStyle = createPalLayerLayer(layerProps, sourceId)[0]
  palBackdropStyle.id = 'pal_backdrop_layer'
  palBackdropStyle.paint['line-color'] = 'black'
  palBackdropStyle.paint['line-width'].stops.forEach(stop => {
    stop[1] *= 1.7
  })
  return [palBackdropStyle]
}

export const createTroutSectionBackdropLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer[] => {
  const palBackdropStyle = createTroutSectionLayerLayer(layerProps, sourceId)[0]
  palBackdropStyle.id = 'trout_section_backdrop_layer'
  palBackdropStyle.paint['line-color'] = 'black'
  palBackdropStyle.paint['line-width'].stops.forEach(stop => {
    stop[1] *= 1.7
  })
  return [palBackdropStyle]
}

export const createRestrictionSectionLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer[] => {
  const { pallete, streamSettings, isHighContrastEnabled } = layerProps
  const widthMultiplier = isHighContrastEnabled ? 3 : 1
  const paint: LinePaint = {
    'line-offset': 0,
    'line-dasharray': [4, 1],
    // {
    //   base: 1,
    //   stops: [[10, [1, 0]], [12, [4, 1]], [16, [3, 4]]],
    // },
    'line-color': {
      property: 'color',
      type: 'categorical',
      stops: [
        ['red', pallete.restrictionRed],
        ['yellow', pallete.restrictionYellow],
        ['white', pallete.restrictionWhite],
        ['blue', pallete.restrictionBlue],
      ],
    },
    'line-gap-width': {
      property: 'colorOffset',
      stops: [
        // at zoom 10
        [{ zoom: 10, value: 1 }, 1 + 1.1 * streamSettings.publicSectionWidth],
        [{ zoom: 10, value: 2 }, 2 + 1.2 * streamSettings.publicSectionWidth],
        [{ zoom: 10, value: 3 }, 3 + 1.3 * streamSettings.publicSectionWidth],
        [{ zoom: 10, value: 4 }, 4 + 1.4 * streamSettings.publicSectionWidth],

        // at zoom 13
        [{ zoom: 13, value: 1 }, 9 + 1.0 * streamSettings.publicSectionWidth],
        [{ zoom: 13, value: 2 }, 13 + 1.1 * streamSettings.publicSectionWidth],
        [{ zoom: 13, value: 3 }, 16 + 1.2 * streamSettings.publicSectionWidth],
        [{ zoom: 13, value: 4 }, 20 + 1.3 * streamSettings.publicSectionWidth],

        // at zoom 18
        [{ zoom: 18, value: 1 }, 40 + 1.0 * streamSettings.publicSectionWidth],
        [{ zoom: 18, value: 2 }, 60 + 1.1 * streamSettings.publicSectionWidth],
        [{ zoom: 18, value: 3 }, 75 + 1.2 * streamSettings.publicSectionWidth],
        [{ zoom: 18, value: 4 }, 90 + 1.3 * streamSettings.publicSectionWidth],
      ],
    },
    'line-width': {
      base: 1.4,
      stops: [[9, 1 * widthMultiplier], [18, 10]],
    },
    'line-opacity': {
      base: 1,
      stops: [[9, 0], [10, 1]],
    },
  }
  const restrictionLayer: Layer = {
    id: RESTRICTION_SECTION_LAYER,
    type: 'line',
    source: sourceId,
    layout: {
      visibility: 'visible',
      'line-cap': 'butt',
      'line-join': 'miter',
    },
    paint,
  }
  return [restrictionLayer]
}

export const createRestrictionBackdropLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer[] => {
  const backdropLayer = createRestrictionSectionLayer(layerProps, sourceId)[0]
  backdropLayer.id = 'restriction_backdrop_layer'
  backdropLayer.paint['line-color'] = 'black'
  backdropLayer.paint['line-blur'] = 2
  // backdropLayer.paint['line-width'].stops.forEach(stop => (stop[1] *= 1.3))
  // backdropLayer.paint['line-gap-width'].stops.forEach(stop => (stop[1] *= 1.1))
  return [backdropLayer]
}
