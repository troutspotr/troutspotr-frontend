import find from 'lodash-es/find'
import has from 'lodash-es/has'
import isEmpty from 'lodash-es/isEmpty'
import keyBy from 'lodash-es/keyBy'
import keys from 'lodash-es/keys'
import round from 'lodash-es/round'
import sortBy from 'lodash-es/sortBy'
import values from 'lodash-es/values'
import { createSelector, createStructuredSelector } from 'reselect'
import {
  countiesDictionarySelector,
  searchTextSelector,
  selectedRegionSelector,
  viewSelector,
  hasAgreedToTermsSelector,
  tableOfContentsLoadingStatusSelector,
} from 'ui/core/Core.selectors'
import {
  getHashSelector,
  selectedStateIdSelector,
  selectedRegionIdSelector,
} from 'ui/Location.selectors'

import { getRegulationsSummarySelector } from 'ui/core/regulations/RegulationsSummary.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { IRegionState } from './Region.redux'
import { Dictionary } from 'lodash'
import { LoadingStatus } from 'coreTypes/Ui'
import { IRegionLayoutStateProps } from './Region.layout'
import { IStreamObject } from 'coreTypes/IStreamObject'
import {
  displayedCentroidDictionarySelector,
  displayedStreamCentroidDataSelector,
  regionIndexSelector,
  regulationsSelector,
  waterOpenersDictionarySelector,
  stateDataLoadingStatusSelector,
} from 'ui/routes/@usState/UsState.selectors'
import { AccessPointFeature } from '../../../../api/region/IRegionGeoJSON';

export const regionReduxStateSelector = (reduxState: IReduxState): IRegionState => reduxState.region
export const troutStreamDictionarySelector = createSelector([regionReduxStateSelector], (state): Dictionary<IStreamObject> => {
  return state.troutStreamDictionary
})

export const regionLoadingStatusSelector = createSelector(
  [regionReduxStateSelector, stateDataLoadingStatusSelector],
  (regionState, usStateLoadingStatus: LoadingStatus): LoadingStatus => {
    if (usStateLoadingStatus == LoadingStatus.Failed) {
      return LoadingStatus.Failed
    }

    if (usStateLoadingStatus === LoadingStatus.Pending) {
      return LoadingStatus.Pending
    }
    // return LoadingStatus.Pending
    return regionState.regionLoadingStatus
})

export const troutStreamSectionsSelector = createSelector([regionReduxStateSelector], state => {
  return state.troutStreamSections
})

export const restrictionSectionsSelector = createSelector([regionReduxStateSelector], state => {
  return state.restrictionSections
})

export const streamsSelector = createSelector([regionReduxStateSelector], state => {
  return state.streams
})

export const palSectionsSelector = createSelector([regionReduxStateSelector], state => {
  return state.palSections
})

export const streamAccessPointSelector = createSelector([regionReduxStateSelector], state => {
  return state.streamAccessPoint
})

export const streamCentroidsSelector = createSelector([regionReduxStateSelector], state => {
  return state.streamCentroids
})

const EMPTY_ACCESS_POINT_DICTIONARY = {}
export const streamAccessPointIdDictionarySelector = createSelector(
  streamAccessPointSelector,
  (accessPoints): Dictionary<AccessPointFeature> => {
    if (accessPoints == null) {
      return EMPTY_ACCESS_POINT_DICTIONARY
    }
    return keyBy(accessPoints.features, x => x.properties.gid)
  }
)

export const palsSelector = createSelector([regionReduxStateSelector], state => {
  return state.pals
})

export const restrictedLandsSelector = createSelector([regionReduxStateSelector], state => {
  return state.restrictedLands
})

export const hoveredStreamSelector = createSelector([regionReduxStateSelector], state => {
  return state.hoveredStream
})

export const hoveredRoadSelector = createSelector([regionReduxStateSelector], state => {
  return state.hoveredRoad
})

export const isFinishedLoadingRegion = createSelector(
  [regionLoadingStatusSelector],
  regionLoadingStatus => {
    if (regionLoadingStatus !== LoadingStatus.Success) {
      return false
    }

    return true
  }
)
const EMPTY_STREAMS = []
export const visibleTroutStreams = createSelector(
  [
    displayedCentroidDictionarySelector,
    troutStreamDictionarySelector,
    isFinishedLoadingRegion,
    waterOpenersDictionarySelector,
    regulationsSelector,
  ],
  (
    displayedDictionary,
    troutStreamDictionary,
    isRegionLoaded,
    waterOpenersDictionary,
    regulationsDictionary
  ): IStreamObject[] => {
    if (isRegionLoaded === false) {
      return EMPTY_STREAMS
    }

    if (isEmpty(displayedDictionary)) {
      return EMPTY_STREAMS
    }

    const streamArray = values(troutStreamDictionary)
    const filteredStreams = streamArray.filter(streamItem =>
      has(displayedDictionary, streamItem.stream.properties.gid)
    )
    return filteredStreams
  }
)

