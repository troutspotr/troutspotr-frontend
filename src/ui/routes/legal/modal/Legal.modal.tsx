import * as React from 'react'
const styles = require('ui/routes/legal/Legal.layout.scss')
import { LegalIntroContainer } from 'ui/routes/legal/LegalIntro.container'
import { TermsOfServiceContainer } from 'ui/routes/legal/terms-of-service/TermsOfService.container'
import { PrivacyPolicyContainer } from 'ui/routes/legal/privacy-policy/PrivacyPolicy.container'
import { ThankYouContainer } from 'ui/routes/legal/thank-you/ThankYou.container'

export interface ILegalModalDispatchProps {
  advanceIntro(): void, 
  advanceTermsOfService(): void,
  advancePrivacyPolicy(): void,
  advanceThankYou(): void,
}

export interface ILegalModalStateProps {
  hasSeenIntro: boolean,
  hasSeenTermsOfService: boolean,
  hasSeenPrivacyPolicy: boolean,
  hasAgreedToAllTerms: boolean,
}

export interface ILegalModalPassedProps {}

export interface ILegalModalProps 
  extends ILegalModalStateProps,
  ILegalModalDispatchProps,
  ILegalModalPassedProps {}

export class LegalModalComponent extends React.PureComponent<ILegalModalProps> {
  constructor(props) {
    super(props)
  }

  



  private renderAgreementStep() {
    const {
      hasSeenIntro,
      hasSeenTermsOfService,
      hasSeenPrivacyPolicy,
      hasAgreedToAllTerms,
    } = this.props
    debugger
    if (hasSeenIntro === false) {
      return <LegalIntroContainer />
    }

    if (hasSeenTermsOfService === false) {
      return <TermsOfServiceContainer />
    }

    if (hasSeenPrivacyPolicy === false) {
      return <PrivacyPolicyContainer />
    }

    if (hasAgreedToAllTerms === false) {
      return <ThankYouContainer />
    }

    return null
  }
  public render() {
    const agreementStepComponent = this.renderAgreementStep()
    return <div className={styles.container}>
      {agreementStepComponent}
      </div>
  }
}
