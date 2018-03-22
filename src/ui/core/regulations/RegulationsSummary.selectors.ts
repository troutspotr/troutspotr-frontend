/* eslint-disable camelcase */
import find from 'lodash-es/find'
import { createSelector } from 'reselect'
import { getWatersObjectSelector } from 'ui/routes/@usState/UsState.selectors'
import { IOpener } from 'coreTypes/state/IWaterOpener'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { RestrictionFeature } from '../../../api/region/IRegionGeoJSON'

export interface IMiscRegsProperties {
  hasRegulationThatOverridesOpenSeason: boolean
  isOpenSeason: boolean
  openSeasonOverrides: ReadonlyArray<RestrictionFeature>
  openers: IOpener[]
  closestOpener: IOpener
}
const now = new Date()
const getIsWithinBonds = props => {
  const { start_time, end_time } = props
  return now < end_time && now >= start_time
}

/* eslint-disable camelcase */
export const getRegulationsSummarySelector = createSelector(
  [getWatersObjectSelector],
  watersObject => (streamObject: IStreamObject): IMiscRegsProperties => {
    const { stream } = streamObject

    const watersId = stream.properties.water_id
    const water = watersObject(watersId)
    const openers = water.openSeasons
    let closestOpener = null
    if (water.openers != null) {
      closestOpener = find(water.openers, x => x.start_time > now)
    }
    const isOpenSeason = openers.length >= 1
    const openSeasonOverrides = streamObject.restrictions.filter(restriction => {
      const { end_time, start_time } = restriction.properties
      if (end_time == null || start_time == null) {
        return false
      }

      const isWithinBounds = getIsWithinBonds(restriction.properties)
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
  }
)