export const visibleTroutStreamIdsSelector = createSelector([visibleTroutStreams], visibleStreams =>
  visibleStreams.map(s => s.stream.properties.gid)
)

export const visibleTroutStreamDictionarySelector = createSelector(
  [visibleTroutStreams],
  visibleStreams => keyBy(visibleStreams, s => s.stream.properties.gid)
)

export const filterRestrictionsByTime = (now, sp) => {
  const { startTime, stopTime } = sp
  if (startTime == null || stopTime == null) {
    return true
  }
  const isInBounds = startTime < now && stopTime > now
  return isInBounds
}

export const selectedStreamObjectSelector = createSelector(
  [troutStreamDictionarySelector, displayedStreamCentroidDataSelector],
  (streamDictionary, displayedCentroid) => {
    // Assume things aren't loaded yet. see displayedStreamCentroidDataSelector for details
    if (displayedCentroid == null) {
      return null
    }

    if (has(streamDictionary, displayedCentroid.gid) === false) {
      return null
    }
    const now = new Date()
    const stream = { ...streamDictionary[displayedCentroid.gid] }
    stream.restrictions = stream.restrictions.filter(x =>
      filterRestrictionsByTime(now, x.properties)
    )
    return stream
  }
)

export const showNoResultsFoundSelector = createSelector(
  [
    searchTextSelector,
    regionLoadingStatusSelector,
    visibleTroutStreams,
    selectedStreamObjectSelector,
  ],
  (text, regionLoading, streams, selectedStreamObject) => {
    if (regionLoading !== LoadingStatus.Success) {
      return false
    }

    if (text.length === 0) {
      return false
    }

    if (isEmpty(selectedStreamObject) === false) {
      return false
    }

    if (streams.length === 0) {
      return true
    }

    return false
  }
)

const EMPTY_REGS = []
const MAGICAL_OPEN_ID = 18
interface IAsdf {
  startTime: Date
  stopTime: Date
  isFishSanctuary: boolean
  isOpenerOverride: boolean
  color: string
  restrictionId: number
  streamId: number
  shortText: string
  legalText: string
  length: number
  roundedLength?: number
}
export const getSpecialRegulationsSelector = createSelector(
  [selectedStreamObjectSelector, regulationsSelector],
  (selectedStream, regulations) => {
    if (isEmpty(selectedStream)) {
      return EMPTY_REGS
    }

    if (isEmpty(regulations)) {
      return EMPTY_REGS
    }
    const specialRegulationsDictionary = selectedStream.restrictions
      .map((r): IAsdf => {
        const {
          stream_gid,
          restriction_id,
          start,
          stop,
          end_time,
          start_time,
          color,
        } = r.properties
        const regulation = regulations[restriction_id]
        if (regulation == null) {
          return null
        }

        const isFishSanctuary = regulation.legalText.toLowerCase().indexOf('sanctuary') >= 0
        const isOpenerOverride = regulation.id === MAGICAL_OPEN_ID
        const length = stop - start
        // Let roundedLength = round(length, 1)
        const { shortText, legalText } = regulation
        const result: IAsdf = {
          startTime: start_time,
          stopTime: end_time,
          isFishSanctuary: isFishSanctuary,
          isOpenerOverride: isOpenerOverride,
          color: color,
          restrictionId: restriction_id,
          streamId: stream_gid,
          shortText: shortText,
          legalText: legalText,
          length: length,
        }

        return result
      })
      .reduce((dictionary, item): Dictionary<IAsdf> => {
        if (has(dictionary, item.restrictionId)) {
          dictionary[item.restrictionId].length += item.length
          return dictionary
        }

        dictionary[item.restrictionId] = item
        return dictionary
      }, {}) as Dictionary<IAsdf>

    const specialRegulationsArray = values(specialRegulationsDictionary)

    specialRegulationsArray.forEach(reg => {
      reg.roundedLength = reg.length < 1.0 ? round(reg.length, 2) : round(reg.length, 1)
    })

    return specialRegulationsArray
  }
)

