import { createSelector } from 'reselect'

export const viewSelector = state => {
  return state.core.view
}
