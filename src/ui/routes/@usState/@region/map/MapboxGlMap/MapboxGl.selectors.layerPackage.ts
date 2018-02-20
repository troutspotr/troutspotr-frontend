import { createSelector } from 'reselect'
import keyBy from 'lodash-es/keyBy'
import * as filterSelectors from './filters/Filters.selectors'
import * as stylesSelectors from './styles/Style.selectors'

export const getLayerPackage = createSelector(
  [
    stylesSelectors.streamLayersSelector,
    stylesSelectors.troutSectionsLayersSelector,
    stylesSelectors.palLayersSelector,
    stylesSelectors.restrictionSectionsLayersSelector,
    stylesSelectors.palSectionsLayersSelector,
    stylesSelectors.accessPointsLayerSelector,
    stylesSelectors.satelliteLayersSelector,
    stylesSelectors.streamCentroidLayersSelector,
    filterSelectors.getStreamFilters,
  ],
  (
    streams,
    troutSections,
    palLayers,
    restrictions,
    palSections,
    accessPoints,
    satellite,
    streamCentroids,
    streamFilters
  ) => {
    const filterLookupTable = keyBy(streamFilters, 'layerId')
    const result = [
      satellite,
      palLayers,
      streams,
      troutSections,
      restrictions,
      palSections,
      accessPoints,
      streamCentroids,
    ].map(style => {
      const filters = style
        .map(s => filterLookupTable[s.layerId])
        .filter(x => x != null && x.filterDefinition != null)
      const layerId = style.map(x => x.layerDefinition.id).join('_')

      return {
        layers: style,
        filters,
        layerId,
      }
    })

    return result
  }
)
