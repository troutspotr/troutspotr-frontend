import React from 'react'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
import PublicBridgesComponent from 'ui/core/streamDetails/PublicBridges.component'
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
      <div>
        <RegulationsSummaryContainer
          streamObject={selectedStream} />
        <PublicBridgesComponent
          number={number} />
      </div>)
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  render () {
    return this.renderStreamDetailsOverlay()
  }
})
export default Region
