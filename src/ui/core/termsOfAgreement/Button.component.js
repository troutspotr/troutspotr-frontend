import classes from './Agreement.scss'
import React from 'react'

export const ButtonComponent = props => {
  return <button className={classes.button} onClick={() => {console.log('hello')}}>{props.children}</button>
}

export default ButtonComponent
