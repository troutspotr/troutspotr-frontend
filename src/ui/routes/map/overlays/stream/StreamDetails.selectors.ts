import { createSelector, createStructuredSelector } from 'reselect'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
import { IStreamObject } from 'coreTypes/IStreamObject';
import { AccessPointFeature } from 'api/region/IRegionGeoJSON';
import { IReduxState } from 'ui/redux/Store.redux.rootReducer';
import { IStreamDetailsComponentProps } from './StreamDetails.component';
import { WaterbodyStatus, IOpener } from 'coreTypes/state/IWaterOpener'
import { timeSelector } from 'ui/core/Core.selectors'
// {
//   currentOpener: IOpener,
//   nextOpener: IOpener,
// }
export interface IReleventOpeners {
  currentOpener: IOpener | null,
  nextOpener: IOpener | null,
}

const EMPTY_OPENER_WINDOW: IReleventOpeners = {
  currentOpener: null,
  nextOpener: null,
}
export const getReleventStreamOpenersForDate = (openers: ReadonlyArray<IOpener>, time: Date): IReleventOpeners => {
  if (openers == null || openers.length === 0) {
    return EMPTY_OPENER_WINDOW
  }

  const currentOpenerIndex = openers.findIndex(opener => {
    const isWithinBounds = opener.start_time <= time && opener.end_time > time
    if (isWithinBounds) {
      // this is the simplest case: this opener applies within this time and that's all there is to it
      return true
    }

    const isInsideOfSeasonThatNeverEnds = opener.start_time <= time && opener.end_time == null
    if (isInsideOfSeasonThatNeverEnds) {
      // some seasons never end like IA's open season, and that's fine.
      return true
    }

    return false
  })

  const currentOpener = currentOpenerIndex >= 0
    ? openers[currentOpenerIndex]
    : null
  
  if (currentOpener != null) {
    // in this case, we're just trying to determine the next opener
    const isCurrentOpenerTheLastKnownOpener = currentOpenerIndex + 1 === openers.length
    const nextOpener = isCurrentOpenerTheLastKnownOpener
      ? null
      : openers[currentOpenerIndex + 1]
    return {
      currentOpener: currentOpener,
      nextOpener: nextOpener
    }
  }

  const nextOpenerIndex = openers.findIndex(opener => {
    return opener.end_time != null && opener.end_time > time
  })

  const nextOpenerFromHere = nextOpenerIndex >= 0
    ? openers[nextOpenerIndex]
    : null
  
  return {
    nextOpener: nextOpenerFromHere,
    currentOpener: currentOpener
  }
}

export const getReleventStreamOpenersForDateSelector = createSelector(
  selectedStreamObjectSelector,
  timeSelector,
  (streamObject, currentTime): IReleventOpeners => {
    if (streamObject == null || streamObject.stream.properties.openers == null) {
      return EMPTY_OPENER_WINDOW
    }

    return getReleventStreamOpenersForDate(streamObject.stream.properties.openers, currentTime)
  }
)

export const convertReleventStreamOpenersToWaterbodyStatus = (openerSummary: IReleventOpeners): WaterbodyStatus => {
  if (openerSummary.currentOpener != null) {
    return 'open'
  }

  if (openerSummary.currentOpener == null && openerSummary.nextOpener == null) {
    return 'unknown'
  }

  return 'closed'
}
export const getStreamStatusFromOpenersForDate = (openers: ReadonlyArray<IOpener>, time: Date): WaterbodyStatus => {
  if (openers == null || openers.length === 0) {
    return 'unknown'
  }

  if (time == null) {
    return 'unknown'
  }

  const openerSummary = getReleventStreamOpenersForDate(openers, time)
  return convertReleventStreamOpenersToWaterbodyStatus(openerSummary)
}

export const getStreamStatus = (releventStreamOpeners: IReleventOpeners): WaterbodyStatus => {
  if (releventStreamOpeners == null) {
    return 'unknown'
  }
  const status = convertReleventStreamOpenersToWaterbodyStatus(releventStreamOpeners)
  return status
}
export const streamStatusSelector = createSelector(
  getReleventStreamOpenersForDateSelector,
  getStreamStatus,
)

export const getStreamStatusText = (streamObject: IStreamObject): string | null => {
  if (streamObject == null) {
    return null
  }

  return 'some fake status text 453'
}

export const streamStatusTextSelector = createSelector(
  selectedStreamObjectSelector,
  getStreamStatusText
)

export const getStreamUntilDateText = (streamObject: IStreamObject): string | null => {
  if (streamObject == null) {
    return null
  }

  return 'like next week or whatever 2'
}

export const streamUntilDateTextSelector = createSelector(
  selectedStreamObjectSelector,
  getStreamUntilDateText
)

export const getStreamAdditionalTextText = (streamObject: IStreamObject): string => {
  if (streamObject == null) {
    return null
  }

  return 'like next week or whatever 3'
}

export const streamAdditionalTextTextSelector = createSelector(
  selectedStreamObjectSelector,
  getStreamAdditionalTextText
)

export const getStreamPubliclyFishableAndTroutStreamBridges = (streamObject: IStreamObject): AccessPointFeature[] => {
  if (streamObject == null) {
    return []
  }
  const bridges = streamObject.accessPoints.filter(bridge => bridge.properties.is_over_publicly_accessible_land && bridge.properties.is_over_trout_stream) || []
  return bridges
}

export const getStreamPubliclyFishableAndTroutStreamBridgeCount = (streamObject: IStreamObject): number => {
  return getStreamPubliclyFishableAndTroutStreamBridges(streamObject).length
}

export const streamBridgeCountSelector = createSelector(
  selectedStreamObjectSelector,
  getStreamPubliclyFishableAndTroutStreamBridgeCount
)
export const StreamDetailsPropsSelector = createStructuredSelector<IReduxState, IStreamDetailsComponentProps>({
  status: streamStatusSelector,
  statusText: streamStatusTextSelector,
  untilDateText: streamUntilDateTextSelector,
  additionalText: streamAdditionalTextTextSelector,
  count: streamBridgeCountSelector,
})
