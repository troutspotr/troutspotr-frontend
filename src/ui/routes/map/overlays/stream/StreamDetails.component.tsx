import * as React from 'react'
import { PublicBridgesComponent, IPublicBridgesComponent } from 'ui/core/streamDetails/PublicBridges.component'
import { RegulationsSummaryLayout, IRegulationsSummaryLayout } from 'ui/core/regulations/RegulationsSummary.layout';

export interface IStreamDetailsComponentProps extends IPublicBridgesComponent, IRegulationsSummaryLayout { }

export class StreamDetailsComponent extends React.PureComponent<IStreamDetailsComponentProps> {
  public render() {
    return (
      <div>
        <RegulationsSummaryLayout { ...this.props } />
        <PublicBridgesComponent count={this.props.count} />
      </div>
    )
  }
}
