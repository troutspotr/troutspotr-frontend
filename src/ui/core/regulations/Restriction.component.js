import React, { PropTypes } from 'react'
import classes from './Restriction.scss'
/* eslint no-unneeded-ternary: 0 */

const RestrictionComponent = (props) => {
  let { color, pattern, text, length } = props
  let colorClass = classes[color]
  let patternClass = classes[pattern]
  let hollow = props.hollow == null ? true : false
  let hollowClass = hollow ? classes.hollow : ''
  let heightMultiplier = props.heightMultiplier == null ? 0 : props.heightMultiplier
  let heightOverride = heightMultiplier > 0 ? { height: heightMultiplier + 'em' } : {}
  return (
    <div className={classes.container}>
      <span style={heightOverride} className={patternClass + ' ' + colorClass + ' ' + hollowClass} />
      <span className={classes.length}>{length}</span>
      <span className={classes.definition}>{text}</span>
    </div>)
}

RestrictionComponent.propTypes = {
  color: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  length: PropTypes.string,
  hollow: PropTypes.bool,
  heightMultiplier: PropTypes.number
}

export default RestrictionComponent
