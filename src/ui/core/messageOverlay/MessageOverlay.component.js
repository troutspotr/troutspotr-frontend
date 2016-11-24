import React, { PropTypes } from 'react'
import classes from './MessageOverlay.scss'
// import { Link } from 'react-router'

const MessageOverlay = React.createClass({
  propTypes: {
    position: PropTypes.string.isRequired,
    children: PropTypes.element
  },

  render () {
    let { position, children } = this.props
    let className = classes[position]
    return (
      <div className={className}>
        {children}
      </div>)
  }
})
export default MessageOverlay
