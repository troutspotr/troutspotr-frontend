import React, { PropTypes } from 'react'
import classes from './TermsOfAgreement.scss'

const ThankYouComponent = React.createClass({
  propTypes: {
    acceptTerms: PropTypes.func.isRequired
  },

  renderTitle () {
    return (
      <div className={classes.thanksContainer}>
        <div className={classes.thanks}>Thanks.</div>
        <div className={classes.fishing}>Let's go fishing!</div>
      </div>)
  },

  componentDidMount () {
    setTimeout(() => this.props.acceptTerms('true'), 2000)
  },

  // renderPreamble () {
  //   return (<div className={classes.equation}>
  //     <div>
  //       <span className={classes.blue}>Trout Streams</span>
  //     </div>
  //     <div>
  //       <span className={classes.plus}>+</span>
  //       <span className={classes.green}>Public Land</span>
  //     </div>
  //     <div>
  //       <span className={classes.plus}>+</span>
  //       <span>Public Roads</span>
  //     </div>
  //     <hr />
  //     <div>
  //       <span className={classes.white}>Safe & Legal Fishing</span>
  //     </div>
  //   </div>)
  // },

  // renderPrivacyPolicy () {
  //   return <div>
  //     <p>asdf asdf asdfa sdf asf as</p>
  //   </div>
  // },

  render () {
    return (<div>
      {this.renderTitle()}
    </div>)
  }
})
export default ThankYouComponent
