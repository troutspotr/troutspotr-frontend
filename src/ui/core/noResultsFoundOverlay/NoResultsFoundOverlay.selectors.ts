import isEmpty from 'lodash-es/isEmpty'
import { createSelector } from 'reselect'
import * as coreSelectors from 'ui/core/Core.selectors'
import * as regionSelectors from 'ui/routes/@usState/@region/Region.selectors'
import * as stateSelectors from 'ui/routes/@usState/UsState.selectors'

const EMPTY_STREAMS = []

export const availableStreams = createSelector(
  [
    coreSelectors.selectedStateSelector,
    coreSelectors.selectedRegionSelector,
    stateSelectors.streamCentroidsSelector,
    regionSelectors.streamsSelector,
  ],
  (selectedState, selectedRegion, displayedCentroids, availableTroutStreams) => {
    const isRegionSelected = isEmpty(selectedState) === false && isEmpty(selectedRegion) === false
    if (isRegionSelected === false) {
      return displayedCentroids
    }

    if (availableTroutStreams == null || isEmpty(availableTroutStreams.features)) {
      return EMPTY_STREAMS
    }
    return availableTroutStreams.features
  }
)

export const isDisplayed = createSelector(
  [
    coreSelectors.selectedStateSelector,
    coreSelectors.selectedRegionSelector,
    coreSelectors.hasAgreedToTermsSelector,
    coreSelectors.isSearchingSelector,
    stateSelectors.displayedCentroidsSelector,
    regionSelectors.visibleTroutStreams,
  ],
  (
    selectedState,
    selectedRegion,
    hasAgreedToTerms,
    isSearching,
    displayedStateTroutStreams,
    displayedRegionTroutStreams
  ) => {
    if (hasAgreedToTerms === false) {
      return false
    }

    if (isSearching === false) {
      return false
    }

    const isRegionSelected = isEmpty(selectedState) === false && isEmpty(selectedRegion) === false
    const streams = isRegionSelected ? displayedRegionTroutStreams : displayedStateTroutStreams

    return isEmpty(streams)
  }
)
