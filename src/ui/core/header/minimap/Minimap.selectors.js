import { createSelector } from 'reselect'
import { waterOpenersDictionarySelector } from 'ui/@state/State.selectors'
import { has } from 'lodash'
export const isExpandedSelector = state => {
  return state.minimap.isExpanded
}
/* eslint-disable camelcase */
export const getIsOpenSelector = createSelector(
  [waterOpenersDictionarySelector],
  (waterOpenersDictionary) => {
    if (waterOpenersDictionary == null) {
      return () => false
    }

    return (waterId) => {
      if (has(waterOpenersDictionary, waterId) === false) {
        return false
      }

      return waterOpenersDictionary[waterId].isOpenSeason
    }
  })
