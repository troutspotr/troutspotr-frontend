import React, { PropTypes, Component } from 'react'
import classes from './TermsOfAgreement.scss'
class ThankYouComponent extends Component {
  renderTitle () {
    return (
      <div className={classes.thanksContainer}>
        <div className={classes.thanks}>Thanks.</div>
        <div className={classes.fishing}>{"Let's go fishing!"}</div>
      </div>)
  }

  componentDidMount () {
    setTimeout(() => this.props.acceptTerms('true'), 2000)
  }

  render () {
    return (<div>
      {this.renderTitle()}
    </div>)
  }
}

ThankYouComponent.propTypes = {
  acceptTerms: PropTypes.func.isRequired
}

export default ThankYouComponent
