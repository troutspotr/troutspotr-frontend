import { createSelector } from 'reselect'
import { ILegalState } from 'ui/routes/legal/Legal.redux'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'

export const legalReduxStateSelector = (reduxState: IReduxState): ILegalState => reduxState.legal

export const hasSeenIntroScreenStateSelector = createSelector(legalReduxStateSelector, (legalState): boolean => {
  debugger
  return legalState.hasSeenIntroScreen
})
export const hasSeenTermsOfServiceStateSelector = createSelector(legalReduxStateSelector, (legalState): boolean => {
  return legalState.hasSeenTermsOfService
})
export const hasSeenPrivacyPolicyStateSelector = createSelector(legalReduxStateSelector, (legalState): boolean => {
  return legalState.hasSeenPrivacyPolicy
})
export const hasAgreedToTermsStateSelector = createSelector(legalReduxStateSelector, (legalState): boolean => {
  return legalState.hasAgreedToTerms
})
