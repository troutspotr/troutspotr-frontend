import { createSelector } from 'reselect'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import { isEmpty, every, values, has } from 'lodash'
import { displayedCentroidDictionarySelector, displayedStreamCentroidDataSelector } from 'ui/@state/State.selectors'
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
