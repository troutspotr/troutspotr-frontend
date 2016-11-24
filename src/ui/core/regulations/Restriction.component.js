import React, { PropTypes } from 'react'
import classes from './Restriction.scss'
// import { Link } from 'react-router'

const RestrictionComponent = React.createClass({
  propTypes: {
    color: PropTypes.string.isRequired,
    pattern: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    length: PropTypes.string
  },

  render () {
    let { color, pattern, text, length } = this.props
    let colorClass = classes[color]
    let patternClass = classes[pattern]
    console.log(classes, classes.yellow, classes[pattern])
    return (
      <div className={classes.container}>
        <span className={classes.symbol + ' ' + colorClass + ' ' + patternClass} />
        <span className={classes.length}>{length}</span>
        <span className={classes.definition}>{text}</span>
      </div>)
  }
})
export default RestrictionComponent
