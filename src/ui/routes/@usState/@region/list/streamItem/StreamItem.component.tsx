import * as React from 'react'
const classes = require('./StreamItem.scss')
import { RegulationsSummary } from 'ui/core/regulations/RegulationsSummary.component'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { DEFAULT_MICROMAP_CANVAS_SETTINGS } from 'ui/core/micromap/Micromap.settings'
import { IMiscRegsProperties } from 'ui/core/regulations/RegulationsSummary.selectors'
import { MicroMapComponentCanvas } from 'ui/core/micromap/canvas/Micromap.component.canvas'
import { StreamItemLayout } from 'ui/routes/@usState/@region/list/streamItem/StreamItem.layout'
import { BridgeSummaryComponent } from './BridgeSummary.component'

export interface IStreamItemBodyProps {
  stream: IStreamObject
}

export class StreamItemBodyComponent extends React.Component<IStreamItemBodyProps> {
  public renderOpenOrClosed(streamObject: IStreamObject, getSummary) {
    if (getSummary == null) {
      throw new Error('getSummary not defined')
    }
    return <RegulationsSummary getSummary={getSummary} streamObject={streamObject} />
  }

  public renderOpenBridges(streamObject: IStreamObject) {
    return <BridgeSummaryComponent stream={streamObject} />
  }

  private getSummary(streamObject: IStreamObject): IMiscRegsProperties {
    const fakeOpener = {
      start_time: new Date(),
      end_time: new Date(),
      id: 123,
      water_id: 123,
      restriction_id: 123,
      restriction: {
        id: 123,
        sourceId: 'asdf',
        shortText: 'asdf',
        legalText: 'lkjsdf',
      },
    }
    return {
      hasRegulationThatOverridesOpenSeason: false,
      isOpenSeason: true,
      openSeasonOverrides: [],
      openers: [fakeOpener],
      closestOpener: fakeOpener,
    }
  }

  public render() {
    const { stream } = this.props
    return (
      <div className={classes.body}>
        {this.renderOpenOrClosed(stream, this.getSummary)}
        {this.renderOpenBridges(stream)}
      </div>
    )
  }
}

export interface IStreamItemProps {
  stream: IStreamObject
  isVisible: boolean
  url: string
}

export class StreamItemComponent extends React.PureComponent<IStreamItemProps> {
  public render() {
    const { stream, isVisible } = this.props
    const id = stream.stream.properties.gid + stream.stream.properties.name
    const title = <div className={classes.header}>{stream.stream.properties.name}</div>
    const canvas = (
      <MicroMapComponentCanvas
        settings={DEFAULT_MICROMAP_CANVAS_SETTINGS}
        id={id}
        streamObject={this.props.stream}
      />
    )

    const body = <StreamItemBodyComponent stream={stream} />
    return (
      <StreamItemLayout
        isVisible={isVisible}
        title={title}
        micromap={canvas}
        body={body}
        link={'#'}
      />
    )
  }
}
