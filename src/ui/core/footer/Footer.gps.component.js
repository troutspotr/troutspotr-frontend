import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Footer.scss'
/* eslint-disable react/prefer-stateless-function */
const GPS_ELEMENT_ID = 'js-footer-gps-id'
class FooterGpsComponent extends Component {
  handleActivateGpsClick = (e) => {
    this.props.startGpsTracking()
  }

  handleDeactivateGpsClick = (e) => {
    this.props.stopGpsTracking()
  }

  handleChange = (e) => {
    e.preventDefault()
    const {checked} = e.target
    if (checked) {
      return this.handleActivateGpsClick()
    }
    return this.handleDeactivateGpsClick()
  }

  renderSliderText () {
    const {isGpsActiveButLoading, isGpsActiveAndSuccessful, isGpsFailed} = this.props
    const isChecked = isGpsActiveButLoading || isGpsActiveAndSuccessful
    const leftText = isGpsActiveAndSuccessful ? 'On'
      : isGpsActiveButLoading ? 'Wait' : 'On'
    const rightText = isGpsFailed ? 'Fail' : 'Off'
    const className = isChecked ? classes.sliderTextMove : classes.sliderText
    return (
      <span className={className}>
        <span className={classes.left}>{leftText}</span>
        <span className={classes.middle} />
        <span className={classes.right}>{rightText}</span>
      </span>
    )
  }

  render () {
    const {isGpsTrackingSupported, isGpsActiveButLoading, isGpsActiveAndSuccessful, isGpsFailed} = this.props
    if (isGpsTrackingSupported === false) {
      return null
    }
    const isInactive = isGpsActiveButLoading
    const isChecked = isGpsActiveButLoading || isGpsActiveAndSuccessful
    const switchClassName = classes.switch
    return (
      <div className={classes.gpsContainer} >
        <div className={classes.gpsContent}>
          <label htmlFor={GPS_ELEMENT_ID}>GPS</label>
          <label htmlFor={GPS_ELEMENT_ID} className={`${switchClassName} ${isGpsFailed ? classes.fail : ''}`}>
            <input
              id={GPS_ELEMENT_ID}
              disabled={isInactive}
              type="checkbox"
              checked={isChecked}
              onChange={this.handleChange}
            />
            <div className={`${classes.slider} ${classes.round}`}>
              {this.renderSliderText()}
            </div>
          </label>
        </div>
      </div>
    )
  }
}

FooterGpsComponent.propTypes = {
  'isGpsTrackingSupported': PropTypes.bool.isRequired,
  'isGpsActiveButLoading': PropTypes.bool.isRequired,
  'isGpsActiveAndSuccessful': PropTypes.bool.isRequired,
  'startGpsTracking': PropTypes.func.isRequired,
  'stopGpsTracking': PropTypes.func.isRequired,
  'isGpsFailed': PropTypes.bool.isRequired,
}

export default FooterGpsComponent
