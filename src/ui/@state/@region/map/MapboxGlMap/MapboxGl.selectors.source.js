import { createSelector } from 'reselect'
import { isEmpty, keyBy, has } from 'lodash'

import * as filters from './filters/Filters.selectors'
import * as styles from './styles/Style.selectors'

export const getLayerPackage = createSelector(
  [ styles.streamLayersSelector,
    styles.troutSectionsLayersSelector,
    styles.palLayersSelector,
    styles.restrictionSectionsLayersSelector,
    styles.palSectionsLayersSelector,
    styles.accessPointsLayerSelector,
    filters.getStreamFilters],
  (streams, troutSections, palLayers, restrictions, palSections, accessPoints, streamFilters) => {
    let filterLookupTable = keyBy(streamFilters, 'layerId')
    let result = [
      streams,
      troutSections,
      palLayers,
      restrictions,
      palSections,
      accessPoints
    ].map(style => {
      return {
        layers: style,
        filters: style.map(s => filterLookupTable[s.layerId]).filter(x => x != null && x.filterDefinition != null)
      }
    })
    console.log(result)
    return result
  })
