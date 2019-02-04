import { createSelector } from 'reselect'

export const loadingMessageTitleSelector = createSelector(
  [() => null],
  () => {
    const regionName = 'Region Name'
    const stateName = 'MN'
    return `Loading ${regionName}, ${stateName}...`
  }
)