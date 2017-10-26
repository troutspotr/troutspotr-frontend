import classes from './Agreement.scss'
import React from 'react'
import PropTypes from 'prop-types'

export const ButtonComponent = props => {
  return <button {...props} className={classes.button} >{props.children}</button>
}

ButtonComponent.propTypes = {
  children: PropTypes.node,
}

export default ButtonComponent
