import React, { PropTypes } from 'react'
import classes from './ActionButton.scss'

const ActionButtonComponent = React.createClass({
  propTypes: {
    children: PropTypes.element,
    isActive: PropTypes.bool.isRequired,
    click: PropTypes.func.isRequired
  },

  render () {
    return (
      <span
        className={this.props.isActive ? classes.backButton : classes.inactive}
        onClick={this.props.click}>
        {this.props.children}
      </span>
    )
  }
})
export default ActionButtonComponent
