import React, { PropTypes } from 'react'
import classes from './Header.scss'
import { Link } from 'react-router'

const BackButtonComponent = React.createClass({
  propTypes: {
    previous:  PropTypes.string,
    isEnabled: PropTypes.bool.isRequired
  },

  onClick () {

  },

  render () {
    let to = this.props.previous
    return (
      <Link to={to} className={classes.backButton}>
        <span className={classes.chevronContainer}>
          <span className={classes.chevron + ' ' + classes.left} />
        </span>
      </Link>
    )
  }
})
export default BackButtonComponent
