import React, { Component } from 'react'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
import PublicBridgesComponent from 'ui/core/streamDetails/PublicBridges.component'

class Region extends Component {
  renderStreamDetailsOverlay () {
    let { selectedStream } = this.props
    let number = selectedStream.accessPoints
      .filter(x => x.properties.is_over_trout_stream && x.properties.is_over_publicly_accessible_land)
      .length

    return (
      <div>
        <RegulationsSummaryContainer
          streamObject={selectedStream}
        />
        <PublicBridgesComponent
          number={number}
        />
      </div>)
  }

  render () {
    return this.renderStreamDetailsOverlay()
  }
}

Region.propTypes = {
  selectedStream: React.PropTypes.object.isRequired
}

export default Region
