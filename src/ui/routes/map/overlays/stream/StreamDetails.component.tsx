import * as React from 'react'
import { LinemapContainer } from 'ui/routes/map/overlays/stream/linemap/Linemap.container'
const styles = require('./StreamDetails.scss')
import { BadgeComponent, Color, Fill } from 'ui/core/badge/Badge.component';
import { IStreamObject } from 'coreTypes/IStreamObject';

export interface IStreamDetailsComponentProps {
  streamObject: IStreamObject,
}

export class StreamDetailsComponent extends React.PureComponent<IStreamDetailsComponentProps> {
  public render() {
    const things = this.props.streamObject.accessPoints.filter(x => x.properties.bridgeType === 'permissionRequired').length
    const things2 = this.props.streamObject.accessPoints.filter(x => x.properties.bridgeType === 'publicTrout').length
    return (
      <div className={styles.container}>
          <div className={styles.summary}>
            <div>
              <BadgeComponent badgeColor={Color.publiclyFishable} fillType={Fill.solid} content={things2}/> Public
            </div>
            <div>
              <BadgeComponent badgeColor={Color.privatelyFishable} fillType={Fill.solid} content={things}/> Private
            </div>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line}>
              <LinemapContainer />
            </div>
          </div>
        </div>
    )
  }
}
