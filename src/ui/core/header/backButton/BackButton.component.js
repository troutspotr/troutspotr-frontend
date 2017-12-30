import React from 'react'
import PropTypes from 'prop-types'
import classes from './BackButton.scss'
import {Link} from 'react-router'

const BackButtonComponent = (props) => {
  const {previous, isEnabled} = props
  return (
    <Link to={previous} className={isEnabled ? classes.backButton : classes.inactive}>
      <span className={classes.chevronContainer}>
        <span className={`${classes.chevron} ${classes.left}`} />
      </span>
    </Link>
  )
}

BackButtonComponent.propTypes = {
  'previous': PropTypes.string,
  'isEnabled': PropTypes.bool.isRequired,
}

export default BackButtonComponent
