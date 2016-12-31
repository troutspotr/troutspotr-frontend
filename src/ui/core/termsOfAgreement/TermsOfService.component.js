import React, { PropTypes } from 'react'
import classes from './TermsOfAgreement.scss'
// import { Link } from 'react-router'

const TermsOfServiceApp = React.createClass({
  propTypes: {
    onAgree: PropTypes.func.isRequired,
    onDisagree: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired
  },

  renderTitle () {
    return (<div>title</div>)
  },

  renderPreamble () {
    return (<div>preamble</div>)
  },

  renderTerms () {
    return (<div>terms</div>)
  },

  renderAgreement () {
    return (<button onClick={this.props.onAgree}>title</button>)
  },

  render () {
    return (<div className={classes.container}>
      {this.renderTitle()}
      {this.renderPreamble()}
      {this.renderTerms()}
      {this.renderAgreement()}
    </div>)
  }
})
export default TermsOfServiceApp
