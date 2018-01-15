import { createSelector } from 'reselect'
import { searchTextSelector, selectedStreamIdSelector } from 'ui/core/Core.selectors'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import { every, has, isEmpty, keyBy, reduce } from 'lodash'
export const regionIndexSelector = state => state.state.regionIndex
export const regulationsSelector = state => state.state.regulations
export const roadTypesSelector = state => state.state.roadTypes
export const roadTypeDictionarySelector = state => state.state.roadTypesDictionary
export const palTypesSelector = state => state.state.palTypes
export const streamCentroidsStateSelector = state => state.state.streamCentroids
export const stateDataLoadingStatusSelector = state => state.state.stateDataLoadingStatus
export const slugDictionarySelector = state => state.state.slugDictionary
export const streamIdDictionarySelector = state => state.state.streamIdDictionary
export const waterOpenersDictionaryStateSelector = state => state.state.waterOpeners
/* eslint-disable camelcase */
export const waterOpenersDictionarySelector = createSelector(
  [waterOpenersDictionaryStateSelector],
  waterDictionary => {
    const now = new Date()
    const watersLookup = reduce(
      waterDictionary,
      (dictionary, water, index) => {
        const key = water.id
        const openSeasons = water.openers.filter(opener => {
          const { end_time, start_time } = opener
          const isWithinBounds = now < end_time && now >= start_time
          return isWithinBounds
        })

        const isOpenSeason = openSeasons.length >= 1

        const newObject = { ...water, isOpenSeason, openSeasons }
        dictionary[key] = newObject
        return dictionary
      },
      {}
    )

    return watersLookup
  }
)

const EMPTY_FUNCTION = () => null
export const getWatersObjectSelector = createSelector(
  [waterOpenersDictionarySelector],
  waterDictionary => {
    if (waterDictionary == null) {
      return EMPTY_FUNCTION
    }

    return waterId => waterDictionary[waterId]
  }
)

export const streamCentroidsSelector = createSelector(
  [stateDataLoadingStatusSelector, streamCentroidsStateSelector],
  (isLoading, streamCentroids) => {
    if (isLoading !== LOADING_CONSTANTS.IS_SUCCESS) {
      return emptyCentroids
    }

    return streamCentroids
  }
)

const emptyCentroids = []
export const displayedCentroidsSelector = createSelector(
  [searchTextSelector, streamCentroidsSelector],
  (searchText, streamCentroids) => {
    if (isEmpty(searchText)) {
      return streamCentroids
    }

    const tokens = searchText
      .toLocaleLowerCase()
      .split(' ')
      .filter(x => x.length > 0)

    const filteredCentroids = streamCentroids.filter(centroid => {
      let { altName } = centroid
      const { name } = centroid
      altName = altName || ''
      const isMatch = every(
        tokens,
        token =>
          name.toLocaleLowerCase().indexOf(token) >= 0 ||
          altName.toLocaleLowerCase().indexOf(token) >= 0
      )
      return isMatch
    })

    return filteredCentroids
  }
)

export const displayedCentroidDictionarySelector = createSelector(
  [displayedCentroidsSelector],
  displayedCentroids => {
    const dictionary = keyBy(displayedCentroids, x => x.gid)
    return dictionary
  }
)

export const displayedStreamCentroidDataSelector = createSelector(
  [selectedStreamIdSelector, slugDictionarySelector, stateDataLoadingStatusSelector],
  (selectedStreamId, slugDictionary, stateDataLoadingStatus) => {
    if (stateDataLoadingStatus !== LOADING_CONSTANTS.IS_SUCCESS) {
      return null
    }

    if (has(slugDictionary, selectedStreamId)) {
      return slugDictionary[selectedStreamId]
    }

    return null
  }
)

export const displayedStreamTitleSelector = createSelector(
  [displayedStreamCentroidDataSelector, stateDataLoadingStatusSelector],
  (displayedStreamCentroid, stateDataLoadingStatus) => {
    if (stateDataLoadingStatus !== LOADING_CONSTANTS.IS_SUCCESS) {
      return null
    }

    if (isEmpty(displayedStreamCentroid)) {
      return null
    }

    return displayedStreamCentroid.name
  }
)

export const displayedStreamCentroidSelector = createSelector(
  [displayedStreamCentroidDataSelector, stateDataLoadingStatusSelector],
  (displayedStreamCentroid, stateDataLoadingStatus) => {
    if (stateDataLoadingStatus !== LOADING_CONSTANTS.IS_SUCCESS) {
      return null
    }

    if (isEmpty(displayedStreamCentroid)) {
      return null
    }

    return displayedStreamCentroid.centroid
  }
)
