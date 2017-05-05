import { createSelector } from 'reselect'
import { isListVisible, selectedStreamIdSelector, selectedRegionIdSelector } from 'ui/core/Core.selectors'

export const isListViewed = createSelector(
  [ isListVisible, selectedStreamIdSelector, selectedRegionIdSelector ],
  (isListSelected, streamId, regionId) => {
    let isListWithSelectedRegionButNoSpecificStream = isListSelected && streamId == null && regionId != null
    return isListWithSelectedRegionButNoSpecificStream
  })
