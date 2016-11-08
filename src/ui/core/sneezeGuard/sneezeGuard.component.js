import React, { PropTypes } from 'react'
import classes from './SneezeGuard.scss'
// import { Link } from 'react-router'

const SneezeGuardComponent = React.createClass({
  propTypes: {
    close: PropTypes.func
  },

  onClick () {
    if (this.props.close) {
      this.props.close()
    }
  },

  render () {
    return (<span onClick={this.onClick} className={classes.sneezeGuard} />)
  }
})
export default SneezeGuardComponent
