import * as React from 'react'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
import AccessPointComponent from '../../../@usState/@region/@stream/details/AccessPoint.component'
import { IStreamObject } from 'coreTypes/IStreamObject'
const classes = require('../MapOverlay.scss')
const AccessPointClasses = require('ui/routes/@usState/@region/@stream/details/Details.scss')
import { LinemapContainer } from 'ui/routes/map/overlays/stream/linemap/Linemap.container'

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
        isSelected={true}
        isHovered={false}
        onHover={null}
      />
    )
  }

  protected renderPrivateAccess(selectedAccessPoint) {
    return (
      <div>
        <AccessPointComponent
          accessPoint={selectedAccessPoint}
          selectedClass={AccessPointClasses.selectedBridgeOverTroutStream}
          defaultClass={AccessPointClasses.bridgeOverTroutStream}
          isSelected={true}
          isHovered={false}
          onHover={null}
        />
        <div className={classes.private}>Access requires landowner permission.</div>
      </div>
    )
  }

  protected renderUnsafeToPark(selectedAccessPoint) {
    return (
      <AccessPointComponent
        accessPoint={selectedAccessPoint}
        selectedClass={AccessPointClasses.selectedUnsafeBridgeOverTroutStream}
        defaultClass={AccessPointClasses.unsafeBridgeOverTroutStream}
        isSelected={true}
        isHovered={false}
        onHover={null}
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
      <React.Fragment>
        <LinemapContainer />
        <div style={{marginTop: '5px'}}>
          {/* <RegulationsSummaryContainer streamObject={this.props.selectedStream} /> */}
          {this.renderAccessPoint()}
        </div>
      </React.Fragment>
    )
  }
}
