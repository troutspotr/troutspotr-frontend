import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './Footer.scss'
import {
  REGION_PARAM_NAME,
  STATE_PARAM_NAME,
  STREAM_PARAM_NAME
} from 'ui/core/RouteConstants.js'

const FooterComponent = React.createClass({
  propTypes: {
    params:  PropTypes.object.isRequired
  },

  onClick () {

  },

  createRoute (view) {
    let { params } = this.props
    let selectedRegion = params[REGION_PARAM_NAME]
    let selectedState = params[STATE_PARAM_NAME]
    let selectedStreamId = params[STREAM_PARAM_NAME]

    let rootUrl = `/${selectedState}/${selectedRegion}/${view}`

    if (selectedStreamId == null) {
      return rootUrl
    }

    let urlWithStreamId = `${rootUrl}/${selectedStreamId}`
    return urlWithStreamId
  },

  render () {
    console.log(this.props.params)
    return (<div className={classes.footer}>
      <Link to={this.createRoute('list')} className={classes.item}>List</Link>
      <Link to={this.createRoute('map')} className={classes.item}>Map</Link>
      <Link to={'/'} className={classes.item}>Help</Link>
    </div>)
  }
})
export default FooterComponent
