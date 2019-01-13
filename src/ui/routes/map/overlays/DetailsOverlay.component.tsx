import * as React from 'react'
const classes = require('./MapOverlay.scss')
import { AccessPointDetails } from './accessPoint/AccessPointDetails.component'
import { RegionDetailsComponent } from './region/RegionDetails.component'
import { StreamDetailsContainer } from './stream/StreamDetails.container'
import { RegulationsReminderContainer } from 'ui/routes/map/overlays/stream/reminder/RegulationsReminder.container'

import isEmpty from 'lodash-es/isEmpty'
import { IStreamObject } from 'coreTypes/IStreamObject'

export interface IDetailsOverlayComponent {
  visibleTroutStreams: any
  selectedAccessPoint: any
  selectedStream: IStreamObject
}

export class DetailsOverlayComponent extends React.Component<IDetailsOverlayComponent> {
  protected renderRegionDetails() {
    const { selectedStream, selectedAccessPoint } = this.props
    const isVisible = isEmpty(selectedStream) && isEmpty(selectedAccessPoint)
    if (isVisible === false) {
      return null
    }

    return <React.Fragment>
      <RegulationsReminderContainer />
      <RegionDetailsComponent />
    </React.Fragment>
  }

  protected renderStreamDetails() {
    const { selectedStream, selectedAccessPoint } = this.props
    const isVisible = isEmpty(selectedStream) === false && isEmpty(selectedAccessPoint)
    if (isVisible === false) {
      return null
    }

    return <StreamDetailsContainer />
  }

  protected renderAccessPointDetails() {
    const { selectedStream, selectedAccessPoint } = this.props
    const isVisible = isEmpty(selectedStream) === false && isEmpty(selectedAccessPoint) === false
    if (isVisible === false) {
      return null
    }

    return (
      <AccessPointDetails
        selectedStream={selectedStream}
        selectedAccessPoint={selectedAccessPoint}
      />
    )
  }

  public render() {
    if (isEmpty(this.props.visibleTroutStreams)) {
      return null
    }

    return (
      <div className={classes.container}>
        {this.renderRegionDetails()}
        {this.renderStreamDetails()}
        {this.renderAccessPointDetails()}
      </div>
    )
  }
}
