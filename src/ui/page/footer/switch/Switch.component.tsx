import * as React from 'react'
const classes = require('./Switch.scss')

const getId = (label: string) => {
  return `js-footer-gps-id-${label}`
}
export interface ISwitchLabels {
  onText: string
  waitText: string
  failedText: string
  offText: string
  labelText: string
}

const SWITCH_LABEL_DEFAULTS: ISwitchLabels = {
  onText: 'On',
  waitText: 'Wait',
  failedText: 'Failed',
  offText: 'Off',
  labelText: 'GPS',
}

export interface ISwitchDispatchProps {
  startTracking(): any
  stopTracking(): any
}
export interface ISwitchComponentStateProps {
  isSupported: boolean
  isLoading: boolean
  isSuccessful: boolean
  isFailed: boolean
  labels?: ISwitchLabels
}

export interface ISwitchomponentProps extends ISwitchDispatchProps, ISwitchComponentStateProps {}

export class SwitchComponent extends React.PureComponent<ISwitchomponentProps> {
  public handleActivateSwitchClick = () => {
    this.props.startTracking()
  }

  public handleDeactivateClick = () => {
    this.props.stopTracking()
  }

  public handleChange = e => {
    const { checked } = e.target
    if (checked) {
      return this.handleActivateSwitchClick()
    }
    return this.handleDeactivateClick()
  }

  public renderSliderText() {
    const { isLoading, isSuccessful, isFailed } = this.props
    const { onText, waitText, failedText, offText } =
      this.props.labels == null ? SWITCH_LABEL_DEFAULTS : this.props.labels

    const isChecked = isLoading || isSuccessful
    const leftText = isSuccessful ? onText : isLoading ? waitText : onText
    const rightText = isFailed ? failedText : offText
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
    const { isSupported, isLoading, isSuccessful, isFailed } = this.props
    if (isSupported === false) {
      return null
    }
    const { labelText } = this.props.labels == null ? SWITCH_LABEL_DEFAULTS : this.props.labels

    const isInactive = isLoading
    const isChecked = isLoading || isSuccessful
    const switchClassName = classes.switch
    return (
      <div className={classes.gpsContainer}>
        <div className={classes.gpsContent}>
          <label htmlFor={getId(labelText)}>{labelText}</label>
          <label
            htmlFor={getId(labelText)}
            className={`${switchClassName} ${isFailed ? classes.fail : ''}`}
          >
            <input
              id={getId(labelText)}
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
