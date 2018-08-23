import { createSelector } from 'reselect';
import { isExpandedSelector } from '../header/minimap/Minimap.selectors';

export const isPageLegendShownSelector = createSelector(
  isExpandedSelector,
  (isExpanded: boolean): boolean => {
    return isExpanded
  }
)

export const cachedRegionsTextSelector = createSelector(
  () => {},
  (): string => {
    return '✅: Region is cached and viewable offline.'
  }
)