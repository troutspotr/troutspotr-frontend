import React, { Component } from 'react'
import classes from './MapOverlay.scss'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
import AccessPointComponent from 'ui/@state/@region/@stream/details/AccessPoint.component'
import AccessPointClasses from 'ui/@state/@region/@stream/details/Details.scss'

// import { round } from 'lodash'
// const BRIDGE_TYPES = {
//   publicTrout: {text: 'asdf', className: 'asdf'},
//   permissionRequired: {text: 'asdf', className: 'asdf'},
//   unsafe: {text: 'asdf', className: 'asdf'},
//   uninteresting: {text: 'asdf', className: 'asdf'}
// }
class AccessPointDetails extends Component {
  renderPublicAccess (selectedAccessPoint) {
    return (<AccessPointComponent
      accessPoint={selectedAccessPoint}
      streamObject={this.props.selectedStream}
      selectedClass={AccessPointClasses.selectedPublicBridgeTroutStream}
      defaultClass={AccessPointClasses.publicBridgeTroutStream}
      isSelected
      isHovered={false}
      location={null}
      onHover={() => {}}
            />)
  }

  renderPrivateAccess (selectedAccessPoint) {
    return (<div>
      <div className={classes.private}>Access requires landowner permission.</div>
      <AccessPointComponent
        accessPoint={selectedAccessPoint}
        streamObject={this.props.selectedStream}
        selectedClass={AccessPointClasses.selectedBridgeOverTroutStream}
        defaultClass={AccessPointClasses.bridgeOverTroutStream}
        isSelected
        isHovered={false}
        location={null}
        onHover={() => {}}
      />
    </div>)
  }

  renderUnsafeToPark (selectedAccessPoint) {
    return (<AccessPointComponent
      accessPoint={selectedAccessPoint}
      streamObject={this.props.selectedStream}
      selectedClass={AccessPointClasses.selectedUnsafeBridgeOverTroutStream}
      defaultClass={AccessPointClasses.unsafeBridgeOverTroutStream}
      isSelected
      isHovered={false}
      location={null}
      onHover={() => {}}
            />)
  }

  renderAccessPoint () {
    let { selectedAccessPoint } = this.props
    let { bridgeType } = selectedAccessPoint.properties
    if (bridgeType === 'publicTrout') {
      return this.renderPublicAccess(selectedAccessPoint)
    } else if (bridgeType === 'permissionRequired') {
      return this.renderPrivateAccess(selectedAccessPoint)
    } else if (bridgeType === 'unsafe') {
      return this.renderUnsafeToPark(selectedAccessPoint)
    }

    return null
  }

  render () {
    return (<div className={classes.container}>
      <RegulationsSummaryContainer streamObject={this.props.selectedStream} />
      {this.renderAccessPoint()}
    </div>)
  }
}

AccessPointDetails.propTypes = {
  selectedStream: React.PropTypes.object.isRequired,
  selectedAccessPoint: React.PropTypes.object.isRequired
}

export default AccessPointDetails
