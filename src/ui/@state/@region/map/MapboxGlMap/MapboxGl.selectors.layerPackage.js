import { createSelector } from 'reselect'
import { keyBy } from 'lodash'

import * as filters from './filters/Filters.selectors'
import * as styles from './styles/Style.selectors'

export const getLayerPackage = createSelector(
  [ styles.streamLayersSelector,
    styles.troutSectionsLayersSelector,
    styles.palLayersSelector,
    styles.restrictionSectionsLayersSelector,
    styles.palSectionsLayersSelector,
    styles.accessPointsLayerSelector,
    styles.satelliteLayersSelector,
    filters.getStreamFilters],
  (
    streams,
    troutSections,
    palLayers,
    restrictions,
    palSections,
    accessPoints,
    satellite,
    streamFilters
  ) => {
    let filterLookupTable = keyBy(streamFilters, 'layerId')
    let result = [
      satellite,
      palLayers,
      streams,
      troutSections,
      restrictions,
      palSections,
      accessPoints
    ].map(style => {
      return {
        layers: style,
        filters: style.map(s => filterLookupTable[s.layerId]).filter(x => x != null && x.filterDefinition != null)
      }
    })
    return result
  })
