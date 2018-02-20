import { createSelector } from 'reselect'
import { searchTextSelector, selectedStreamIdSelector } from 'ui/core/Core.selectors'
import { Loading } from 'ui/core/LoadingConstants'
import every from 'lodash-es/every'
import has from 'lodash-es/has'
import isEmpty from 'lodash-es/isEmpty'
import keyBy from 'lodash-es/keyBy'
import reduce from 'lodash-es/reduce'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
export const regionIndexSelector = (state: IReduxState) => state.usState.regionIndex
export const regulationsSelector = (state: IReduxState) => state.usState.regulations
export const roadTypesSelector = (state: IReduxState) => state.usState.roadTypes
export const roadTypeDictionarySelector = (state: IReduxState) => state.usState.roadTypesDictionary
export const palTypesSelector = (state: IReduxState) => state.usState.palTypes
export const streamCentroidsStateSelector = (state: IReduxState) => state.usState.streamCentroids
export const stateDataLoadingStatusSelector = (state: IReduxState) =>
  state.usState.stateDataLoadingStatus
export const slugDictionarySelector = (state: IReduxState) => state.usState.slugDictionary
export const streamIdDictionarySelector = (state: IReduxState) => state.usState.streamIdDictionary
export const waterOpenersDictionaryStateSelector = (state: IReduxState) =>
  state.usState.waterOpeners
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
    if (isLoading !== Loading.Success) {
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
    if (stateDataLoadingStatus !== Loading.Success) {
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
    if (stateDataLoadingStatus !== Loading.Success) {
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
    if (stateDataLoadingStatus !== Loading.Success) {
      return null
    }

    if (isEmpty(displayedStreamCentroid)) {
      return null
    }

    return displayedStreamCentroid.centroid
  }
)
