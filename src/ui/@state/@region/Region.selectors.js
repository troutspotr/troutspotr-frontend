import { createSelector } from 'reselect'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import { searchTextSelector, countiesDictionarySelector, selectedRegionSelector } from 'ui/core/Core.selectors'
import { getHashSelector } from 'ui/Location.selectors'
import { isEmpty, values, has, round, find, keys, sortBy, keyBy } from 'lodash'
import { displayedCentroidDictionarySelector,
  displayedStreamCentroidDataSelector,
  regulationsSelector, waterOpenersDictionarySelector,
  regionIndexSelector } from 'ui/@state/State.selectors'
export const troutStreamDictionarySelector = state => state.region.troutStreamDictionary
export const regionLoadingStatusSelector = state => state.region.regionLoadingStatus

export const troutStreamSectionsSelector = state => state.region.troutStreamSections
export const restrictionSectionsSelector = state => state.region.restrictionSections
export const streamsSelector = state => state.region.streams
export const palSectionsSelector = state => state.region.palSections
export const streamAccessPointSelector = state => state.region.streamAccessPoint
export const palsSelector = state => state.region.pals
export const hoveredStreamSelector = state => state.region.hoveredStream
export const hoveredRoadSelector = state => state.region.hoveredRoad

export const isFinishedLoadingRegion = createSelector(
  [regionLoadingStatusSelector],
  (regionLoadingStatus) => {
    if (regionLoadingStatus !== LOADING_CONSTANTS.IS_SUCCESS) {
      return false
    }

    return true
  })
const EMPTY_STREAMS = []
export const visibleTroutStreams = createSelector(
  [
    displayedCentroidDictionarySelector,
    troutStreamDictionarySelector,
    isFinishedLoadingRegion,
    waterOpenersDictionarySelector,
    regulationsSelector
  ],
  (
    displayedDictionary,
    troutStreamDictionary,
    isRegionLoaded,
    waterOpenersDictionary,
    regulationsDictionary
  ) => {
    if (isRegionLoaded === false) {
      return EMPTY_STREAMS
    }

    if (isEmpty(displayedDictionary)) {
      return EMPTY_STREAMS
    }

    let streamArray = values(troutStreamDictionary)
    let filteredStreams = streamArray.filter(streamItem => has(displayedDictionary, streamItem.stream.properties.gid))
    return filteredStreams
  })

export const visibleTroutStreamIdsSelector = createSelector(
  [visibleTroutStreams],
  (visibleStreams) => {
    return visibleStreams.map(s => s.stream.properties.gid)
  })

export const visibleTroutStreamDictionarySelector = createSelector(
  [visibleTroutStreams],
  (visibleStreams) => {
    return keyBy(visibleStreams, s => s.stream.properties.gid)
  })

export const selectedStreamObjectSelector = createSelector(
  [troutStreamDictionarySelector, displayedStreamCentroidDataSelector],
  (streamDictionary, displayedCentroid) => {
    // assume things aren't loaded yet. see displayedStreamCentroidDataSelector for details
    if (displayedCentroid == null) {
      return null
    }

    if (has(streamDictionary, displayedCentroid.gid) === false) {
      return null
    }

    return streamDictionary[displayedCentroid.gid]
  })

