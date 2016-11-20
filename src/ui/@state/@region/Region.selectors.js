import { createSelector } from 'reselect'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import { isEmpty, every, values, has } from 'lodash'
import { displayedCentroidDictionarySelector } from 'ui/@state/State.selectors'
export const troutStreamDictionarySelector = state => state.region.troutStreamDictionary
export const regionLoadingStatusSelector = state => state.region.regionLoadingStatus


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
    console.log('lots of work')
    return filteredStreams
  })
