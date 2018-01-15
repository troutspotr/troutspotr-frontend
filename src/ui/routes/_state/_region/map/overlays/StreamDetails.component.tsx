import * as React from 'react'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
import { PublicBridgesComponent } from 'ui/core/streamDetails/PublicBridges.component'

export interface IStreamDetailsComponentProps {
  selectedStream: any
}

export class StreamDetailsComponent extends React.PureComponent<IStreamDetailsComponentProps> {
  public render() {
    const { selectedStream } = this.props
    const bridgeCount = selectedStream.accessPoints.filter(
      x => x.properties.is_over_trout_stream && x.properties.is_over_publicly_accessible_land
    ).length

    return (
      <div>
        <RegulationsSummaryContainer streamObject={selectedStream} />
        <PublicBridgesComponent count={bridgeCount} />
      </div>
    )
  }
}
