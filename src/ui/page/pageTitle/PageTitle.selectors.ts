import { createSelector } from 'reselect'
import { selectedRegionSelector, selectedStateSelector } from 'ui/core/Core.selectors'
import { displayedStreamTitleSelector } from 'ui/routes/@usState/UsState.selectors'

const defaultTitle = 'TroutSpotr'

export const getPageTitleSelector = createSelector(
  [displayedStreamTitleSelector, selectedStateSelector, selectedRegionSelector],
  (streamTitle, selectedState, selectedRegion) => {
    if (selectedState == null) {
      return defaultTitle
    }

    if (selectedRegion == null) {
      return selectedState.properties.name
    }

    if (streamTitle != null) {
      return `${streamTitle}, (${selectedRegion.properties.state_short_name.toUpperCase()})`
    }

    return `${selectedRegion.properties.long_name}, (${selectedRegion.properties.state_short_name.toUpperCase()})`
  }
)
