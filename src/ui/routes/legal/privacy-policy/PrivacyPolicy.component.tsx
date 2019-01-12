// turning off big function rule
// because most of this is content and is very large
// tslint:disable:no-big-function
import * as React from 'react'

const classes = require('ui/routes/legal/Legal.scss')
const MAGICAL_NUMBER_OF_PREAMBLES = 5
const scalar = 0.2
export interface IPrivacyPolicyProps {
  advance(ellapsed: number): void
}

export interface IPrivacyPolicyState {
  preambles: string[]
  isAgreementShown: boolean
  preambleIsFinished: boolean
  time: {}
}
export class PrivacyPolicyComponent extends React.PureComponent<
  IPrivacyPolicyProps,
  IPrivacyPolicyState
> {
  constructor(props) {
    super(props)
    this.onButtonClick = this.onButtonClick.bind(this)
    this.state = {
      preambles: [],
      isAgreementShown: false,
      preambleIsFinished: false,
      time: new Date(),
    }
  }

  public renderTerm({ index, title, body }) {
    return (
      <li key={index}>
        <h2 className={classes.term}>{title}</h2>
        <div className={classes.termBody}>{body}</div>
      </li>
    )
  }

  public renderTitle() {
    return (
      <div>
        <h1 className={classes.jumbo}>Privacy Policy</h1>
      </div>
    )
  }

  public addElement(element) {
    if (element == null) {
      return
    }
    const preambles = [...this.state.preambles].concat([element])
    if (preambles.length === MAGICAL_NUMBER_OF_PREAMBLES) {
      setTimeout(() => {
        this.setState({ preambleIsFinished: true })
      }, 600)
    }
    this.setState({ preambles: preambles })
  }

  public componentDidMount() {
    const container = document.getElementById('scrollContainer')
    if (container != null) {
      container.scrollTop = 0
    }

    setTimeout(() => {
      this.addElement(this.renderTitle())
    }, 200 * scalar)

    setTimeout(() => {
      this.addElement(
        <h2 className={classes.preambleItem}>
          We are not interested in your secret fishing spots.
        </h2>
      )
    }, 1200 * scalar)

    setTimeout(() => {
      this.addElement(
        <h2 className={classes.preambleItem}>
          We are very interested in using the web to help anglers make safe and legal choices.
        </h2>
      )
    }, 3200 * scalar)

    setTimeout(() => {
      this.addElement(
        <h2 className={classes.preambleItem}>
          To that end, we track usage, not users, <strong className={classes.alert}>and you can opt out</strong>.
        </h2>
      )
    }, 6100 * scalar)

    setTimeout(() => {
      this.addElement(<hr />)
    }, 8100 * scalar)
  }

  public renderPreamble = () => {
    const preambles = this.state.preambles.map((p, i) => {
      const key = i + 1
      const shield =
        i === MAGICAL_NUMBER_OF_PREAMBLES - 1 || i === 0 ? classes.shieldRight : classes.shieldDown
      return (
        <div key={key} className={classes.preambleContainer}>
          <h4>{p}</h4>
          <div className={shield} />
        </div>
      )
    })
    return <div className={classes.preamble}>{preambles}</div>
  }

  public renderIntro() {
    if (this.state.isAgreementShown === false) {
      return null
    }

    return (
      <div className={classes.summary}>
        <p>
          TroutSpotr and its parent company, Stuart Anderson, LLC (“TroutSpotr” “we” or “us”) is
          committed to protecting and respecting your privacy. You hear that a lot these days, and judging
          from the news we read every day, skepticism is warranted, and <span className={classes.alert}>trust should not be given lightly.</span>
        </p>
        <p >People have the right to know how their data is being used.</p>
        <p>
          This Privacy Policy and the Terms of Service sets out the manner in which any personal
          data we collect from you via the TroutSpotr App, or that you provide to us, will be
          utilized and stored. Please read the following carefully.
        </p>
      </div>
    )
  }

  public renderCollection(index) {
    const title = 'We may collect and utilize the following:'
    const body = (
      <div>
        <ol className={classes.list}>
          <li>
            <p>
              Information you provide by filling in forms on the App. This includes information
              provided when you report a problem with the site. This information may include your
              name, email address and telephone telephone number.
            </p>
          </li>

          <li>
            <p>
              The contents of any correspondence or information you send to us via the App or the
              Contact email provided in the App.
            </p>
          </li>

          <li>
            <p>Responses to any surveys you fill out on the App.</p>
          </li>

          <li>
            <p>
              Details of your use(s) to the App including traffic, weblogs and other communication
              data. This data is collected for statistical purposes and does not identify users
              individually.
            </p>
          </li>

          <li>
            <p>
              Additional information described to you at the point of collection and subject to your
              consent.
            </p>
          </li>
        </ol>
      </div>
    )

    return this.renderTerm({ index: index, title: title, body: body })
  }

  public renderIpAddress(index) {
    const title = 'IP addresses'
    const body = (
      <div>
        <p>
          We may collect information about your browsing device, including your IP address,
          operating system and browser type. This data is collected for statistical purposes and
          does not identify users individually.
        </p>
      </div>
    )

    return this.renderTerm({ index: index, title: title, body: body })
  }

  public renderCookies(index) {
    const title = 'Cookies'
    const body = (
      <div>
        <p>The App may use cookies to help us identify you and improve your experience. </p>
      </div>
    )

    return this.renderTerm({ index: index, title: title, body: body })
  }

  public renderDataSecurity(index) {
    const title = 'Data Security'
    const body = (
      <div>
        <div className={classes.term} />
        <p>
          We have procedures in place to help protect against theft, loss, misuse, unauthorized
          access, disclosure or destruction of the information you provide to us. No data
          transmission or storage is 100% secure. Therefore, we cannot guarantee or warrant the
          security of any information you transmit or disclose to us and cannot be responsible for
          the theft, destruction, or inadvertent disclosure of that information. In the event of any
          breach, we will post a notice on the App.
        </p>
      </div>
    )

    return this.renderTerm({ index: index, title: title, body: body })
  }

  public renderUseOfInformation(index) {
    const title = 'Use of Information'
    const body = (
      <div>
        <div className={classes.term} />
        <p>We may use information that we collect through the App for the following purposes:</p>
        <ol className={classes.list}>
          <li>
            <p>To conduct demographic analysis on our users; </p>
          </li>

          <li>
            <p>
              To provide information you request and respond to correspondence that we receive from
              you;
            </p>
          </li>

          <li>
            <p>
              To review usage of certain features in the app, like map usage or popular fishing
              regions;
            </p>
          </li>

          <li>
            <p>
              As otherwise described to you at the point of collection and subject to your consent.
            </p>
          </li>
        </ol>
      </div>
    )

    return this.renderTerm({ index: index, title: title, body: body })
  }

  public renderDisclosureOfInformation(index) {
    const title = 'Disclosure of your information'
    const body = (
      <div>
        <div className={classes.term} />
        <p>
          <span className={classes.alert}>It is our general policy not to share your information with third parties.</span> We do reserve
          the right to share your information with third parties in the following limited
          circumstances:
        </p>
        <ol className={classes.list}>
          <li>
            <p>
              In order to protect the legal rights, safety, and security of Stuart Anderson LLC;
            </p>
          </li>

          <li>
            <p>To enforce our Terms of Service;</p>
          </li>

          <li>
            <p>
              To comply with or respond to law enforcement or legal process or a request for
              cooperation by a government or other entity, whether or not legally required.
            </p>
          </li>
        </ol>
      </div>
    )

    return this.renderTerm({ index: index, title: title, body: body })
  }

  public renderPrivacyPolicyUpdates(index) {
    const title = 'Privacy Policy Updates'
    const body = (
      <div>
        <p>
          We may modify this Privacy Policy at any time by posting revisions here. Your continued
          use of the App after any modification constitutes your acceptance of the updated Policy.
          Please check back often.
        </p>
      </div>
    )

    return this.renderTerm({ index: index, title: title, body: body })
  }

  public renderContact(index) {
    const title = 'Contact'
    const body = (
      <div key={index}>
        <div />
        <p>
          Please contact us at{' '}
          <a className={classes.link} href="mailto:troutspotr@gmail.com">
            troutspotr@gmail.com
          </a>{' '}
          if you have any questions, comments or requests regarding this Privacy Policy.{' '}
        </p>
      </div>
    )

    return this.renderTerm({ index: index, title: title, body: body })
  }

  public renderKeen(index) {
    const url = 'https://keen.io/privacy-policy/'
    return (
      <div key={index}>
        <p>This app uses Keen.io to track usage - not users.</p>
        <p>
          Read their privacy policy here:{' '}
          <a className={classes.link} rel="noopener noreferrer" target="_blank" href={url}>
            {url}
          </a>
        </p>
      </div>
    )
  }

  public renderDoNotTrack(index) {
    const url = 'https://allaboutdnt.com/'
    return (
      <div key={index}>
        <p>Our app honors your browsers’ Do Not Track settings.</p>
        <p>
          Read more here:{' '}
          <a className={classes.link} rel="noopener noreferrer" target="_blank" href={url}>
            {url}
          </a>
        </p>
      </div>
    )
  }

  public renderButtonText() {
    const { isAgreementShown } = this.state
    if (isAgreementShown === false) {
      return 'Show Privacy Policy'
    }

    return 'Agree and Finish'
  }

  public renderButton() {
    const { preambleIsFinished } = this.state
    if (preambleIsFinished === false) {
      return null
    }

    return (
      <button className={classes.button} onClick={this.onButtonClick}>
        {this.renderButtonText()}
      </button>
    )
  }

  public onButtonClick = () => {
    const { preambleIsFinished } = this.state
    const { isAgreementShown } = this.state
    if (preambleIsFinished && isAgreementShown === false) {
      setTimeout(() => {
        this.setState({ isAgreementShown: true })
      }, 0)
    } else {
      const ellapsed = +new Date() - +this.state.time
      this.props.advance(ellapsed)
    }
  }

  public generateTerms() {
    const { isAgreementShown } = this.state
    if (isAgreementShown === false) {
      return []
    }

    return [
      this.renderCollection.bind(this),
      this.renderIpAddress.bind(this),
      this.renderCookies.bind(this),
      this.renderDataSecurity.bind(this),
      this.renderUseOfInformation.bind(this),
      this.renderDisclosureOfInformation.bind(this),
      this.renderPrivacyPolicyUpdates.bind(this),
      this.renderContact.bind(this),
      this.renderKeen.bind(this),
      this.renderDoNotTrack.bind(this),
      index => <p key={index}>Last Updated: January 20, 2017</p>,
    ]
  }

  public renderBody = () => {
    const terms = this.generateTerms().map((termGenerator, index) => termGenerator(index + 1))

    return (
      <div className={classes.preambleContainer}>
        {this.renderIntro()}
        <ul>{terms}</ul>

        {this.renderButton()}
        <div className={classes.shieldDown} />
      </div>
    )
  }

  public render() {
    return (
      <div>
        {this.renderPreamble()}
        {this.renderBody()}
      </div>
    )
  }
}
