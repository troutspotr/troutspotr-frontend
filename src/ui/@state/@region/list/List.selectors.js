import {createSelector} from 'reselect'
import {isListVisible, selectedRegionIdSelector, selectedStreamIdSelector} from 'ui/core/Core.selectors'

export const isListViewed = createSelector(
  [
    isListVisible,
    selectedStreamIdSelector,
    selectedRegionIdSelector,
  ],
  (isListSelected, streamId, regionId) => {
    const isListWithSelectedRegionButNoSpecificStream = isListSelected && streamId == null && regionId != null
    return isListWithSelectedRegionButNoSpecificStream
  })
