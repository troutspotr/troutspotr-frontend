import { createSelector } from 'reselect';
import { isExpandedSelector } from '../header/minimap/Minimap.selectors';

export const isPageLegendShownSelector = createSelector(
  isExpandedSelector,
  (isExpanded: boolean): boolean => {
    return isExpanded
  }
)

export const cachedRegionsTextSelector = createSelector(
  // tslint:disable-next-line:no-empty
  () => {},
  (): string => {
    return '✅: Region is cached and viewable offline.'
  }
)
