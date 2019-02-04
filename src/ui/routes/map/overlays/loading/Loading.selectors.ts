import { createSelector } from 'reselect'
import { selectedStateSelector, selectedRegionSelector } from 'ui/core/Core.selectors';

export const loadingMessageTitleSelector = createSelector(
  [selectedStateSelector, selectedRegionSelector],
  (selectedState, selectedRegion) => {
    if (selectedState == null || selectedRegion == null) {
      return ''
    }
    const regionName = selectedRegion.properties.long_name
    const stateName = selectedState.properties.short_name.toUpperCase()
    return `Loading ${regionName}, ${stateName}...`
  }
)