import {createSelector} from 'reselect'
import {getWatersObjectSelector} from 'ui/@state/State.selectors'
/* eslint-disable camelcase */
export const getRegulationsSummarySelector = createSelector(
  [getWatersObjectSelector],
  (watersObject) => (streamObject) => {
    const {stream} = streamObject
    const now = new Date()
    const watersId = stream.properties.water_id
    const water = watersObject(watersId)
    const openers = water.openSeasons
    const closestOpener = water.openers == null
      ? null
      : water.openers.sort((x) => x.start_time)[water.openers.length - 1]
    const isOpenSeason = openers.length >= 1
    const openSeasonOverrides = streamObject.restrictions.filter((restriction) => {
      const {end_time, start_time} = restriction.properties
      if (end_time == null || start_time == null) {
        return false
      }

      const isWithinBounds = now < end_time && now >= start_time
      return isWithinBounds
    })

    const hasRegulationThatOverridesOpenSeason = openSeasonOverrides.length >= 1

    return {
      hasRegulationThatOverridesOpenSeason,
      isOpenSeason,
      openSeasonOverrides,
      openers,
      closestOpener,
    }
  })
