import React, { PropTypes, Component } from 'react'
import classes from './TermsOfAgreement.scss'
const MAGICAL_NUMBER_OF_PREAMBLES = 5
class TermsOfServiceComponent extends Component {
  onShowAgreement () {
    this.setState({ ...this.state, ...{ isAgreementShown: true } })
  }

  getInitialState () {
    return {
      preambles: [],
      isAgreementShown: false,
      preambleIsFinished: false
    }
  }

  addElement (element) {
    if (element == null) {
      return
    }
    let { preambles } = this.state
    preambles = preambles.concat([element])
    if (preambles.length === MAGICAL_NUMBER_OF_PREAMBLES) {
      setTimeout(() => {
        let { preambleIsFinished } = this.state
        preambleIsFinished = true
        this.setState({ preambleIsFinished })
      }, 1200)
    }
    this.setState({ preambles })
  }

  componentDidMount () {
    // this.props.advance(0) // DEBUG
    this.date = new Date()
    const timelapseLengthMilliseconds = 500

    let container = document.getElementById('scrollContainer')
    container.scrollTop = 0

    setTimeout(() => {
      this.addElement((<div>
        {this.renderTitle()}
      </div>))
    }, 0)

    setTimeout(() => {
      this.addElement((<div className={classes.preambleItem}>Do Not Trespass.</div>))
    }, 800 + timelapseLengthMilliseconds)

    setTimeout(() => {
      this.addElement((<div className={classes.preambleItem}>Obey Fishing Regulations.</div>))
    }, 1700 + timelapseLengthMilliseconds)

    setTimeout(() => {
      this.addElement((<div className={classes.preambleItem}>This App Is Not Legal Advice.</div>))
    }, 2500 + timelapseLengthMilliseconds)

    setTimeout(() => {
      this.addElement((<hr />))
    }, 3300 + timelapseLengthMilliseconds)
  }

   /* <ul className={classes.meatballs}>
        <li className={classes.selectedMeatball}>{1}</li>
        <li className={classes.meatball}>{2}</li>
      </ul> */

  renderTitle () {
    return (<div>
      <span className={classes.jumbo}>Terms of Service</span>
    </div>)
  }

  renderPreamble () {
    return (<div className={classes.preamble}>
      {this.state.preambles.map((p, index) => {
        let key = index + 1
        return (<div key={key} className={classes.preambleContainer}>{p}<div className={classes.shieldRight} /></div>)
      })}
    </div>)
  }

  renderIntro () {
    if (this.state.isAgreementShown === false) {
      return null
    }

    return (<div className={classes.summary}>

      <p>Thanks for using TroutSpotr! We hope you are as excited about fishing as we are.</p>
      <p>TroutSpotr (the “App”) is owned and operated by Stuart Anderson LLC. These Terms of Service ("Terms") govern your use of the App. Please read them carefully.</p>
    </div>)
  }

  renderTerm ({ index, title, body }) {
    return (
      <li key={index}>
        <div className={classes.term}>{index}. {title}</div>
        <div className={classes.termBody}>{body}</div>
      </li>)
  }

  renderAccept (index) {
    let title = 'Accepting Our Terms'
    let body = (<div><p>By using the App, you agree to be bound by all of the terms below. If you don't agree to all of the terms below, please discontinue use of the App immediately. </p>
      <p>If a term is unclear, please let us know by contacting us at: <a className={classes.link} href='mailto:troutspotr@gmail.com'>troutspotr@gmail.com</a></p></div>)
    return this.renderTerm({ index, title, body })
  }

  renderDontTresspass (index) {
    let title = 'Don’t Trespass!!!'
    let body = (
      <div>
        <p>We designed the App to help anglers safely access Minnesota’s public streams. There are times when access to streams involves walking across someone’s private property, which, if you do not have their permission, is <span className={classes.alert}>trespassing</span>. That is a crime. Look here for more details.</p>
        <p>If you are, or even if you think you might need to walk across private property to access a stream, you have two choices: ask permission or find somewhere else to fish.</p>
        <p>Maintaining positive relationships with the people who live where we want to fish is essential to our continued use. Be respectful and follow the law!</p>
      </div>)
    return this.renderTerm({ index, title, body })
  }

  renderObeyLaw (index) {
    let title = 'Obey the Law!!!'
    let body = (<p>Fishing is a regulated activity that requires a license and is subject to the regulations found here. By using the App you are agreeing to maintain a current Minnesota fishing license and to follow all applicable regulations.
</p>)
    return this.renderTerm({ index, title, body })
  }

  renderTermsOfServiceUpdates (index) {
    let title = 'Terms of Service Updates.'
    let body = (<p>We may modify these Terms of Service at any time by posting updates here.  Your continued use of the App after any modification constitutes your acceptance of the updated Terms. Please check back often.
</p>)
    return this.renderTerm({ index, title, body })
  }

  renderDataIsNotGuaranteed (index) {
    let title = 'Data is not Guaranteed.'
    let body = (<p>The App relies on data collected by the Minnesota Department of Natural Resources, the Minnesota Department of Transportation, and other government sources. We cannot guarantee that their data is always accurate. We are also human and cannot guarantee that our work is always perfectly accurate and up to date or that streams will always be navigable. If something looks wrong, it could very well be wrong. Please tell us if you discover a mistake. This is the best way for us to improve the App. Don’t cast your line in the middle of the road and always make safety your top priority. You assume all liability for your use of the App.</p>)
    return this.renderTerm({ index, title, body })
  }

