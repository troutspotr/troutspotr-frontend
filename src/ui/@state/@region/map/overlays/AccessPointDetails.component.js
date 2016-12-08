import React from 'react'
import classes from './MapOverlay.scss'
// import { round } from 'lodash'
const AccessPointDetails = React.createClass({
  propTypes: {
    selectedStream: React.PropTypes.object.isRequired,
    selectedAccessPoint: React.PropTypes.object.isRequired
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  render () {
    return (<div className={classes.container}>Access Point view</div>)
  }
})
export default AccessPointDetails
