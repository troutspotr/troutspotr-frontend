import * as React from 'react'
import AccessPointComponent from 'ui/routes/@usState/@region/@stream/details/AccessPoint.component'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
const classes = require('./MapOverlay.scss')
const AccessPointClasses = require('ui/routes/@usState/@region/@stream/details/Details.scss')

export class AccessPointDetails extends React.Component<any> {
  protected renderPublicAccess(selectedAccessPoint: any) {
    return (
      <AccessPointComponent
        accessPoint={selectedAccessPoint}
        streamObject={this.props.selectedStream}
        selectedClass={AccessPointClasses.selectedPublicBridgeTroutStream}
        defaultClass={AccessPointClasses.publicBridgeTroutStream}
        isSelected
        isHovered={false}
        location={null}
        onHover={() => {}}
      />
    )
  }

  protected renderPrivateAccess(selectedAccessPoint) {
    return (
      <div>
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
      </div>
    )
  }

  protected renderUnsafeToPark(selectedAccessPoint) {
    return (
      <AccessPointComponent
        accessPoint={selectedAccessPoint}
        streamObject={this.props.selectedStream}
        selectedClass={AccessPointClasses.selectedUnsafeBridgeOverTroutStream}
        defaultClass={AccessPointClasses.unsafeBridgeOverTroutStream}
        isSelected
        isHovered={false}
        location={null}
        onHover={() => {}}
      />
    )
  }

  protected renderAccessPoint() {
    const { selectedAccessPoint } = this.props
    const { bridgeType } = selectedAccessPoint.properties
    if (bridgeType === 'publicTrout') {
      return this.renderPublicAccess(selectedAccessPoint)
    } else if (bridgeType === 'permissionRequired') {
      return this.renderPrivateAccess(selectedAccessPoint)
    } else if (bridgeType === 'unsafe') {
      return this.renderUnsafeToPark(selectedAccessPoint)
    }

    return null
  }

  public render() {
    return (
      <div className={classes.container}>
        <RegulationsSummaryContainer streamObject={this.props.selectedStream} />
        {this.renderAccessPoint()}
      </div>
    )
  }
}
export default AccessPointDetails
