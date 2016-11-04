import { createSelector } from 'reselect'

export const isExpandedSelector = state => {
  return state.minimap.isExpanded
}
