import React, { PropTypes } from 'react'
import classes from './ActionButton.scss'

const ActionButtonComponent = React.createClass({
  propTypes: {
    onClick: PropTypes.func.isRequried,
    children: PropTypes.element,
    isActive: PropTypes.bool.isRequried
  },

  onClick () {

  },

  render () {
    return (
      <span
        className={this.props.isActive ? classes.backButton : classes.inactive}
        onClick={this.props.onClick}>
        {this.props.children}
      </span>
    )
  }
})
export default ActionButtonComponent

/*
<span className={classes.chevronContainer}>
          <span className={classes.chevron + ' ' + classes.left} />
        </span>

*/
