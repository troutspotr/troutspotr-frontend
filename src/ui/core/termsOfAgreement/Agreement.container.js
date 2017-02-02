import { connect } from 'react-redux'
import AgreementComponent from './Agreement.component'
import {
  hasAgreedToTermsSelector,
  hasSeenIntroScreenSelector,
  hasSeenTermsOfServiceSelector,
  hasSeenPrivacyPolicySelector } from 'ui/core/Core.selectors'
import { agreeToTerms, setAgreementState } from 'ui/core/Core.state'
const mapDispatchToProps = {
  agreeToTerms: () => agreeToTerms('true'),
  advanceIntro: (time) => setAgreementState({ view: 'intro', time }),
  advanceTermsOfService: (time) => setAgreementState({ view: 'termsOfService', time }),
  advanceToApp: (time) => setAgreementState({ view: 'privacyPolicy', time })
}

const mapStateToProps = (state) => {
  let hasAgreed = hasAgreedToTermsSelector(state)
  let props = {
    hasAgreedToTerms: hasAgreed,
    hasSeenIntroScreen: hasSeenIntroScreenSelector(state),
    hasSeenTermsOfService: hasSeenTermsOfServiceSelector(state),
    hasSeenPrivacyPolicy: hasSeenPrivacyPolicySelector(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(AgreementComponent)
