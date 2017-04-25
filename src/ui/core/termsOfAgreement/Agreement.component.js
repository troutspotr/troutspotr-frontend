import React, { PropTypes, Component } from 'react'
import classes from './Agreement.scss'
import TermsOfService from './TermsOfService.component'
import Intro from './Intro.component'
import PrivacyPolicy from './PrivacyPolicy.component'
import ThankYou from './ThankYou.component'
class AgreementComponent extends Component {
  constructor () {
    super()
    this.onAdvanceClick = this.onAdvanceClick.bind(this)
  }

  getProgress () {
    let { hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy } = this.props
    let progress = [false, false, false]
    if (hasSeenIntroScreen === false) {
      progress[0] = true
      return progress
    }

    if (hasSeenTermsOfService === false) {
      progress[1] = true
      return progress
    }

    if (hasSeenPrivacyPolicy === false) {
      progress[2] = true
      return progress
    }

    return progress
  }

  renderMeatballs () {
    let progress = this.getProgress()

    let meatballs = progress.map((p, i) => {
      let className = p ? classes.selectedMeatball : classes.meatball
      let number = i + 1
      return (<li key={number} className={className}>{number}</li>)
    })

    return (<div>
      <ul className={classes.meatballs}>
        {meatballs}
      </ul>
    </div>)
  }

  renderContent () {
    let { hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy } = this.props
    if (hasSeenIntroScreen === false) {
      return <Intro advance={this.onAdvanceClick} />
    }

    if (hasSeenTermsOfService === false) {
      return <TermsOfService advance={this.onAdvanceClick} />
    }

    if (hasSeenPrivacyPolicy === false) {
      return <PrivacyPolicy advance={this.onAdvanceClick} />
    }

    return <Intro />
  }

  renderButtonText () {
    let { hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy } = this.props

    if (hasSeenIntroScreen === false) {
      return 'Review Terms of Service'
    }

    if (hasSeenTermsOfService === false) {
      return 'Agree and Continue'
    }

    if (hasSeenPrivacyPolicy === false) {
      return 'Agree and Continue'
    }
  }

  onAdvanceClick (time) {
    let container = document.getElementById('scrollContainer')
    container.scrollTop = 0
    let { hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy } = this.props

    if (hasSeenIntroScreen === false) {
      return this.props.advanceIntro(time)
    }

    if (hasSeenTermsOfService === false) {
      return this.props.advanceTermsOfService(time)
    }

    if (hasSeenPrivacyPolicy === false) {
      return this.props.advanceToApp(time)
    }
  }

  renderThankYou () {
    return <ThankYou acceptTerms={this.props.agreeToTerms} />
  }

  render () {
    let { hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy, hasAgreedToTerms } = this.props
    if (hasAgreedToTerms) {
      return null
    }

    if (hasSeenPrivacyPolicy && hasSeenTermsOfService &&
        hasSeenIntroScreen && hasAgreedToTerms === false) {
      return this.renderThankYou()
    }

    return (<div className={classes.container}>
      <div >
        <div>
          {this.renderContent()}
        </div>

      </div>
    </div>)
  }
}

AgreementComponent.propTypes = {
  agreeToTerms: PropTypes.func.isRequired,
  advanceIntro: PropTypes.func.isRequired,
  advanceTermsOfService: PropTypes.func.isRequired,
  advanceToApp: PropTypes.func.isRequired,
  hasAgreedToTerms: PropTypes.bool.isRequired,
  hasSeenIntroScreen: PropTypes.bool.isRequired,
  hasSeenTermsOfService: PropTypes.bool.isRequired,
  hasSeenPrivacyPolicy: PropTypes.bool.isRequired
}

export default AgreementComponent
