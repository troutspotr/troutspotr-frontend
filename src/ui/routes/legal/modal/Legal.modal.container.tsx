import { connect } from 'react-redux'
import {
  LegalModalComponent,
  ILegalModalDispatchProps,
  ILegalModalStateProps,
  ILegalModalPassedProps,
} from 'ui/routes/legal/modal/Legal.modal'
import {
  hasSeenIntroScreenStateSelector,
  hasSeenTermsOfServiceStateSelector,
  hasSeenPrivacyPolicyStateSelector,
  hasAgreedToTermsStateSelector,
} from 'ui/routes/legal/Legal.selectors'
import {
  setHasAgreedToAllTerms,
  setHasSeenIntroScreen,
  setHasSeenTermsOfService,
  setHasSeenPrivacyPolicy,
} from 'ui/routes/legal/Legal.redux'
import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
const mapDispatchToProps: ILegalModalDispatchProps = {
  advanceIntro: () => setHasSeenIntroScreen(),
  advanceTermsOfService: () => setHasSeenTermsOfService(),
  advancePrivacyPolicy: () => setHasSeenPrivacyPolicy(),
  advanceThankYou: () => setHasAgreedToAllTerms(),
}

export const legalModalPropsSelector = createStructuredSelector<IReduxState, ILegalModalStateProps>({
  hasSeenIntro: hasSeenIntroScreenStateSelector,
  hasSeenTermsOfService: hasSeenTermsOfServiceStateSelector,
  hasSeenPrivacyPolicy: hasSeenPrivacyPolicyStateSelector,
  hasAgreedToAllTerms: hasAgreedToTermsStateSelector,
})

const mapStateToProps = (state: IReduxState): ILegalModalStateProps => legalModalPropsSelector(state)

export const LegalModalContainer = connect
  <ILegalModalStateProps, ILegalModalDispatchProps, ILegalModalPassedProps>
  (mapStateToProps, mapDispatchToProps)(LegalModalComponent)
