import classes from './Agreement.scss'
import React from 'react'

export const ButtonComponent = props => {
  return <button {...props} className={classes.button} >{props.children}</button>
}

export default ButtonComponent
