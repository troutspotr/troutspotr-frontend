import React from 'react'
import markerClasses from 'ui/core/regulations/Restriction.scss'
// import classes from './StreamDetails.scss'
// import classes from './MapOverlay.scss'
import PublicBridgesComponent from 'ui/core/streamDetails/PublicBridges.component'
// import { round } from 'lodash'
const Region = React.createClass({
  propTypes: {
    selectedStream: React.PropTypes.object.isRequired
  },

  renderStreamDetailsOverlay () {
    let { selectedStream } = this.props
    let number = selectedStream.accessPoints
      .filter(x => x.properties.is_over_trout_stream && x.properties.is_over_publicly_accessible_land)
      .length

    return (
      <PublicBridgesComponent
        number={number} />)
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  render () {
    return this.renderStreamDetailsOverlay()
  }
})
export default Region
