import React, { PropTypes } from 'react'
import classes from './Restriction.scss'
// import { Link } from 'react-router'
/* eslint no-unneeded-ternary: 0 */
const RestrictionComponent = React.createClass({
  propTypes: {
    color: PropTypes.string.isRequired,
    pattern: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    length: PropTypes.string,
    hollow: PropTypes.bool,
    heightMultiplier: PropTypes.number
  },

  render () {
    let { color, pattern, text, length } = this.props
    let colorClass = classes[color]
    let patternClass = classes[pattern]
    let hollow = this.props.hollow == null ? true : false
    let hollowClass = hollow ? classes.hollow : ''
    let heightMultiplier = this.props.heightMultiplier == null ? 0 : this.props.heightMultiplier
    let heightOverride = heightMultiplier > 0 ? { height: heightMultiplier + 'em' } : {}
    console.log(heightOverride)
    return (
      <div className={classes.container}>
        <span style={heightOverride} className={patternClass + ' ' + colorClass + ' ' + hollowClass} />
        <span className={classes.length}>{length}</span>
        <span className={classes.definition}>{text}</span>
      </div>)
  }
})
export default RestrictionComponent
