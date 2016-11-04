import React, { PropTypes } from 'react'
import classes from './BackButton.scss'
import { Link } from 'react-router'

const BackButtonComponent = React.createClass({
  propTypes: {
    previous:  PropTypes.string,
    isEnabled: PropTypes.bool.isRequired,

    expandMinimap: PropTypes.func.isRequired
  },

  onClick () {

  },

  render () {
    let { previous, isEnabled } = this.props
    return (
      <Link to={previous} className={isEnabled ? classes.backButton : classes.inactive}>
        <span className={classes.chevronContainer}>
          <span className={classes.chevron + ' ' + classes.left} />
        </span>
      </Link>
    )
  }
})
export default BackButtonComponent
