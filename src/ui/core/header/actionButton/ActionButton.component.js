import React from 'react'
import PropTypes from 'prop-types'
import classes from './ActionButton.scss'

const ActionButtonComponent = (props) => (
  <span
    className={props.isActive ? classes.backButton : classes.inactive}
    onClick={props.click}
  >
    {props.children}
  </span>
)

ActionButtonComponent.propTypes = {
  'children': PropTypes.element,
  'isActive': PropTypes.bool.isRequired,
  'click': PropTypes.func.isRequired,
}

export default ActionButtonComponent
