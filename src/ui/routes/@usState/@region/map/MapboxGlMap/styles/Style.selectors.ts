import { createSelector } from 'reselect'
import * as accessPointStyles from './AccessPoint.style'
import * as palStyles from './Pal.style'
import * as palSectionStyles from './PalSection.style'
import * as restrictionSectionStyles from './RestrictionSection.style'
import * as satelliteStyles from './Satellite.style'
// Import * as regionSelectors from 'ui/@state/@region/Region.selectors'
import * as streamStyles from './Stream.style'
import * as troutSectionStyles from './TroutSection.style'

export const UNDER_ROAD_PLACEHOLDER = 'UNDER-ROAD-PLACEHOLDER'
export const UNDER_LABEL_PLACEHOLDER = 'UNDER-LABEL-PLACEHOLDER'

const noop = () => {
  0
}
export const streamLayersSelector = createSelector([noop], () => {
  const quietLayer = layerGeneratorBetter(streamStyles.StreamQuietStyle, UNDER_ROAD_PLACEHOLDER)
  const activeLayer = layerGeneratorBetter(streamStyles.StreamActiveStyle, UNDER_ROAD_PLACEHOLDER)
  return [quietLayer, activeLayer]
})

export const streamCentroidLayersSelector = createSelector([noop], () => {
  const quietLayer = layerGeneratorBetter(
    streamStyles.StreamCentroidsQuietStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  const activeLayer = layerGeneratorBetter(
    streamStyles.StreamCentroidsActiveStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  const highlightLayer = layerGeneratorBetter(
    streamStyles.StreamCentroidsHighlightStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  return [quietLayer, activeLayer, highlightLayer]
})

export const troutSectionsLayersSelector = createSelector([noop], () => {
  const quietLayer = layerGeneratorBetter(
    troutSectionStyles.TroutSectionActiveStyle,
    UNDER_ROAD_PLACEHOLDER
  )
  const activeLayer = layerGeneratorBetter(
    troutSectionStyles.TroutSectionQuietStyle,
    UNDER_ROAD_PLACEHOLDER
  )
  return [quietLayer, activeLayer]
})

export const palLayersSelector = createSelector([noop], () => {
  const activeLayer = layerGeneratorBetter(palStyles.PalStyle, UNDER_ROAD_PLACEHOLDER)
  return [activeLayer]
})

export const satelliteLayersSelector = createSelector([noop], () => {
  const activeLayer = layerGeneratorBetter(satelliteStyles.SatelliteStyle, UNDER_ROAD_PLACEHOLDER)
  return [activeLayer]
})

export const restrictionSectionsLayersSelector = createSelector([noop], () => {
  const activeLayer = layerGeneratorBetter(
    restrictionSectionStyles.RestrictionSectionActiveStyle,
    UNDER_ROAD_PLACEHOLDER
  )
  const quietLayer = layerGeneratorBetter(
    restrictionSectionStyles.RestrictionSectionQuietStyle,
    UNDER_ROAD_PLACEHOLDER
  )
  return [activeLayer, quietLayer]
})

export const palSectionsLayersSelector = createSelector([noop], () => {
  const activeLayer = layerGeneratorBetter(
    palSectionStyles.PalSectionActiveStyle,
    UNDER_ROAD_PLACEHOLDER
  )
  const quietLayer = layerGeneratorBetter(
    palSectionStyles.PalSectionQuietStyle,
    UNDER_ROAD_PLACEHOLDER
  )
  return [activeLayer, quietLayer]
})

export const gpsLayerSelector = createSelector([noop], () => {})

export const accessPointsLayerSelector = createSelector([noop], () => {
  const labelActiveLayer = layerGeneratorBetter(
    accessPointStyles.AccessPointLabelActiveStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  const labelQuietLayer = layerGeneratorBetter(
    accessPointStyles.AccessPointLabelQuietStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  const borderActiveLayer = layerGeneratorBetter(
    accessPointStyles.AccessPointMarkerBorderActiveStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  const borderQuietLayer = layerGeneratorBetter(
    accessPointStyles.AccessPointMarkerBorderQuietStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  const centerActiveLayer = layerGeneratorBetter(
    accessPointStyles.AccessPointMarkerCenterActiveStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  const centerQuietLayer = layerGeneratorBetter(
    accessPointStyles.AccessPointMarkerCenterQuietStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  const labelLetterActiveLayer = layerGeneratorBetter(
    accessPointStyles.AccessPointLetterLabelActiveStyle,
    UNDER_LABEL_PLACEHOLDER
  )
  const labelletterQuietLayer = layerGeneratorBetter(
    accessPointStyles.AccessPointLabelLetterQuietStyle,
    UNDER_LABEL_PLACEHOLDER
  )

  return [
    borderActiveLayer,
    borderQuietLayer,
    centerActiveLayer,
    centerQuietLayer,
    labelActiveLayer,
    labelQuietLayer,
    labelLetterActiveLayer,
    labelletterQuietLayer,
  ]
})

export const layerGeneratorBetter = (layerDefinition, insertBefore, isInteractive = true) => {
  const { source, id } = layerDefinition
  const layer = layerGenerator(id, source, insertBefore, layerDefinition, isInteractive)
  return layer
}

const layerGenerator = (
  layerId,
  sourceId,
  insertBefore,
  layerDefinition,
  isInteractive = true
) => ({
  layerId,
  sourceId,
  insertBefore,
  layerDefinition,
  isInteractive,
})

export const layersSelector = createSelector(
  [
    streamLayersSelector,
    troutSectionsLayersSelector,
    palLayersSelector,
    restrictionSectionsLayersSelector,
    palSectionsLayersSelector,
    accessPointsLayerSelector,
    streamCentroidLayersSelector,
  ],
  (
    streamLayers,
    troutSectionsLayers,
    palLayers,
    restrictionSectionsLayers,
    palSectionsLayers,
    accessPointsLayers,
    streamCentroidLayersSelector
  ) => {
    const layers = [].concat(
      palLayers,
      streamLayers,
      troutSectionsLayers,
      restrictionSectionsLayers,
      palSectionsLayers,
      accessPointsLayers,
      streamCentroidLayersSelector
    )
    return layers
  }
)
