import React, { PropTypes } from 'react'
import classes from './BackButton.scss'
import { Link } from 'react-router'

const BackButtonComponent = (props) => {
  let { previous, isEnabled } = props
  return (
    <Link to={previous} className={isEnabled ? classes.backButton : classes.inactive}>
      <span className={classes.chevronContainer}>
        <span className={classes.chevron + ' ' + classes.left} />
      </span>
    </Link>
  )
}

BackButtonComponent.propTypes = {
  previous:  PropTypes.string,
  isEnabled: PropTypes.bool.isRequired
}

export default BackButtonComponent