export const showNoResultsFoundSelector = createSelector(
  [searchTextSelector, regionLoadingStatusSelector, visibleTroutStreams, selectedStreamObjectSelector],
  (text, regionLoading, streams, selectedStreamObject) => {
    if (regionLoading !== LOADING_CONSTANTS.IS_SUCCESS) {
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
  })

const EMPTY_REGS = []
const MAGICAL_FISH_SANCTUARY_ID = 7
const MAGICAL_OPEN_ID = 18
export const getSpecialRegulationsSelector = createSelector(
  [selectedStreamObjectSelector, regulationsSelector],
  (selectedStream, regulations) => {
    if (isEmpty(selectedStream)) {
      return EMPTY_REGS
    }

    if (isEmpty(regulations)) {
      return EMPTY_REGS
    }

    let specialRegulationsDictionary = selectedStream.restrictions.map(r => {
      let { stream_gid, restriction_id, start, stop, end_time, start_time } = r.properties
      let regulation = regulations[restriction_id]
      if (regulation == null) {
        // console.warn('found null regulation for id ' + restriction_id)
        return null
      }
      let isFishSanctuary = regulation.id === MAGICAL_FISH_SANCTUARY_ID
      let isOpenerOverride = regulation.id === MAGICAL_OPEN_ID
      let length = stop - start
      // let roundedLength = round(length, 1)
      let { shortText, legalText } = regulation
      return {
        startTime: start_time,
        stopTime: end_time,
        isFishSanctuary,
        isOpenerOverride,
        restrictionId: restriction_id,
        streamId: stream_gid,
        shortText,
        legalText,
        length
      }
    }).reduce((dictionary, item) => {
      if (has(dictionary, item.restrictionId)) {
        dictionary[item.restrictionId].length += item.length
        return dictionary
      }

      dictionary[item.restrictionId] = item
      return dictionary
    }, {})

    let specialRegulationsArray = values(specialRegulationsDictionary)

    specialRegulationsArray.forEach(reg => {
      reg.roundedLength = reg.length < 1.0
        ? round(reg.length, 2)
        : round(reg.length, 1)
    })

    return specialRegulationsArray
  })

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

    let accessPoint = find(selectedStreamObject.accessPoints, ap => ap.properties.slug === hash)
    if (accessPoint == null) {
      return null
    }
    return accessPoint
  })

export const getSpecialRegulationsCurrentSeasonSelector = createSelector(
  [getSpecialRegulationsSelector],
  (specialRegulations) => {
    if (isEmpty(specialRegulations)) {
      return EMPTY_REGS
    }
    // TODO: should I be creating state in selectors?
    // no... but whatever.
    let now = new Date()
    let inSeasonRegs = specialRegulations.filter(sp => {
      let { startTime, stopTime } = sp
      if (startTime == null || stopTime == null) {
        return true
      }
      let isInBounds = startTime < now && stopTime > now
      return isInBounds
    })
    return inSeasonRegs
  })

const EMPTY_COUNTIES_ARRAY = []
export const getCountyListSelector = createSelector(
  [
    regionIndexSelector,
    displayedCentroidDictionarySelector,
    countiesDictionarySelector,
    selectedRegionSelector,
    troutStreamDictionarySelector,
    visibleTroutStreamDictionarySelector
  ],
  (
    regionIndex,
    displayedCentroidDictionarySelector,
    countiesDictionary,
    selectedRegion,
    troutStreamDictionary,
    visibleTroutStreamDictionary
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

    let regionName = selectedRegion.properties.name.toLowerCase()
    if (has(regionIndex, regionName) === false) {
      return EMPTY_COUNTIES_ARRAY
    }

    let countiesInSelectedRegionDictionary = regionIndex[regionName]
    let countyIdsInSelectedRegion = keys(countiesInSelectedRegionDictionary)
    let countyObjects = countyIdsInSelectedRegion.map(id => {
      let streamIdsInRegion = countiesInSelectedRegionDictionary[id]
      let county = countiesDictionary[id]
      let { gid, name, stream_count } = county.properties
      let visibleStreamIdsInCounty = streamIdsInRegion.filter(streamId => has(visibleTroutStreamDictionary, streamId))
      let visibleStreamsInCounty = visibleStreamIdsInCounty.map(streamId => visibleTroutStreamDictionary[streamId])
      try {
        let countyList = {
          gid,
          name,
          streamCount: stream_count,
          streams: sortBy(visibleStreamsInCounty, x => x.stream.properties.name)
        }
        return countyList
      } catch (e) {
        console.log(e)
        console.log(visibleStreamsInCounty)
      }
    })

    let filteredCountyObjects = countyObjects.filter(x => x.streams.length > 0)
    if (filteredCountyObjects.length === 0) {
      // prevent further calculations by other selectors
      return EMPTY_COUNTIES_ARRAY
    }

    return filteredCountyObjects
  })
