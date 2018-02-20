import * as React from 'react'
const classes = require('./MapOverlay.scss')
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component'
import { AccessPointDetails } from './AccessPointDetails.component'
import RegionDetails from './RegionDetails.component'
import { StreamDetailsComponent } from './StreamDetails.component'

import isEmpty from 'lodash-es/isEmpty'

export interface IDetailsOverlayComponent {
  visibleTroutStreams: any
  selectedAccessPoint: any
  selectedStream: any
}

class DetailsOverlayComponent extends React.Component<IDetailsOverlayComponent> {
  protected renderRegionDetails() {
    const { selectedStream, selectedAccessPoint } = this.props
    const isVisible = isEmpty(selectedStream) && isEmpty(selectedAccessPoint)
    if (isVisible === false) {
      return null
    }

    return <RegionDetails />
  }

  protected renderStreamDetails() {
    const { selectedStream, selectedAccessPoint } = this.props
    const isVisible = isEmpty(selectedStream) === false && isEmpty(selectedAccessPoint)
    if (isVisible === false) {
      return null
    }

    return <StreamDetailsComponent selectedStream={selectedStream} />
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
      <MessageOverlayComponent position="top">
        <div className={classes.container}>
          {this.renderRegionDetails()}
          {this.renderStreamDetails()}
          {this.renderAccessPointDetails()}
        </div>
      </MessageOverlayComponent>
    )
  }
}

export { DetailsOverlayComponent }
