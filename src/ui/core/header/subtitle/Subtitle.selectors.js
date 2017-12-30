import {createSelector} from 'reselect'
import {isSearchVisibleSelector} from '../search/Search.selectors'
import {isRootPageSelector} from 'ui/Location.selectors'
import {selectedRegionSelector, selectedStateSelector} from 'ui/core/Core.selectors'
import {isEmpty, toUpper} from 'lodash'
export const isTitleVisibleSelector = createSelector([isSearchVisibleSelector], (isSearchVisible) => !isSearchVisibleSelector)

const PLACEHOLDER_TITLE = ''
const EN_DASH = '–'
const WELCOME_TITLE = 'Welcome to TroutSpotr'
// Const SELECT_REGION = 'Select Region'
export const subtitleSelector = createSelector(
  [
    isRootPageSelector,
    selectedRegionSelector,
    selectedStateSelector,
  ],
  (isRootPage, selectedRegion, selectedState) => {
    if (isRootPage) {
      return WELCOME_TITLE
    }

    const isOnlyStateSelected = selectedState != null && selectedRegion == null
    if (isOnlyStateSelected) {
      const state = selectedState.properties.name
      return `TroutSpotr ${EN_DASH} ${state}.`
    }

    const isBothStateAndRegionSelected = !isEmpty(selectedState) && !isEmpty(selectedRegion)
    if (isBothStateAndRegionSelected) {
      const state = toUpper(selectedState.properties.short_name)
      const region = selectedRegion.properties.long_name
      return `${state}, ${region}`
    }

    return PLACEHOLDER_TITLE
  })
