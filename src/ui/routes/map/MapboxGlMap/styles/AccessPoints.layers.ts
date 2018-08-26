import { Layer, StyleFunction } from 'mapbox-gl'
import { FONT_ROBOTO_BOLD } from './Base.style'
import { ILayerProperties } from './ICreateLayer'

export const ACCESSPOINT_CIRCLE_LABEL_LAYER = 'access_point_circle_label_layer'
export const ACCESSPOINT_CIRCLE_BORDER_LAYER = 'access_point_circle_border_layer'
export const ACCESSPOINT_CIRCLE_LAYER = 'access_point_circle_layer'
export const ACCESSPOINT_ROAD_LABEL_LAYER = 'access_point_road_label_layer'

// const ACCESS_POINT_STREET_NAME_TEXT_OFFSET = [1.0, 0.15]
const ACCESS_POINT_ALPHABET_TEXT_OFFSET = [0.0, 0.15]
const ACCESS_POINT_LABEL_TEXT_OFFSET = [1, 0.15]
const createCircleRadius = (diameter: number): StyleFunction => {
  const circleRadius: StyleFunction = {
    base: 1.6,
    stops: [[7, 0], [10, diameter * 0.5], [11.5, diameter]],
  }

  return circleRadius
}

export const filter = () => {}

export const createAccessPointCircleLabelLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer => {
  const label: Layer = {
    id: ACCESSPOINT_CIRCLE_LABEL_LAYER,
    type: 'symbol',
    source: sourceId,
    minzoom: 7,
    layout: {
      'text-field': '{alphabetLetter}',
      'text-offset': ACCESS_POINT_ALPHABET_TEXT_OFFSET,
      'text-anchor': 'center',
      'text-size': createCircleRadius(
        layerProps.accessPointSettings.publiclyAccessibleRadius * 1.2
      ),
      'text-font': FONT_ROBOTO_BOLD,
    },
    paint: {
      'text-color': layerProps.pallete.accessPointLabelColor,
     },
  }

  if (layerProps.streamFilter != null) {
    label.filter = ['in', 'stream_gid', ...layerProps.streamFilter]
  }

  return label
}

export const createAccessPointRoadLabelLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer => {
  const label: Layer = {
    id: ACCESSPOINT_ROAD_LABEL_LAYER,
    type: 'symbol',
    source: sourceId,
    minzoom: 12,
    layout: {
      'text-field': '{street_name}',
      'text-offset': ACCESS_POINT_LABEL_TEXT_OFFSET,
      'text-anchor': 'left',
      'text-size': createCircleRadius(
        layerProps.accessPointSettings.publiclyAccessibleRadius * 1.5
      ),
      'text-font': FONT_ROBOTO_BOLD,
    },
    paint: {
      'text-color': layerProps.pallete.primaryLabelFill,
      'text-halo-color': layerProps.pallete.primaryLabelBackground,
      'text-halo-width': 0.5,
    },
  }

  if (layerProps.streamFilter != null) {
    label.filter = ['in', 'stream_gid', ...layerProps.streamFilter]
  }

  return label
}

export const createAccessPointCircleBorderLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer => {
  const { pallete } = layerProps
  const color = pallete.accessPointBorderColor
  const diameter =
    layerProps.accessPointSettings.publiclyAccessibleRadius +
    layerProps.accessPointSettings.borderWidth
  const borderRadius = createCircleRadius(diameter)
  const border: Layer = {
    id: ACCESSPOINT_CIRCLE_BORDER_LAYER,
    source: sourceId,
    type: 'circle',
    paint: {
      'circle-color': color,
      'circle-radius': borderRadius,
    },
  }

  if (layerProps.streamFilter != null) {
    border.filter = ['in', 'stream_gid', ...layerProps.streamFilter]
  }
  return border
}

export const createAccessPointCircleLayerLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer[] => {
  const { pallete } = layerProps
  const circleColor: StyleFunction = {
    property: 'bridgeType',
    type: 'categorical',
    stops: [
      ['publicTrout', pallete.palSectionFill],
      ['permissionRequired', pallete.troutSectionFill],
      ['unsafe', pallete.restrictionYellow],
      ['uninteresting', 'red'],
    ],
  }

  const circleRadius = createCircleRadius(layerProps.accessPointSettings.publiclyAccessibleRadius)
  const colorCircle: Layer = {
    id: ACCESSPOINT_CIRCLE_LAYER,
    source: sourceId,
    type: 'circle',
    paint: {
      'circle-color': circleColor,
      'circle-radius': circleRadius,
    },
  }

  const border = createAccessPointCircleBorderLayer(layerProps, sourceId)
  return [border, colorCircle].map(x => {
    if (layerProps.streamFilter != null) {
      x.filter = ['in', 'stream_gid', ...layerProps.streamFilter]
    }
    return x
  })
}
