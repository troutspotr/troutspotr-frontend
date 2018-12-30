import { createSelector, createStructuredSelector } from 'reselect'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
import { IStreamObject } from 'coreTypes/IStreamObject';
import { AccessPointFeature } from 'api/region/IRegionGeoJSON';
import { IReduxState } from 'ui/redux/Store.redux.rootReducer';
import { IStreamDetailsComponentProps } from './StreamDetails.component';

export const getStreamStatus = (streamObject: IStreamObject): 'open' | 'closed' | 'openCaution' | null => {
  if (streamObject == null) {
    return null
  }

  return 'open '
}
export const streamStatusSelector = createSelector(
  selectedStreamObjectSelector,
  getStreamStatus
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
