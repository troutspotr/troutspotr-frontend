import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Agreement.scss'
const MAGICAL_NUMBER_OF_PREAMBLES = 5
const scalar = 0.5
class TermsOfServiceComponent extends Component {
  constructor () {
    super()
    this.state = {
      'preambles': [],
      'isAgreementShown': false,
      'preambleIsFinished': false,
    }
  }
  onShowAgreement () {
    this.setState({...this.state, ...{'isAgreementShown': true}})
  }

  addElement (element) {
    if (element == null) {
      return
    }
    let {preambles} = this.state
    preambles = preambles.concat([element])
    if (preambles.length === MAGICAL_NUMBER_OF_PREAMBLES) {
      setTimeout(() => {
        let {preambleIsFinished} = this.state
        preambleIsFinished = true
        this.setState({preambleIsFinished})
      }, 1200 * scalar)
    }
    this.setState({preambles})
  }

  componentDidMount () {
    this.date = new Date()
    const timelapseLengthMilliseconds = 200

    const container = document.getElementById('scrollContainer')
    if (container != null) {
      container.scrollTop = 0
    }

    setTimeout(() => {
      this.addElement((<div>
        {this.renderTitle()}
      </div>))
    }, 0)

    setTimeout(() => {
      this.addElement((<div className={classes.preambleItem}>Do Not Trespass.</div>))
    }, 800 * scalar + timelapseLengthMilliseconds)

    setTimeout(() => {
      this.addElement((<div className={classes.preambleItem}>Obey Fishing Regulations.</div>))
    }, 1700 * scalar + timelapseLengthMilliseconds)

    setTimeout(() => {
      this.addElement((<div className={classes.preambleItem}>This App Is Not Legal Advice.</div>))
    }, 2500 * scalar + timelapseLengthMilliseconds)

    setTimeout(() => {
      this.addElement((<hr />))
    }, 3300 * scalar + timelapseLengthMilliseconds)
  }

  renderTitle () {
    return (<div>
      <span className={classes.jumbo}>Terms of Service</span>
    </div>)
  }

  renderPreamble = () => (<div className={classes.preamble}>
    {this.state.preambles.map((p, index) => {
      const key = index + 1
      return (<div key={key} className={classes.preambleContainer}>{p}<div className={classes.shieldRight} /></div>)
    })}
  </div>)

  renderIntro = () => {
    if (this.state.isAgreementShown === false) {
      return null
    }

    return (<div className={classes.summary}>

      <p>Thanks for using TroutSpotr! We hope you are as excited about fishing as we are.</p>
      <p>TroutSpotr (the “App”) is owned and operated by Stuart Anderson LLC. These Terms of Service ("Terms") govern your use of the App. Please read them carefully.</p>
    </div>)
  }

  renderTerm = ({index, title, body}) => (
    <li key={index}>
      <div className={classes.term}>{index}. {title}</div>
      <div className={classes.termBody}>{body}</div>
    </li>)

  renderAccept = (index) => {
    const title = 'Accepting Our Terms'
    const body = (<div><p>By using the App, you agree to be bound by all of the terms below. If you don't agree to all of the terms below, please discontinue use of the App immediately. </p>
      <p>If a term is unclear, please let us know by contacting us at: <a className={classes.link} href="mailto:troutspotr@gmail.com">troutspotr@gmail.com</a></p></div>)
    return this.renderTerm({index, title, body})
  }

  renderDontTresspass = (index) => {
    const title = 'Don’t Trespass!!!'
    const body = (
      <div>
        <p>We designed the App to help anglers safely access Minnesota’s public streams. There are times when access to streams involves walking across someone’s private property, which, if you do not have their permission, is <span className={classes.alert}>trespassing</span>. That is a crime. Look <a className={classes.link} rel="noopener noreferrer" target="_blank" href="https://www.revisor.mn.gov/statutes/?id=92.70">here</a> for more details.</p>
        <p>If you are, or even if you think you might need to walk across private property to access a stream, you have two choices: ask permission or find somewhere else to fish.</p>
        <p>Maintaining positive relationships with the people who live where we want to fish is essential to our continued use. Be respectful and follow the law!</p>
      </div>)
    return this.renderTerm({index, title, body})
  }

  renderObeyLaw (index) {
    const title = 'Obey the Law!!!'
    const body = (<p>Fishing is a regulated activity that requires a license and is subject to the regulations found here. By using the App you are agreeing to maintain a current Minnesota fishing license and to follow all applicable regulations.
    </p>)
    return this.renderTerm({index, title, body})
  }

  renderTermsOfServiceUpdates (index) {
    const title = 'Terms of Service Updates.'
    const body = (<p>We may modify these Terms of Service at any time by posting updates here.  Your continued use of the App after any modification constitutes your acceptance of the updated Terms. Please check back often.
    </p>)
    return this.renderTerm({index, title, body})
  }

  renderDataIsNotGuaranteed (index) {
    const title = 'Data is not Guaranteed.'
    const body = (<p>The App relies on data collected by the Minnesota Department of Natural Resources, the Minnesota Department of Transportation, and other government sources. We cannot guarantee that their data is always accurate. We are also human and cannot guarantee that our work is always perfectly accurate and up to date or that streams will always be navigable. If something looks wrong, it could very well be wrong. Please tell us if you discover a mistake. This is the best way for us to improve the App. Don’t cast your line in the middle of the road and always make safety your top priority. You assume all liability for your use of the App.</p>)
    return this.renderTerm({index, title, body})
  }

