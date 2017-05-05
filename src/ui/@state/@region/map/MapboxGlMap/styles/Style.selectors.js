import { createSelector } from 'reselect'
// import * as regionSelectors from 'ui/@state/@region/Region.selectors'
import * as streamStyles from './Stream.style'
import * as troutSectionStyles from './TroutSection.style'
import * as palStyles from './Pal.style'
import * as satelliteStyles from './Satellite.style'
import * as restrictionSectionStyles from './RestrictionSection.style'
import * as palSectionStyles from './PalSection.style'
import * as accessPointStyles from './AccessPoint.style'

export const UNDER_ROAD_PLACEHOLDER = 'UNDER-ROAD-PLACEHOLDER'
export const UNDER_LABEL_PLACEHOLDER = 'UNDER-LABEL-PLACEHOLDER'

export const streamLayersSelector = createSelector(
  [],
  () => {
    let quietLayer = layerGeneratorBetter(streamStyles.StreamQuietStyle, UNDER_ROAD_PLACEHOLDER)
    let activeLayer = layerGeneratorBetter(streamStyles.StreamActiveStyle, UNDER_ROAD_PLACEHOLDER)
    return [quietLayer, activeLayer]
  })

export const streamCentroidLayersSelector = createSelector(
  [],
  () => {
    let quietLayer = layerGeneratorBetter(streamStyles.StreamCentroidsQuietStyle, UNDER_LABEL_PLACEHOLDER)
    let activeLayer = layerGeneratorBetter(streamStyles.StreamCentroidsActiveStyle, UNDER_LABEL_PLACEHOLDER)
    let highlightLayer = layerGeneratorBetter(streamStyles.StreamCentroidsHighlightStyle, UNDER_LABEL_PLACEHOLDER)
    return [quietLayer, activeLayer, highlightLayer]
  })

export const troutSectionsLayersSelector = createSelector(
  [],
  () => {
    let quietLayer = layerGeneratorBetter(troutSectionStyles.TroutSectionActiveStyle, UNDER_ROAD_PLACEHOLDER)
    let activeLayer = layerGeneratorBetter(troutSectionStyles.TroutSectionQuietStyle, UNDER_ROAD_PLACEHOLDER)
    return [quietLayer, activeLayer]
  })

export const palLayersSelector = createSelector(
  [],
  () => {
    let activeLayer = layerGeneratorBetter(palStyles.PalStyle, UNDER_ROAD_PLACEHOLDER)
    return [activeLayer]
  })

export const satelliteLayersSelector = createSelector(
  [],
  () => {
    let activeLayer = layerGeneratorBetter(satelliteStyles.SatelliteStyle, UNDER_ROAD_PLACEHOLDER)
    return [activeLayer]
  })

export const restrictionSectionsLayersSelector = createSelector(
  [],
  () => {
    let activeLayer = layerGeneratorBetter(restrictionSectionStyles.RestrictionSectionActiveStyle, UNDER_ROAD_PLACEHOLDER)
    let quietLayer = layerGeneratorBetter(restrictionSectionStyles.RestrictionSectionQuietStyle, UNDER_ROAD_PLACEHOLDER)
    return [activeLayer, quietLayer]
  })

export const palSectionsLayersSelector = createSelector(
  [],
  () => {
    let activeLayer = layerGeneratorBetter(palSectionStyles.PalSectionActiveStyle, UNDER_ROAD_PLACEHOLDER)
    let quietLayer = layerGeneratorBetter(palSectionStyles.PalSectionQuietStyle, UNDER_ROAD_PLACEHOLDER)
    return [activeLayer, quietLayer]
  })

export const gpsLayerSelector = createSelector(
  [],
  () => {

  })

export const accessPointsLayerSelector = createSelector(
  [],
  () => {
    let labelActiveLayer = layerGeneratorBetter(accessPointStyles.AccessPointLabelActiveStyle, UNDER_LABEL_PLACEHOLDER)
    let labelQuietLayer = layerGeneratorBetter(accessPointStyles.AccessPointLabelQuietStyle, UNDER_LABEL_PLACEHOLDER)
    let borderActiveLayer = layerGeneratorBetter(accessPointStyles.AccessPointMarkerBorderActiveStyle, UNDER_LABEL_PLACEHOLDER)
    let borderQuietLayer = layerGeneratorBetter(accessPointStyles.AccessPointMarkerBorderQuietStyle, UNDER_LABEL_PLACEHOLDER)
    let centerActiveLayer = layerGeneratorBetter(accessPointStyles.AccessPointMarkerCenterActiveStyle, UNDER_LABEL_PLACEHOLDER)
    let centerQuietLayer = layerGeneratorBetter(accessPointStyles.AccessPointMarkerCenterQuietStyle, UNDER_LABEL_PLACEHOLDER)
    let labelLetterActiveLayer = layerGeneratorBetter(accessPointStyles.AccessPointLetterLabelActiveStyle, UNDER_LABEL_PLACEHOLDER)
    let labelletterQuietLayer = layerGeneratorBetter(accessPointStyles.AccessPointLabelLetterQuietStyle, UNDER_LABEL_PLACEHOLDER)

    return [
      borderActiveLayer,
      borderQuietLayer,
      centerActiveLayer,
      centerQuietLayer,
      labelActiveLayer,
      labelQuietLayer,
      labelLetterActiveLayer,
      labelletterQuietLayer

    ]
  })

export const layerGeneratorBetter = (layerDefinition, insertBefore, isInteractive = true) => {
  let { source, id } = layerDefinition
  let layer = layerGenerator(id, source, insertBefore, layerDefinition, isInteractive)
  return layer
}

const layerGenerator = (layerId, sourceId, insertBefore, layerDefinition, isInteractive = true) => {
  return {
    layerId,
    sourceId,
    insertBefore,
    layerDefinition,
    isInteractive
  }
}

export const layersSelector = createSelector(
  [
    streamLayersSelector,
    troutSectionsLayersSelector,
    palLayersSelector,
    restrictionSectionsLayersSelector,
    palSectionsLayersSelector,
    accessPointsLayerSelector,
    streamCentroidLayersSelector
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
    let layers = [].concat(
      palLayers,
      streamLayers,
      troutSectionsLayers,
      restrictionSectionsLayers,
      palSectionsLayers,
      accessPointsLayers,
      streamCentroidLayersSelector
    )
    return layers
  })
