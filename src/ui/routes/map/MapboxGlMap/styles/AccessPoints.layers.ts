import { Layer, StyleFunction } from 'mapbox-gl'
import { FONT_ROBOTO_BOLD, FONT_ROBOTO_REGULAR } from './Base.style'
import { ILayerProperties } from './ICreateLayer'

export const ACCESSPOINT_CIRCLE_LABEL_LAYER = 'access_point_circle_label_layer'
export const ACCESSPOINT_CIRCLE_BORDER_LAYER = 'access_point_circle_border_layer'
export const ACCESSPOINT_CIRCLE_LAYER = 'access_point_circle_layer'
export const ACCESSPOINT_ROAD_LABEL_LAYER = 'access_point_road_label_layer'

const ABSOLUTE_MINIMUM_ZOOM_LEVEL = 9.0
const ACCESS_POINT_ALPHABET_TEXT_OFFSET = [0.0, 0.15]
const ACCESS_POINT_LABEL_TEXT_OFFSET = [1, 0.15]
const createCircleRadius = (diameter: number): StyleFunction => {
  const circleRadius: StyleFunction = {
    base: 1.6,
    stops: [[ABSOLUTE_MINIMUM_ZOOM_LEVEL, diameter * 0.1], [10.5, diameter * 0.5], [11.2, diameter]],
  }

  return circleRadius
}

export const createAccessPointCircleLabelLayer = (
  layerProps: ILayerProperties,
  sourceId: string
): Layer => {
  const label: Layer = {
    id: ACCESSPOINT_CIRCLE_LABEL_LAYER,
    type: 'symbol',
    source: sourceId,
    // minzoom: 7,
    minzoom: ABSOLUTE_MINIMUM_ZOOM_LEVEL + 1,
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
    // minzoom: 12,
    minzoom: 14, // ABSOLUTE_MINIMUM_ZOOM_LEVEL + 3.5,
    layout: {
      'text-field': '{street_name}',
      'text-offset': ACCESS_POINT_LABEL_TEXT_OFFSET,
      'text-anchor': 'left',
      'text-size': createCircleRadius(
        layerProps.accessPointSettings.publiclyAccessibleRadius * 1.5
      ),
      'text-font': layerProps.isHighContrastEnabled ? FONT_ROBOTO_REGULAR : FONT_ROBOTO_BOLD,
    },
    paint: {
      'text-color': layerProps.pallete.primaryLabelFill,
      'text-halo-color': layerProps.pallete.primaryLabelBackground,
      'text-halo-width': layerProps.isHighContrastEnabled ? 10 : 0.5,
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
    minzoom: ABSOLUTE_MINIMUM_ZOOM_LEVEL,
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
      ['uninteresting', pallete.filteredStreamFill],
    ],
  }

  const circleRadius = createCircleRadius(layerProps.accessPointSettings.publiclyAccessibleRadius)
  const colorCircleLayer: Layer = {
    id: ACCESSPOINT_CIRCLE_LAYER,
    source: sourceId,
    type: 'circle',
    minzoom: ABSOLUTE_MINIMUM_ZOOM_LEVEL,
    paint: {
      'circle-color': circleColor,
      'circle-radius': circleRadius,
    },
  }

  const border = createAccessPointCircleBorderLayer(layerProps, sourceId)
  if (layerProps.streamFilter != null) {
    colorCircleLayer.filter = ['in', 'stream_gid', ...layerProps.streamFilter]
    border.filter = ['in', 'stream_gid', ...layerProps.streamFilter]
  }


  const filteredOutCircleLayer = {
    ...colorCircleLayer,
    id: `${ACCESSPOINT_CIRCLE_LAYER}_DEACTIVATED`,
    paint: {
      ...colorCircleLayer.paint,
      'circle-color': pallete.filteredStreamFill,
    }
  }

  const filteredBorder = createAccessPointCircleBorderLayer(layerProps, sourceId)
  filteredBorder.id = `${ACCESSPOINT_ROAD_LABEL_LAYER}_DEACTIVATED`
  if (layerProps.streamFilter != null) {
    filteredOutCircleLayer.filter = ['!in', 'stream_gid', ...layerProps.streamFilter]
    filteredBorder.filter = ['!in', 'stream_gid', ...layerProps.streamFilter]
  }
  return [
    filteredBorder,
    filteredOutCircleLayer,
    border,
    colorCircleLayer,
  ]
}