  renderAppropriateUse (index) {
    const title = 'Appropriate Use.'
    const body = (<div>
      <p>In exchange for the right to access and use the App, you agree to the following: </p>
      <ol className={classes.list} type="A">
        <li>
          Not to use the App in any illegal manner or for any illegal purpose or in
 any manner that could damage, disable or impair the App;
        </li>
        <li>
          Not to alter or modify any content on the App;
        </li>
        <li>
          Not to post or transmit material that you do not have the right to post, transmit or share or that is obscene, defamatory or invasive of the privacy of any person;
        </li>
        <li>
          Not to use the App to harass or intimidate any person.
        </li>
      </ol>
      <p>You agree to indemnify us against any claims arising out of your inappropriate use of the App.</p>
    </div>)
    return this.renderTerm({index, title, body})
  }

  renderOwnershipOfTroutspotrMaterials (index) {
    const title = 'Ownership of TroutSpotr Materials.'
    const body = (<p>The name TroutSpotr, our logos, designs, text, graphics and original content on the App (collectively “Content”) is the property of Stuart Anderson LLC. It is protected under U.S. and international copyright and trademark law. We grant you the right, subject to these Terms of Service, to view, use, share and link to the Content. You may not alter or sell Content without our express written permission. </p>)
    return this.renderTerm({index, title, body})
  }

  renderDisclaimerOfWarranties (index) {
    const title = 'Disclaimer of Warranties.'
    const body = (<div>
      <p>The App may be unavailable from time to time due to maintenance or malfunction of equipment or for various other reasons. We assume no responsibility or liability for malfunctions or other problems with any hosting services, computer systems, servers or providers, equipment or software used in connection with the App.</p>
      <p>Stuart Anderson LLC is not responsible for any damage resulting from any security breach, or from any virus, bugs, tampering, unauthorized intervention, fraud, error, omission, interruption, deletion, defect, delay in operation or transmission, computer line failure or any other technical or other malfunction. Users should also be aware that transmissions via wireless connections, networks, or the Internet may not be secure.</p>
      <p className={classes.alert}><emphasis>YOU EXPRESSLY AGREE THAT YOUR USE OF THE APP IS AT YOUR OWN RISK.</emphasis></p>
    </div>)
    return this.renderTerm({index, title, body})
  }

  renderGoverningLaw (index) {
    const title = 'Governing Law.'
    const body = (<p>These Terms of Service are governed by the laws of the State of Minnesota and the United States of America.</p>)
    return this.renderTerm({index, title, body})
  }

  renderTermination (index) {
    const title = 'Termination.'
    const body = (<p>If you violate any of the Terms of Service, we have the right to suspend or disable your access to or use of the App.</p>)
    return this.renderTerm({index, title, body})
  }

  renderEntireAgreement (index) {
    const title = 'Entire Agreement.'
    const body = (<p>These Terms of Service constitute the entire agreement between you and Stuart Anderson, LLC regarding the use of the App and supersede any prior agreements.</p>)
    return this.renderTerm({index, title, body})
  }

  renderContactUs (index) {
    return (
      <div key={index}>
        <div className={classes.term}>Contact Us.</div>
        <p>If you have any questions about these Terms of Service, you may contact us at: <a className={classes.link} href="mailto:troutspotr@gmail.com">troutspotr@gmail.com</a></p>
      </div>)
  }

  renderButtonText () {
    const {isAgreementShown} = this.state
    if (isAgreementShown === false) {
      return 'Read Terms of Service'
    }

    return 'Agree and Continue'
  }

  renderButton () {
    const {preambleIsFinished} = this.state
    if (preambleIsFinished === false) {
      return null
    }

    return (<button className={classes.button} onClick={this.onButtonClick}>{this.renderButtonText()}</button>)
  }

  onButtonClick = () => {
    const {preambleIsFinished} = this.state
    let {isAgreementShown} = this.state
    if (preambleIsFinished && isAgreementShown === false) {
      setTimeout(() => {
        isAgreementShown = true
        this.setState({isAgreementShown})
      }, 0)
    } else {
      const ellapsed = (new Date()) - this.time
      this.props.advance(ellapsed)
    }
  }

  generateTerms = () => {
    const {isAgreementShown} = this.state
    if (isAgreementShown === false) {
      return []
    }

    return [
      this.renderAccept.bind(this),
      this.renderDontTresspass.bind(this),
      this.renderObeyLaw.bind(this),
      this.renderTermsOfServiceUpdates.bind(this),
      this.renderDataIsNotGuaranteed.bind(this),
      this.renderAppropriateUse.bind(this),
      this.renderOwnershipOfTroutspotrMaterials.bind(this),
      this.renderDisclaimerOfWarranties.bind(this),
      this.renderGoverningLaw.bind(this),
      this.renderTermination.bind(this),
      this.renderEntireAgreement.bind(this),
      this.renderContactUs.bind(this),
      this.renderLastUpdate.bind(this),
    ]
  }

  renderLastUpdate (index) {
    return (<div key={index} className={classes.update}>Last Updated: January 20, 2017</div>)
  }

  renderBody () {
    const terms = this.generateTerms()
      .map((termGenerator, index) => termGenerator(index + 1))

    return (<div className={classes.preambleContainer}>
      {this.renderIntro()}
      <ul>
        {terms}
      </ul>

      {this.renderButton()}
      <div className={classes.shieldDown} />
    </div>)
  }

  render () {
    return (
      <div>
        {this.renderPreamble()}
        {this.renderBody()}
      </div>)
  }
}

TermsOfServiceComponent.propTypes = {'advance': PropTypes.func.isRequired}

export default TermsOfServiceComponent
