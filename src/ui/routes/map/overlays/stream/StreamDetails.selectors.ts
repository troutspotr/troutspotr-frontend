import { createSelector } from 'reselect'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
import { IStreamObject } from 'coreTypes/IStreamObject';

export const getStreamStatus = (streamObject: IStreamObject): 'open' | 'closed' | 'openCaution' => {
  if (streamObject == null) {
    return null
  }

  return 'open'
}
export const streamStatusSelector = createSelector(
  selectedStreamObjectSelector,
  getStreamStatus
)

export const getStreamStatusText = (streamObject: IStreamObject): string => {
  if (streamObject == null) {
    return null
  }

  return 'some fake status text'
}

export const streamStatusTextSelector = createSelector(
  selectedStreamObjectSelector,
  getStreamStatusText
)