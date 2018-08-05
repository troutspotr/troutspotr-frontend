import * as React from 'react'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
import AccessPointComponent from '../../../@usState/@region/@stream/details/AccessPoint.component'
import { IStreamObject } from 'coreTypes/IStreamObject'
const classes = require('../MapOverlay.scss')
const AccessPointClasses = require('ui/routes/@usState/@region/@stream/details/Details.scss')

// tslint:disable-next-line:no-any
export interface IAccessPointProps {
  selectedStream: IStreamObject
  selectedAccessPoint: any
}
export class AccessPointDetails extends React.Component<IAccessPointProps> {
  protected renderPublicAccess(selectedAccessPoint: any) {
    return (
      <AccessPointComponent
        accessPoint={selectedAccessPoint}
        selectedClass={AccessPointClasses.selectedPublicBridgeTroutStream}
        defaultClass={AccessPointClasses.publicBridgeTroutStream}
        isSelected
        isHovered={false}
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
          selectedClass={AccessPointClasses.selectedBridgeOverTroutStream}
          defaultClass={AccessPointClasses.bridgeOverTroutStream}
          isSelected
          isHovered={false}
          onHover={() => {}}
        />
      </div>
    )
  }

  protected renderUnsafeToPark(selectedAccessPoint) {
    return (
      <AccessPointComponent
        accessPoint={selectedAccessPoint}
        selectedClass={AccessPointClasses.selectedUnsafeBridgeOverTroutStream}
        defaultClass={AccessPointClasses.unsafeBridgeOverTroutStream}
        isSelected
        isHovered={false}
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
