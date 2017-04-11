import { createSelector } from 'reselect'
import { getWatersObjectSelector } from 'ui/@state/State.selectors'
/* eslint-disable camelcase */
export const getRegulationsSummarySelector = createSelector(
  [getWatersObjectSelector],
  (watersObject) => {
    return (streamObject) => {
      let { stream } = streamObject
      let now = new Date()
      let watersId = stream.properties.water_id
      let water = watersObject(watersId)
      let openers = water.openSeasons
      let closestOpener = water.openers == null
        ? null
        : water.openers.sort(x => x.start_time)[water.openers.length - 1]
      let isOpenSeason = openers.length >= 1
      let openSeasonOverrides = streamObject.restrictions.filter(restriction => {
        let { end_time, start_time } = restriction.properties
        if (end_time == null || start_time == null) {
          return false
        }

        let isWithinBounds = now < end_time && now >= start_time
        return isWithinBounds
      })

      let hasRegulationThatOverridesOpenSeason = openSeasonOverrides.length >= 1

      return {
        hasRegulationThatOverridesOpenSeason,
        isOpenSeason,
        openSeasonOverrides,
        openers,
        closestOpener
      }
    }
  })
