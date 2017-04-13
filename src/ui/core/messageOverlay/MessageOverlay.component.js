import React, { PropTypes } from 'react'
import classes from './MessageOverlay.scss'

const MessageOverlay = (props) => {
  let { position, children } = props
  let className = classes[position]
  return (
    <div className={className}>
      {children}
    </div>)
}

MessageOverlay.propTypes = {
  position: PropTypes.string.isRequired,
  children: PropTypes.element
}

export default MessageOverlay
