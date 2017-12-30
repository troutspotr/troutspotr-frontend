import React from 'react'
import PropTypes from 'prop-types'
import classes from './PublicBridges.scss'
// Import { Link } from 'react-router'

const PublicBridgesComponent = (props) => {
  const {number} = props
  const noun = number === 1 ? ' bridge' : ' bridges'
  const countSymbol = number === 0
    ? 'No'
    : (<span className={classes.publicBridgesBadge}>{number}</span>)
  return (
    <div>
      <span className={classes.text}>{countSymbol} {noun} over publically fishable land.</span>
    </div>)
}

PublicBridgesComponent.propTypes = {'number': PropTypes.number.isRequired}

export default PublicBridgesComponent
