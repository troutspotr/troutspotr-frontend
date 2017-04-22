import React from 'react'
import classes from './StreamItem.scss'
import { round } from 'lodash'

const LengthRatioComponent = (props) => {
  let { troutLength, publicLength } = props

  return (
    <ul className={classes.microLength}>
      <li className={classes.trout}>{round(troutLength, 1)}</li>
      <li className={classes.marker}>:</li>
      <li className={classes.public}>{round(publicLength, 1)}</li>
    </ul>)
}

LengthRatioComponent.propTypes = {
  troutLength: React.PropTypes.number.isRequired,
  publicLength: React.PropTypes.number.isRequired
}

export default LengthRatioComponent
