import * as React from 'react'
const classes = require('./Footer.gps.scss')
const GPS_ELEMENT_ID = 'js-footer-gps-id'

export interface IGpsDispatchProps {
  startGpsTracking(): void
  stopGpsTracking(): void
}
export interface IGpsComponentStateProps {
  isGpsTrackingSupported: boolean
  isGpsActiveButLoading: boolean
  isGpsActiveAndSuccessful: boolean
  isGpsFailed: boolean
}

export interface IGpsComponentProps extends IGpsDispatchProps, IGpsComponentStateProps {}

export class FooterGpsComponent extends React.PureComponent<IGpsComponentProps> {
  public handleActivateGpsClick = () => {
    this.props.startGpsTracking()
  }

  public handleDeactivateGpsClick = () => {
    this.props.stopGpsTracking()
  }

  public handleChange = e => {
    e.preventDefault()
    const { checked } = e.target
    if (checked) {
      return this.handleActivateGpsClick()
    }
    return this.handleDeactivateGpsClick()
  }

  public renderSliderText() {
    const { isGpsActiveButLoading, isGpsActiveAndSuccessful, isGpsFailed } = this.props
    const isChecked = isGpsActiveButLoading || isGpsActiveAndSuccessful
    const leftText = isGpsActiveAndSuccessful ? 'On' : isGpsActiveButLoading ? 'Wait' : 'On'
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

  public render() {
    const {
      isGpsTrackingSupported,
      isGpsActiveButLoading,
      isGpsActiveAndSuccessful,
      isGpsFailed,
    } = this.props
    if (isGpsTrackingSupported === false) {
      return null
    }
    const isInactive = isGpsActiveButLoading
    const isChecked = isGpsActiveButLoading || isGpsActiveAndSuccessful
    const switchClassName = classes.switch
    return (
      <div className={classes.gpsContainer}>
        <div className={classes.gpsContent}>
          <label htmlFor={GPS_ELEMENT_ID}>GPS</label>
          <label
            htmlFor={GPS_ELEMENT_ID}
            className={`${switchClassName} ${isGpsFailed ? classes.fail : ''}`}
          >
            <input
              id={GPS_ELEMENT_ID}
              disabled={isInactive}
              type="checkbox"
              checked={isChecked}
              onChange={this.handleChange}
            />
            <div className={`${classes.slider} ${classes.round}`}>{this.renderSliderText()}</div>
          </label>
        </div>
      </div>
    )
  }
}
