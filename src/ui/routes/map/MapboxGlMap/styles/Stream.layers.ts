import { Layer, LineLayout, LinePaint, StyleFunction } from 'mapbox-gl'
import { ILayerProperties } from './ICreateLayer'

export const STREAM_LAYER_ID = 'stream_layer'
export const TROUT_SECTION_LAYER_ID = 'trout_section_layer'
export const PAL_LAYER_ID = 'pal_layer'
export const RESTRICTION_SECTION_HIGH_LAYER = 'restriction_layer_high'
export const RESTRICTION_SECTION_LOW_LAYER = 'restriction_layer_low'
export const createStreamLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const { pallete, streamSettings, streamFilter = [] } = layerProps
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

  if (streamFilter != null) {
    streamStyle.filter = ['in', 'gid', ...streamFilter]
  }

  return [streamStyle]
}

export const createTroutSectionLayerLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer[] => {
  const { pallete, streamSettings, isHighContrastEnabled } = layerProps
  const widthMultiplier = isHighContrastEnabled
    ? streamSettings.troutSectionWidth * 1.75
    : streamSettings.troutSectionWidth
  const lineLayout: LineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  }

  const linePaint: LinePaint = {
    'line-color': pallete.troutSectionFill,
    'line-width': {
      base: 1.5,
      stops: [
        [1, 0.1 * widthMultiplier],
        [4.0, 0.1 * widthMultiplier],
        [8.5, 1 * widthMultiplier],
        [10, 1.25 * widthMultiplier],
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

  if (layerProps.streamFilter != null) {
    streamStyle.filter = ['in', 'stream_gid', ...layerProps.streamFilter]
  }


  return [streamStyle]
}

export const createPalLayerLayer = (layerProps: ILayerProperties, sourceId: string): Layer[] => {
  const { pallete, streamSettings, isHighContrastEnabled } = layerProps
  const widthMultiplier = isHighContrastEnabled
    ? streamSettings.publicSectionWidth * 1.75
    : streamSettings.publicSectionWidth

  const lineLayout: LineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  }

  const linePaint: LinePaint = {
    'line-color': pallete.palSectionFill,
    'line-width': {
      base: 1.5,
      stops: [
        [1, 0.2 * widthMultiplier],
        [4.0, 0.2 * widthMultiplier],
        [8.5, 1 * widthMultiplier],
        [10, 1.25 * widthMultiplier],
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

  if (layerProps.streamFilter != null) {
    streamStyle.filter = ['in', 'stream_gid', ...layerProps.streamFilter]
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
  const widthMultiplier = isHighContrastEnabled ? 3 : 2

  const lowZoomOpacity: StyleFunction = {
    base: 1,
    stops: [[8.5, 0], [9.5, 0.3], [10, 1], [11.5, 1], [13.5, 0]],
  }
  const paint: LinePaint = {
    'line-offset': 0,
    // 'line-dasharray': [2, 4],
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
        // at zoom 9
        [{ zoom: 9, value: 1 }, 1 + streamSettings.publicSectionWidth * 1.7],
        [{ zoom: 9, value: 2 }, 1 + streamSettings.publicSectionWidth * 1.7],
        [{ zoom: 9, value: 3 }, 1 + streamSettings.publicSectionWidth * 1.7],
        [{ zoom: 9, value: 4 }, 1 + streamSettings.publicSectionWidth * 1.7],

        // at zoom 10
        [{ zoom: 10, value: 1 }, 2 + 2 * streamSettings.publicSectionWidth],
        [{ zoom: 10, value: 2 }, 2 + 2 * streamSettings.publicSectionWidth],
        [{ zoom: 10, value: 3 }, 2 + 2 * streamSettings.publicSectionWidth],
        [{ zoom: 10, value: 4 }, 2 + 2 * streamSettings.publicSectionWidth],

        [{ zoom: 11.5, value: 1 }, 2 + 2.2 * streamSettings.publicSectionWidth],
        [{ zoom: 11.5, value: 2 }, 2 + 2.2 * streamSettings.publicSectionWidth],
        [{ zoom: 11.5, value: 3 }, 2 + 2.2 * streamSettings.publicSectionWidth],
        [{ zoom: 11.5, value: 4 }, 2 + 2.2 * streamSettings.publicSectionWidth],

        // at zoom 12.5
        [{ zoom: 12.5, value: 1 }, 9 + 2 * streamSettings.publicSectionWidth],
        [{ zoom: 12.5, value: 2 }, 12.5 + 3 * streamSettings.publicSectionWidth],
        [{ zoom: 12.5, value: 3 }, 16 + 4 * streamSettings.publicSectionWidth],
        [{ zoom: 12.5, value: 4 }, 20 + 5 * streamSettings.publicSectionWidth],

        // 15.5
        [{ zoom: 15.5, value: 1 }, 9 + 2 * streamSettings.publicSectionWidth],
        [{ zoom: 15.5, value: 2 }, 12 + 3 * streamSettings.publicSectionWidth],
        [{ zoom: 15.5, value: 3 }, 16 + 4 * streamSettings.publicSectionWidth],
        [{ zoom: 15.5, value: 4 }, 20 + 5 * streamSettings.publicSectionWidth],

        // at zoom 18
        [{ zoom: 18, value: 1 }, 40 + 1.0 * streamSettings.publicSectionWidth],
        [{ zoom: 18, value: 2 }, 60 + 1.1 * streamSettings.publicSectionWidth],
        [{ zoom: 18, value: 3 }, 75 + 1.2 * streamSettings.publicSectionWidth],
        [{ zoom: 18, value: 4 }, 90 + 1.3 * streamSettings.publicSectionWidth],
      ],
    },
    'line-width': {
      base: 1.4,
      stops: [[8.5, 0.01], [9, 1], [10, 1 * widthMultiplier], [18, 10]],
    },
    'line-opacity': lowZoomOpacity,
  }
  const lowZoomRestrictionLayer: Layer = {
    id: RESTRICTION_SECTION_HIGH_LAYER,
    type: 'line',
    source: sourceId,
    layout: {
      visibility: 'visible',
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint,
  }

  const highZoomOpacity: StyleFunction = {
    base: 1,
    stops: [[10, 0], [11, 1], [12, 1]],
  }
  const highZoomRestrictionLayer: Layer = {
    ...lowZoomRestrictionLayer,
    id: RESTRICTION_SECTION_LOW_LAYER,
    paint: {
      ...lowZoomRestrictionLayer.paint,
      'line-opacity': highZoomOpacity,
      'line-dasharray': [4, 1.5],
    },
  }

  return [lowZoomRestrictionLayer, highZoomRestrictionLayer]
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
