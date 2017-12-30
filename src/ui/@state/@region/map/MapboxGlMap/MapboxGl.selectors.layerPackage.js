import {createSelector} from 'reselect'
import {keyBy} from 'lodash'

import * as filters from './filters/Filters.selectors'
import * as styles from './styles/Style.selectors'

export const getLayerPackage = createSelector(
  [
    styles.streamLayersSelector,
    styles.troutSectionsLayersSelector,
    styles.palLayersSelector,
    styles.restrictionSectionsLayersSelector,
    styles.palSectionsLayersSelector,
    styles.accessPointsLayerSelector,
    styles.satelliteLayersSelector,
    styles.streamCentroidLayersSelector,
    filters.getStreamFilters,
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
    ].map((style) => {
      const filters = style.map((s) => filterLookupTable[s.layerId]).filter((x) => x != null && x.filterDefinition != null)
      const layerId = style.map((x) => x.layerDefinition.id).join('_')

      return {
        'layers': style,
        filters,
        layerId,
      }
    })

    return result
  })
