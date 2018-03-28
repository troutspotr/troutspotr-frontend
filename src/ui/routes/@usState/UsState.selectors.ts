import every from 'lodash-es/every'
import has from 'lodash-es/has'
import isEmpty from 'lodash-es/isEmpty'
import keyBy from 'lodash-es/keyBy'
import reduce from 'lodash-es/reduce'
import { createSelector, createStructuredSelector } from 'reselect'
import { searchTextSelector } from 'ui/core/Core.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { IUsStateReduxState } from './UsState.redux'
import { LoadingStatus } from 'coreTypes/Ui'
import { selectedStreamIdSelector } from '../../Location.selectors'
import { selectedStateIdSelector } from 'ui/Location.selectors'
import { IUsStateComponentStateProps } from './UsState.component'
const emptyCentroids = []
export const usStateReduxStateSelector = (reduxState: IReduxState): IUsStateReduxState =>
  reduxState.usState

export const regionIndexSelector = createSelector(usStateReduxStateSelector, x => x.regionIndex)

export const regulationsSelector = createSelector(usStateReduxStateSelector, x => x.regulations)

export const roadTypesSelector = createSelector(usStateReduxStateSelector, x => x.roadTypes)

export const roadTypeDictionarySelector = createSelector(
  [usStateReduxStateSelector],
  x => x.roadTypesDictionary
)

export const palTypesSelector = createSelector(usStateReduxStateSelector, x => x.palTypes)

export const streamCentroidsStateSelector = createSelector(
  usStateReduxStateSelector,
  x => x.streamCentroids
)

export const stateDataLoadingStatusSelector = createSelector(
  usStateReduxStateSelector,
  x => x.stateDataLoadingStatus
)

export const slugDictionarySelector = createSelector(
  usStateReduxStateSelector,
  x => x.slugDictionary
)

export const streamIdDictionarySelector = createSelector(
  usStateReduxStateSelector,
  x => x.streamIdDictionary
)

export const waterOpenersDictionaryStateSelector = createSelector(
  usStateReduxStateSelector,
  x => x.waterOpeners
)

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
    if (isLoading !== LoadingStatus.Success) {
      return emptyCentroids
    }

    return streamCentroids
  }
)

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
      const { altName } = centroid
      const { name } = centroid
      const safeAltName = altName || ''
      const isMatch = every(
        tokens,
        token =>
          name.toLocaleLowerCase().indexOf(token) >= 0 ||
          safeAltName.toLocaleLowerCase().indexOf(token) >= 0
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
    if (stateDataLoadingStatus !== LoadingStatus.Success) {
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
    if (stateDataLoadingStatus !== LoadingStatus.Success) {
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
    if (stateDataLoadingStatus !== LoadingStatus.Success) {
      return null
    }

    if (isEmpty(displayedStreamCentroid)) {
      return null
    }

    return displayedStreamCentroid.centroid
  }
)

export const usStatePropertiesSelector = createStructuredSelector<
  IReduxState,
  IUsStateComponentStateProps
>({
  selectedState: selectedStateIdSelector,
})
