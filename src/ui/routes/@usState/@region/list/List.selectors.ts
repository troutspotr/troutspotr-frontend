import { createSelector } from 'reselect'
import { isListVisible } from 'ui/core/Core.selectors'
import { selectedStreamIdSelector, selectedRegionIdSelector } from '../../../../Location.selectors'

export const isListViewed = createSelector(
  [isListVisible, selectedStreamIdSelector, selectedRegionIdSelector],
  (isListSelected, streamId, regionId) => {
    const isListWithSelectedRegionButNoSpecificStream =
      isListSelected && streamId == null && regionId != null
    return isListWithSelectedRegionButNoSpecificStream
  }
)
