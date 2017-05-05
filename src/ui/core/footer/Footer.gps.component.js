import React, { PropTypes, Component } from 'react'
import classes from './Footer.scss'
/* eslint-disable react/prefer-stateless-function */
let GPS_ELEMENT_ID = 'js-footer-gps-id'
class FooterGpsComponent extends Component {
  handleActivateGpsClick = e => {
    this.props.startGpsTracking()
  }

  handleDeactivateGpsClick = e => {
    this.props.stopGpsTracking()
  }

  handleChange = e => {
    e.preventDefault()
    let { checked } = e.target
    if (checked) {
      return this.handleActivateGpsClick()
    } else {
      return this.handleDeactivateGpsClick()
    }
  }

  renderSliderText () {
    let { isGpsActiveButLoading, isGpsActiveAndSuccessful, isGpsFailed } = this.props
    let isChecked = isGpsActiveButLoading || isGpsActiveAndSuccessful
    let leftText = isGpsActiveAndSuccessful ? 'On'
      : isGpsActiveButLoading ? 'Wait' : 'On'
    let rightText = isGpsFailed ? 'Fail' : 'Off'
    let className = isChecked ? classes.sliderTextMove : classes.sliderText
    return (
      <span className={className}>
        <span className={classes.left}>{leftText}</span>
        <span className={classes.middle} />
        <span className={classes.right}>{rightText}</span>
      </span>
    )
  }

  render () {
    let { isGpsTrackingSupported, isGpsActiveButLoading, isGpsActiveAndSuccessful, isGpsFailed } = this.props
    if (isGpsTrackingSupported === false) {
      return null
    }
    let isInactive = isGpsActiveButLoading
    let isChecked = isGpsActiveButLoading || isGpsActiveAndSuccessful
    let switchClassName = classes.switch
    return (
      <div className={classes.gpsContainer} >
        <div className={classes.gpsContent}>
          <label htmlFor={GPS_ELEMENT_ID}>GPS</label>
          <label htmlFor={GPS_ELEMENT_ID} className={`${switchClassName} ${isGpsFailed ? classes.fail : ''}`}>
            <input
              id={GPS_ELEMENT_ID}
              disabled={isInactive}
              type='checkbox'
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
  isGpsTrackingSupported: PropTypes.bool.isRequired,
  // status: PropTypes.string.isRequired,
  // isGpsTrackingActive: PropTypes.bool.isRequired,
  // gpsCoordinateFeature: PropTypes.object,
  isGpsActiveButLoading: PropTypes.bool.isRequired,
  isGpsActiveAndSuccessful: PropTypes.bool.isRequired,
  startGpsTracking: PropTypes.func.isRequired,
  stopGpsTracking: PropTypes.func.isRequired,
  isGpsFailed: PropTypes.bool.isRequired
}

export default FooterGpsComponent
