import * as React from 'react'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { Color, Fill, BadgeComponent } from 'ui/core/badge/Badge.component'

export interface IBridgeSummaryProps {
  stream: IStreamObject
}
const PLURAL = 'bridges over publicly fishable land.'
const SINGULAR = 'bridge over publicly fishable land.'
const ONE_BRIDGE = '1'
export class BridgeSummaryComponent extends React.Component<IBridgeSummaryProps> {
  public render() {
    const content =
      this.props.stream.stream.properties.publicTroutBridgeCount === 0
        ? '0'
        : this.props.stream.stream.properties.publicTroutBridgeCount + ''
    if (content.length === 0) {
      console.log(content)
    }
    const badgeColor =
      this.props.stream.stream.properties.publicTroutBridgeCount === 0
        ? Color.unsafeToFish
        : Color.publiclyFishable
    const fillType = Fill.hollow
    const text = content === ONE_BRIDGE ? SINGULAR : PLURAL
    return (
      <span>
        <BadgeComponent badgeColor={badgeColor} fillType={fillType} content={content} /> {text}
      </span>
    )
  }
}
