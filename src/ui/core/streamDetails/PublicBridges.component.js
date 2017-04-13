import React, { PropTypes } from 'react'
import classes from './PublicBridges.scss'
// import { Link } from 'react-router'

const PublicBridgesComponent = (props) => {
  let { number } = props
  let noun = number === 1 ? ' bridge' : ' bridges'
  let countSymbol = number === 0
    ? 'No'
    : (<span className={classes.publicBridgesBadge}>{number}</span>)
  return (
    <div>
      <span className={classes.text}>{countSymbol} {noun} over publically fishable land.</span>
    </div>)
}

PublicBridgesComponent.propTypes = {
  number: PropTypes.number.isRequired
}

export default PublicBridgesComponent
