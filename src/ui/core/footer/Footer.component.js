import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './Footer.scss'
import { MAP, LIST } from 'ui/@state/@region/Region.state'
// import {
//   REGION_PARAM_NAME,
//   STATE_PARAM_NAME,
//   STREAM_PARAM_NAME
// } from 'ui/core/RouteConstants.js'

const FooterComponent = React.createClass({
  propTypes: {
    params:  PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    setViewToMap: PropTypes.func.isRequired,
    setViewToList: PropTypes.func.isRequired
  },

  onClick () {

  },

  render () {
    let { view } = this.props
    return (<div className={classes.footer}>
      <button onClick={this.props.setViewToList} className={view === LIST ? classes.selected : classes.item}>List</button>
      <button onClick={this.props.setViewToMap} className={view === MAP ? classes.selected : classes.item}>Map</button>
      <Link to={'/'} className={classes.item}>Help</Link>
    </div>)
  }
})
export default FooterComponent
