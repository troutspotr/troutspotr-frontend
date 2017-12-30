import React, {Component} from 'react'
import PropTypes from 'prop-types'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
import PublicBridgesComponent from 'ui/core/streamDetails/PublicBridges.component'

class Region extends Component {
  renderStreamDetailsOverlay () {
    const {selectedStream} = this.props
    const number = selectedStream.accessPoints
      .filter((x) => x.properties.is_over_trout_stream && x.properties.is_over_publicly_accessible_land)
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

Region.propTypes = {'selectedStream': PropTypes.object.isRequired}

export default Region
