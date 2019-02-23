import { createStructuredSelector } from 'reselect'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer';
import { IStreamDetailsComponentProps } from './StreamDetails.component';
import { WaterbodyStatus, IOpener } from 'coreTypes/state/IWaterOpener'

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

export const StreamDetailsPropsSelector = createStructuredSelector<IReduxState, IStreamDetailsComponentProps>({
  streamObject: selectedStreamObjectSelector,
})
