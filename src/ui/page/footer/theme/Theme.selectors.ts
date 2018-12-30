import { createStructuredSelector, createSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { ISwitchComponentStateProps, ISwitchLabels } from '../switch/Switch.component'
import { themeSelector } from 'ui/core/Core.selectors'
import { Theme } from 'ui/core/Core.redux'

export const themeSupportedSelector = (reduxState: IReduxState): boolean => true

export const themeFailedSelector = (reduxState: IReduxState): boolean => false
export const themeSuccessfulSelector = createSelector(themeSelector, (theme: Theme): boolean => {
  return theme === Theme.light
})

export const themeLoadingSelector = createSelector(
  themeSelector,
  themeSuccessfulSelector,
  (theme: Theme, isSuccess: boolean): boolean => {
    return false
  }
)
const DEFAULT_LABELS = {
  onText: 'Light',
  waitText: ' ',
  failedText: ' ',
  offText: 'Dark',
  labelText: 'Theme',
}
export const themeLabelsSelector = (reduxState: IReduxState): ISwitchLabels => DEFAULT_LABELS
export const themePropsSelector = createStructuredSelector<IReduxState, ISwitchComponentStateProps>(
  {
    isSupported: themeSupportedSelector,
    isLoading: themeLoadingSelector,
    isSuccessful: themeSuccessfulSelector,
    isFailed: themeFailedSelector,
    labels: themeLabelsSelector,
  }
)
