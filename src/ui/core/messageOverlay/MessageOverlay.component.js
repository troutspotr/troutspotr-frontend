import React, { PropTypes } from 'react'
import classes from './MessageOverlay.scss'
// import { Link } from 'react-router'

const MessageOverlay = React.createClass({
  propTypes: {
    position: PropTypes.string.isRequired,
    interactive: PropTypes.bool,
    children: PropTypes.element
  },

  render () {
    let { position, children } = this.props
    let className = classes[position]
    let isInteractive = (this.props.interactive || false)
    let interactiveClass = isInteractive ? classes.interactive : ''
    return (
      <div className={`${className} ${interactiveClass}`}>
        {children}
      </div>)
  }
})
export default MessageOverlay
