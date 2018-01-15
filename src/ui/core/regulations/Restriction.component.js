import React from 'react'
import PropTypes from 'prop-types'
import classes from './Restriction.scss'
/* eslint no-unneeded-ternary: 0 */

const RestrictionComponent = (props) => {
  const {color, pattern, text, length} = props
  const colorClass = classes[color]
  const patternClass = classes[pattern]
  const hollow = props.hollow == null ? true : false
  const hollowClass = hollow ? classes.hollow : ''
  const heightMultiplier = props.heightMultiplier == null ? 0 : props.heightMultiplier
  const heightOverride = heightMultiplier > 0 ? {'height': `${heightMultiplier}em`} : {}
  return (
    <div className={classes.container}>
      <span style={heightOverride} className={`${patternClass} ${colorClass} ${hollowClass}`} />
      <span className={classes.length}>{length}</span>
      <span className={classes.definition}>{text}</span>
    </div>)
}

RestrictionComponent.propTypes = {
  'color': PropTypes.string.isRequired,
  'pattern': PropTypes.string.isRequired,
  'text': PropTypes.string.isRequired,
  'length': PropTypes.string,
  'hollow': PropTypes.bool,
  'heightMultiplier': PropTypes.number,
}

export default RestrictionComponent
