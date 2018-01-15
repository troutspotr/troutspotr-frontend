import * as React from 'react'
const classes = require('./StreamItem.scss')
import { round } from 'lodash'

const LengthRatioComponent = props => {
  const { troutLength, publicLength } = props

  return (
    <ul className={classes.microLength}>
      <li className={classes.trout}>{round(troutLength, 1)}</li>
      <li className={classes.marker}>:</li>
      <li className={classes.public}>{round(publicLength, 1)}</li>
    </ul>
  )
}

// LengthRatioComponent.propTypes = {
//   'troutLength': PropTypes.number.isRequired,
//   'publicLength': PropTypes.number.isRequired,
// }

export default LengthRatioComponent