  renderAppropriateUse (index) {
    let title = 'Appropriate Use.'
    let body = (<div>
      <p>In exchange for the right to access and use the App, you agree to the following: </p>
      <ol className={classes.list} type='A'>
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
    return this.renderTerm({ index, title, body })
  }

  renderOwnershipOfTroutspotrMaterials (index) {
    let title = 'Ownership of TroutSpotr Materials.'
    let body = (<p>The name TroutSpotr, our logos, designs, text, graphics and original content on the App (collectively “Content”) is the property of Stuart Anderson LLC. It is protected under U.S. and international copyright and trademark law. We grant you the right, subject to these Terms of Service, to view, use, share and link to the Content. You may not alter or sell Content without our express written permission. </p>)
    return this.renderTerm({ index, title, body })
  }

  renderDisclaimerOfWarranties (index) {
    let title = 'Disclaimer of Warranties.'
    let body = (<div>
      <p>The App may be unavailable from time to time due to maintenance or malfunction of equipment or for various other reasons. We assume no responsibility or liability for malfunctions or other problems with any hosting services, computer systems, servers or providers, equipment or software used in connection with the App.</p>
      <p>Stuart Anderson LLC is not responsible for any damage resulting from any security breach, or from any virus, bugs, tampering, unauthorized intervention, fraud, error, omission, interruption, deletion, defect, delay in operation or transmission, computer line failure or any other technical or other malfunction. Users should also be aware that transmissions via wireless connections, networks, or the Internet may not be secure.</p>
      <p className={classes.alert}><emphasis>YOU EXPRESSLY AGREE THAT YOUR USE OF THE APP IS AT YOUR OWN RISK.</emphasis></p>
    </div>)
    return this.renderTerm({ index, title, body })
  }

  renderGoverningLaw (index) {
    let title = 'Governing Law.'
    let body = (<p>These Terms of Service are governed by the laws of the State of Minnesota and the United States of America.</p>)
    return this.renderTerm({ index, title, body })
  }

  renderTermination (index) {
    let title = 'Termination.'
    let body = (<p>If you violate any of the Terms of Service, we have the right to suspend or disable your access to or use of the App.</p>)
    return this.renderTerm({ index, title, body })
  }

  renderEntireAgreement (index) {
    let title = 'Entire Agreement.'
    let body = (<p>These Terms of Service constitute the entire agreement between you and Stuart Anderson, LLC regarding the use of the App and supersede any prior agreements.</p>)
    return this.renderTerm({ index, title, body })
  }

  renderContactUs (index) {
    return (
      <div key={index}>
        <div>Contact Us.</div>
        <p>If you have any questions about these Terms of Service, you may contact us at: <a className={classes.link} href='mailto:troutspotr@gmail.com'>troutspotr@gmail.com</a></p>
      </div>)
  }

  renderButtonText () {
    let { isAgreementShown } = this.state
    if (isAgreementShown === false) {
      return 'Read Terms of Service'
    }

    return 'Agree and Continue'
  }

  renderButton () {
    let { preambleIsFinished } = this.state
    if (preambleIsFinished === false) {
      return null
    }

    return (<button className={classes.button} onClick={this.onButtonClick}>{this.renderButtonText()}</button>)
  }

  onButtonClick () {
    let { preambleIsFinished, isAgreementShown } = this.state
    if (preambleIsFinished && isAgreementShown === false) {
      setTimeout(() => {
        isAgreementShown = true
        this.setState({ isAgreementShown })
      }, 0)
      return
    } else {
      let ellapsed = (new Date()) - this.time
      this.props.advance(ellapsed)
    }
  }

  generateTerms () {
    let { isAgreementShown } = this.state
    if (isAgreementShown === false) {
      return []
    }

    return [
      this.renderAccept,
      this.renderDontTresspass,
      this.renderObeyLaw,
      this.renderTermsOfServiceUpdates,
      this.renderDataIsNotGuaranteed,
      this.renderAppropriateUse,
      this.renderOwnershipOfTroutspotrMaterials,
      this.renderDisclaimerOfWarranties,
      this.renderGoverningLaw,
      this.renderTermination,
      this.renderEntireAgreement,
      this.renderContactUs,
      this.renderLastUpdate
    ]
  }

  renderLastUpdate (index) {
    return (<div key={index} className={classes.update}>Last Updated: January 20, 2017</div>)
  }

  renderBody () {
    let terms = this.generateTerms()
      .map((termGenerator, index) => {
        return termGenerator(index + 1)
      })

    return (<div className={classes.preambleContainer}>
      {this.renderIntro()}
      <ul>
        {terms}
      </ul>

      {this.renderButton()}
      <div className={classes.shieldDown} />
    </div>)
  }

// {this.renderTitle()}
//         {this.renderIntro()}

// <button className={classes.button} onClick={this.props.advance}>Agree and Continue</button>
  render () {
    return (
      <div>
        {this.renderPreamble()}
        {this.renderBody()}
      </div>)
  }
}

TermsOfServiceComponent.propTypes = {
  advance: PropTypes.func.isRequired
}

export default TermsOfServiceComponent