export const getSelectedRoadSelector = createSelector(
  [selectedStreamObjectSelector, getHashSelector],
  (selectedStreamObject, hash) => {
    if (isEmpty(selectedStreamObject)) {
      return null
    }

    if (isEmpty(selectedStreamObject.accessPoints)) {
      return null
    }

    if (isEmpty(hash)) {
      return null
    }

    const accessPoint = find(selectedStreamObject.accessPoints, ap => ap.properties.slug === hash)
    if (accessPoint == null) {
      return null
    }
    return accessPoint
  }
)

export const filterRestrictionsByCurrentTime = specialRegulations => {
  if (isEmpty(specialRegulations)) {
    return EMPTY_REGS
  }
  // TODO: should I be creating state in selectors?
  // No... but whatever.
  const now = new Date()
  const inSeasonRegs = specialRegulations.filter(x => filterRestrictionsByTime(now, x))
  return inSeasonRegs
}

export const getSpecialRegulationsCurrentSeasonSelector = createSelector(
  [getSpecialRegulationsSelector],
  filterRestrictionsByCurrentTime
)

const EMPTY_COUNTIES_ARRAY = []
export const getCountyListSelector = createSelector(
  [
    regionIndexSelector,
    displayedCentroidDictionarySelector,
    countiesDictionarySelector,
    selectedRegionSelector,
    troutStreamDictionarySelector,
    visibleTroutStreamDictionarySelector,
    getRegulationsSummarySelector,
  ],
  (
    regionIndex,
    displayedCentroidDictionary,
    countiesDictionary,
    selectedRegion,
    troutStreamDictionary,
    visibleTroutStreamDictionary,
    getRegulations
  ) => {
    if (isEmpty(selectedRegion)) {
      return EMPTY_COUNTIES_ARRAY
    }

    if (isEmpty(troutStreamDictionary)) {
      return EMPTY_COUNTIES_ARRAY
    }

    if (isEmpty(visibleTroutStreamDictionary)) {
      return EMPTY_COUNTIES_ARRAY
    }

    const regionName = selectedRegion.properties.name.toLowerCase()
    if (has(regionIndex, regionName) === false) {
      return EMPTY_COUNTIES_ARRAY
    }

    const countiesInSelectedRegionDictionary = regionIndex[regionName]
    const countyIdsInSelectedRegion = keys(countiesInSelectedRegionDictionary)
    const countyObjects = countyIdsInSelectedRegion.map(id => {
      const streamIdsInRegion = countiesInSelectedRegionDictionary[id]
      const county = countiesDictionary[id]
      const { gid, name, stream_count } = county.properties
      const visibleStreamIdsInCounty = streamIdsInRegion.filter(streamId =>
        has(visibleTroutStreamDictionary, streamId)
      )
      const visibleStreamsInCounty = visibleStreamIdsInCounty.map(
        streamId => visibleTroutStreamDictionary[streamId]
      )
      const byOpenStatus = stream => {
        const summary = getRegulations(stream)
        if (summary.isOpenSeason) {
          return 0
        }

        if (summary.hasRegulationThatOverridesOpenSeason && summary.isOpenSeason === false) {
          return 100
        }

        return 10000
      }

      const byName = stream => stream.stream.properties.name
      try {
        const countyList = {
          gid: gid,
          name: name,
          streamCount: stream_count,
          streams: sortBy(visibleStreamsInCounty, [byOpenStatus, byName]),
        }
        return countyList
      } catch (e) {
        console.error(e) // eslint-disable-line
        console.error(visibleStreamsInCounty) // eslint-disable-line
      }

      return null
    })
    const filteredCountyObjects = [...countyObjects]
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(x => x.streams.length > 0)
    if (filteredCountyObjects.length === 0) {
      // Prevent further calculations by other selectors
      return EMPTY_COUNTIES_ARRAY
    }

    return filteredCountyObjects
  }
)

export const getSvgMinimapStateProps = createStructuredSelector<
  IReduxState,
  IRegionLayoutStateProps
>({
  view: viewSelector,
  selectedState: selectedStateIdSelector,
  selectedRegion: selectedRegionIdSelector,
  regionLoadingStatus: regionLoadingStatusSelector,
  hasAgreedToTerms: hasAgreedToTermsSelector,
  tableOfContentsLoadingStatus: tableOfContentsLoadingStatusSelector,
})
