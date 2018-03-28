import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { ISwitchComponentStateProps, ISwitchLabels } from '../switch/Switch.component'
import {
  getIsGpsActiveButLoading,
  getIsActiveAndSuccessful,
  isGpsTrackingSupportedStateSelector,
  isGpsFailedSelector,
} from 'ui/core/gps/Gps.selectors'

const DEFAULT_LABELS = {
  onText: 'On',
  waitText: 'Wait',
  failedText: 'Failed',
  offText: 'Off',
  labelText: 'GPS',
}
export const gpsLabelsSelector = (reduxState: IReduxState): ISwitchLabels => DEFAULT_LABELS
export const gpsPropsSelector = createStructuredSelector<IReduxState, ISwitchComponentStateProps>({
  isSupported: isGpsTrackingSupportedStateSelector,
  isLoading: getIsGpsActiveButLoading,
  isSuccessful: getIsActiveAndSuccessful,
  isFailed: isGpsFailedSelector,
  labels: gpsLabelsSelector,
})
