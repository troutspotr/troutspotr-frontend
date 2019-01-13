import * as React from 'react'
import { PublicBridgesComponent, IPublicBridgesComponent } from 'ui/core/streamDetails/PublicBridges.component'
import { RegulationsSummaryLayout, IRegulationsSummaryLayout } from 'ui/core/regulations/RegulationsSummary.layout';
import { RegulationsReminderContainer } from 'ui/routes/map/overlays/stream/reminder/RegulationsReminder.container'
export interface IStreamDetailsComponentProps extends IPublicBridgesComponent, IRegulationsSummaryLayout { }

export class StreamDetailsComponent extends React.PureComponent<IStreamDetailsComponentProps> {
  public render() {
    return (
      <div>
        <RegulationsReminderContainer />
        <PublicBridgesComponent count={this.props.count} />
      </div>
    )
  }
}
