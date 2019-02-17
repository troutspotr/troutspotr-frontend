import * as React from 'react'
import { IPublicBridgesComponent } from 'ui/core/streamDetails/PublicBridges.component'
import { LinemapContainer } from 'ui/routes/map/overlays/stream/linemap/Linemap.container'
export interface IStreamDetailsComponentProps extends IPublicBridgesComponent { }

export class StreamDetailsComponent extends React.PureComponent<IStreamDetailsComponentProps> {
  public render() {
    return (
      <LinemapContainer />
    )
  }
}
