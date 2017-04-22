import React, { PropTypes } from 'react'

const SvgAnimatedPathComponent = (props) => {
  return (
    <path className={props.cssName} d={props.path} />
  )
}

SvgAnimatedPathComponent.propTypes = {
  cssName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}

export default SvgAnimatedPathComponent
