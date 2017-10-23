import React from 'react'
import PropTypes from 'prop-types'
const SvgAnimatedCircle = (props) => (
  <path
    className={props.cssName}
    cx={props.coordinates[0]}
    cy={props.coordinates[1]}
    r={props.radius}
  />
)

SvgAnimatedCircle.propTypes = {
  'cssName': PropTypes.string.isRequired,
  'coordinates': PropTypes.array.isRequired,
  'radius': PropTypes.number.isRequired,
}

export default SvgAnimatedCircle
