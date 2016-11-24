import { createSelector } from 'reselect'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import { selectedStateIdSelector,
  selectedRegionIdSelector,
  viewSelector,
  searchTextSelector } from 'ui/core/Core.selectors'

import { isEmpty, every, values, has, round } from 'lodash'
import { displayedCentroidDictionarySelector,
  displayedStreamCentroidDataSelector,
  regulationsSelector } from 'ui/@state/State.selectors'
export const troutStreamDictionarySelector = state => state.region.troutStreamDictionary
export const regionLoadingStatusSelector = state => state.region.regionLoadingStatus

export const troutStreamSectionsSelector = state => state.region.troutStreamSections
export const restrictionSectionsSelector = state => state.region.restrictionSections
export const streamsSelector = state => state.region.streams
export const palSectionsSelector = state => state.region.palSections
export const streamAccessPointSelector = state => state.region.streamAccessPoint
export const palsSelector = state => state.region.pals

const EMPTY_STREAMS = []
export const visibleTroutStreams = createSelector(
  [displayedCentroidDictionarySelector, troutStreamDictionarySelector, regionLoadingStatusSelector],
  (displayedDictionary, troutStreamDictionary, loadingStatus) => {
    if (loadingStatus !== LOADING_CONSTANTS.IS_SUCCESS) {
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
      let { stream_gid, restriction_id, start, stop } = r.properties
      let regulation = regulations[restriction_id]
      if (regulation == null) {
        console.warn('found null regulation for id ' + restriction_id)
        return null
      }
      let isFishSanctuary = regulation.id === MAGICAL_FISH_SANCTUARY_ID
      let length = stop - start
      // let roundedLength = round(length, 1)
      let { startTime, stopTime, shortText, legalText } = regulation
      return {
        startTime: new Date(startTime),
        stopTime: new Date(stopTime),
        // roundedLength: roundedLength,
        isFishSanctuary,
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
