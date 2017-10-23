import React from 'react'
import PropTypes from 'prop-types'

const SvgAnimatedPathComponent = (props) => (
  <path className={props.cssName} d={props.path} />
)

SvgAnimatedPathComponent.propTypes = {
  'cssName': PropTypes.string.isRequired,
  'path': PropTypes.string.isRequired,
}

export default SvgAnimatedPathComponent
