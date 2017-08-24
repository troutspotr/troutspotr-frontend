import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
    const {hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy} = this.props
    const progress = [
      false,
      false,
      false,
    ]
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
    const progress = this.getProgress()

    const meatballs = progress.map((p, i) => {
      const className = p ? classes.selectedMeatball : classes.meatball
      const number = i + 1
      return (<li key={number} className={className}>{number}</li>)
    })

    return (<div>
      <ul className={classes.meatballs}>
        {meatballs}
      </ul>
    </div>)
  }

  renderContent () {
    const {hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy} = this.props
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
    const {hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy} = this.props

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
    const container = document.getElementById('scrollContainer')
    container.scrollTop = 0
    const {hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy} = this.props

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
    const {hasSeenIntroScreen, hasSeenTermsOfService, hasSeenPrivacyPolicy, hasAgreedToTerms} = this.props
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
  'agreeToTerms': PropTypes.func.isRequired,
  'advanceIntro': PropTypes.func.isRequired,
  'advanceTermsOfService': PropTypes.func.isRequired,
  'advanceToApp': PropTypes.func.isRequired,
  'hasAgreedToTerms': PropTypes.bool.isRequired,
  'hasSeenIntroScreen': PropTypes.bool.isRequired,
  'hasSeenTermsOfService': PropTypes.bool.isRequired,
  'hasSeenPrivacyPolicy': PropTypes.bool.isRequired,
}

export default AgreementComponent
