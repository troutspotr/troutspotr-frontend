import { createStructuredSelector, createSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { ISwitchComponentStateProps, ISwitchLabels } from '../switch/Switch.component'
import { viewSelector } from 'ui/core/Core.selectors'
import { View } from 'ui/core/Core.redux'

export const viewSupportedSelector = (reduxState: IReduxState): boolean => true
export const viewLoadingSelector = (reduxState: IReduxState): boolean => false
export const viewFailedSelector = (reduxState: IReduxState): boolean => false
export const themeSuccessfulSelector = createSelector(viewSelector, (view: View): boolean => {
  return view === View.map
})

const DEFAULT_LABELS = {
  onText: 'Map',
  waitText: ' ',
  failedText: ' ',
  offText: 'List',
  labelText: 'View',
}
export const viewLabelsSelector = (reduxState: IReduxState): ISwitchLabels => DEFAULT_LABELS
export const viewPropsSelector = createStructuredSelector<IReduxState, ISwitchComponentStateProps>({
  isSupported: viewSupportedSelector,
  isLoading: viewLoadingSelector,
  isSuccessful: themeSuccessfulSelector,
  isFailed: viewFailedSelector,
  labels: viewLabelsSelector,
})
