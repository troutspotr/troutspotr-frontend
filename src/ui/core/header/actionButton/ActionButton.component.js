import React, { PropTypes } from 'react'
import classes from './ActionButton.scss'

const ActionButtonComponent = (props) => {
  return (
    <span
      className={props.isActive ? classes.backButton : classes.inactive}
      onClick={props.click}
    >
      {props.children}
    </span>
  )
}

ActionButtonComponent.propTypes = {
  children: PropTypes.element,
  isActive: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired
}

export default ActionButtonComponent
