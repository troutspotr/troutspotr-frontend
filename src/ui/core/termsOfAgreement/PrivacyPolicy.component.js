import React, { PropTypes, Component } from 'react'
import classes from './TermsOfAgreement.scss'
const MAGICAL_NUMBER_OF_PREAMBLES = 5
const scalar = 0.2
class PrivacyPolicy extends Component {
  constructor () {
    super()
    this.onButtonClick = this.onButtonClick.bind(this)
    this.state = {
      preambles: [],
      isAgreementShown: false,
      preambleIsFinished: false
    }
  }

  renderTerm ({ index, title, body }) {
    return (
      <li key={index}>
        <div className={classes.term}>{title}</div>
        <div className={classes.termBody}>{body}</div>
      </li>)
  }

  renderTitle () {
    return (
      <div>
        <div className={classes.jumbo}>Privacy Policy</div>
      </div>)
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
      }, 600)
    }
    this.setState({ preambles })
  }

  componentDidMount () {
    // this.props.advance(0) // DEBUG
    this.time = new Date()
    let container = document.getElementById('scrollContainer')
    container.scrollTop = 0

    setTimeout(() => {
      this.addElement(this.renderTitle())
    }, 200 * scalar)

    setTimeout(() => {
      this.addElement((<div className={classes.preambleItem}>We are not interested in your secret fishing spots.</div>))
    }, 1200 * scalar)

    setTimeout(() => {
      this.addElement((<div className={classes.preambleItem}>We are very interested in using the web to help anglers make safe and legal choices.</div>))
    }, 3200 * scalar)

    setTimeout(() => {
      this.addElement((<div className={classes.preambleItem}>To that end, we track usage, not users, <strong>and you can opt out</strong>.</div>))
    }, 6100 * scalar)

    setTimeout(() => {
      this.addElement((<hr />))
    }, 8100 * scalar)
  }

  renderPreamble = () => {
    return (<div className={classes.preamble}>
      {this.state.preambles.map((p, i) => {
        let key = i + 1
        let shield = (i === MAGICAL_NUMBER_OF_PREAMBLES - 1 || i === 0) ? classes.shieldRight : classes.shieldDown
        return (<div key={key} className={classes.preambleContainer}>{p}<div className={shield} /></div>)
      })}
    </div>)
  }

  renderIntro () {
    if (this.state.isAgreementShown === false) {
      return null
    }

    return (<div className={classes.summary}>

      <p>TroutSpotr and its parent company, Stuart Anderson, LLC (“TroutSpotr” “we” or “us”) is committed to protecting and respecting your privacy. We are not interested in learning your secret fishing spots. We are very interested in using the web to help anglers make safe and legal choices. To that end, we review usage data in order to improve the app.</p>
      <p>This Privacy Policy and the Terms of Service sets out the manner in which any personal data we collect from you via the TroutSpotr App, or that you provide to us, will be utilized and stored. Please read the following carefully.</p>
    </div>)
  }

  renderCollection (index) {
    let title = 'We may collect and utilize the following:'
    let body = (<div>
      <ol className={classes.list} type='A'>
        <li>
          <p>Information you provide by filling in forms on the App. This includes information provided when you report a problem with the site. This information may include your name, email address and telephone telephone number.</p>
        </li>

        <li>
          <p>The contents of any correspondence or information you send to us via the App or the Contact email provided in the App.</p>
        </li>

        <li>
          <p>Responses to any surveys you fill out on the App.</p>
        </li>

        <li>
          <p>Details of your use(s) to the App including traffic, weblogs and other communication data. This data is collected for statistical purposes and does not identify users individually.
</p>
        </li>

        <li>
          <p>Additional information described to you at the point of collection and subject to your consent.</p>
        </li>
      </ol>
    </div>)

    return this.renderTerm({ index, title, body })
  }

  renderIpAddress (index) {
    let title = 'IP addresses'
    let body = (<div>
      <p>We may collect information about your browsing device, including your IP address, operating system and browser type. This data is collected for statistical purposes and does not identify users individually.</p>
    </div>)

    return this.renderTerm({ index, title, body })
  }

  renderCookies (index) {
    let title = 'Cookies'
    let body = (<div>
      <p>The App may use cookies to help us identify you and improve your experience. </p>
    </div>)

    return this.renderTerm({ index, title, body })
  }

  renderDataSecurity (index) {
    let title = 'Data Security'
    let body = (<div>
      <div className={classes.term} />
      <p>We have procedures in place to help protect against theft, loss, misuse, unauthorized access, disclosure or destruction of the information you provide to us. No data transmission or storage is 100% secure. Therefore, we cannot guarantee or warrant the security of any information you transmit or disclose to us and cannot be responsible for the theft, destruction, or inadvertent disclosure of that information. In the event of any breach, we will post a notice on the App.</p>
    </div>)

    return this.renderTerm({ index, title, body })
  }

  renderUseOfInformation (index) {
    let title = 'Use of Information'
    let body = (<div>
      <div className={classes.term} />
      <p>We may use information that we collect through the App for the following purposes:</p>
      <ol className={classes.list} type='A'>
        <li>
          <p>To conduct demographic analysis on our users; </p>
        </li>

        <li>
          <p>To provide information you request and respond to correspondence that we receive from you;</p>
        </li>

        <li>
          <p>To review usage of certain features in the app, like map usage or popular fishing regions;</p>
        </li>

        <li>
          <p>As otherwise described to you at the point of collection and subject to your consent.</p>
        </li>
      </ol>
    </div>)

    return this.renderTerm({ index, title, body })
  }

  renderDisclosureOfInformation (index) {
    let title = 'Disclosure of your information'
    let body = (<div>
      <div className={classes.term} />
      <p>It is our general policy not to share your information with third parties. We do reserve the right to share your information with third parties in the following limited circumstances:
</p>
      <ol className={classes.list} type='A'>
        <li>
          <p>In order to protect the legal rights, safety, and security of Stuart Anderson LLC;</p>
        </li>

        <li>
          <p>To enforce our Terms of Service;</p>
        </li>

        <li>
          <p>To comply with or respond to law enforcement or legal process or a request for cooperation by a government or other entity, whether or not legally required.</p>
        </li>
      </ol>
    </div>)

    return this.renderTerm({ index, title, body })
  }

  renderPrivacyPolicyUpdates (index) {
    let title = 'Privacy Policy Updates'
    let body = (<div>
      <p>We may modify this Privacy Policy at any time by posting revisions here.  Your continued use of the App after any modification constitutes your acceptance of the updated Policy. Please check back often.</p>
    </div>)

    return this.renderTerm({ index, title, body })
  }

  renderContact (index) {
    let title = 'Contact'
    let body = (<div key={index}>
      <div />
      <p>Please contact us at <a className={classes.link} href='mailto:troutspotr@gmail.com'>troutspotr@gmail.com</a> if you have any questions, comments or requests regarding this Privacy Policy. </p>
    </div>)

    return this.renderTerm({ index, title, body })
  }

  renderKeen (index) {
    let url = 'https://keen.io/privacy-policy/'
    return (<div key={index}>
      <p>This app uses Keen.io to track usage - not users.</p>
      <p>Read their privacy policy here: <a className={classes.link} rel='noopener noreferrer' target='_blank' href={url}>{url}</a></p>
    </div>)
  }

  renderDoNotTrack (index) {
    let url = 'https://allaboutdnt.com/'
    return (<div key={index}>
      <p>Our app honors your browsers’ Do Not Track settings.</p>
      <p>Read more here: <a className={classes.link} rel='noopener noreferrer' target='_blank' href={url}>{url}</a></p>
    </div>)
  }

  renderButtonText () {
    let { isAgreementShown } = this.state
    if (isAgreementShown === false) {
      return 'Show Privacy Policy'
    }

    return 'Agree and Finish'
  }

  renderButton () {
    let { preambleIsFinished } = this.state
    if (preambleIsFinished === false) {
      return null
    }

    return (<button className={classes.button} onClick={this.onButtonClick}>{this.renderButtonText()}</button>)
  }

  onButtonClick = () => {
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

    return [this.renderCollection.bind(this),
      this.renderIpAddress.bind(this),
      this.renderCookies.bind(this),
      this.renderDataSecurity.bind(this),
      this.renderUseOfInformation.bind(this),
      this.renderDisclosureOfInformation.bind(this),
      this.renderPrivacyPolicyUpdates.bind(this),
      this.renderContact.bind(this),
      this.renderKeen.bind(this),
      this.renderDoNotTrack.bind(this),
      (index) => { return (<p key={index}>Last Updated: January 20, 2017</p>) }]
  }

  renderBody = () => {
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
      <div className={classes.shieldDown}>hello lol</div>
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

PrivacyPolicy.propTypes = {
  advance: PropTypes.func.isRequired
}

export default PrivacyPolicy
