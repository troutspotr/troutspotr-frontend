import React, { PropTypes, Component } from 'react'
import classes from './Footer.scss'
import { MAP, LIST } from 'ui/core/Core.state'
import { isEmpty } from 'lodash'
/* eslint-disable react/prefer-stateless-function */

class FooterGpsComponent extends Component {
  constructor () {
    super()
  }

  handleActivateGpsClick = e => {
    this.props.startGpsTracking()
  }

  handleDeactivateGpsClick = e => {
    this.props.stopGpsTracking()
  }

  renderButton = (props) => {
    let { isGpsTrackingActive, isGpsActiveButLoading, isGpsActiveAndSuccessful } = props
    if (isGpsActiveButLoading) {
      return <span className={classes.gps}>Activating…</span>
    }

    if (isGpsActiveAndSuccessful) {
      return <span onClick={this.handleDeactivateGpsClick} className={classes.gps}>Deactive Gps</span>
    }

    return <span onClick={this.handleActivateGpsClick} className={classes.gps}>Activate GPS</span>
  }

  render () {
    let { isGpsTrackingSupported } = this.props
    if (isGpsTrackingSupported === false) {
      return null
    }

    return this.renderButton(this.props)
  }
}

FooterGpsComponent.propTypes = {
  isGpsTrackingSupported: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  isGpsTrackingActive: PropTypes.bool.isRequired,
  gpsCoordinateFeature: PropTypes.object,
  isGpsActiveButLoading: PropTypes.bool.isRequired,
  isGpsActiveAndSuccessful: PropTypes.bool.isRequired,
  startGpsTracking: PropTypes.func.isRequired,
  stopGpsTracking: PropTypes.func.isRequired
}

export default FooterGpsComponent
