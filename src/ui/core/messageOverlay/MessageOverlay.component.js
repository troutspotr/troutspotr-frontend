import React from 'react'
import PropTypes from 'prop-types'
import classes from './MessageOverlay.scss'

const MessageOverlay = (props) => {
  const {position, children} = props
  const className = classes[position]
  return (
    <div className={className}>
      {children}
    </div>)
}

MessageOverlay.propTypes = {
  'position': PropTypes.string.isRequired,
  'children': PropTypes.element,
}

export default MessageOverlay
