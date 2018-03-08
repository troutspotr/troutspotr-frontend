import * as React from 'react'
// import { Link } from 'react-router'
const classes = require('./StreamItem.scss')
// import MicroMapContainer from 'ui/core/microMap/MicroMap.container'
import RegulationsSummaryComponent from 'ui/core/regulations/RegulationsSummary.component'
/* eslint-disable camelcase */

export class StreamItemBodyComponent extends React.Component<{}> {
  public renderOpenOrClosed(streamObject, getSummary) {
    if (getSummary == null) {
      throw new Error('getSummary not defined')
    }
    return <RegulationsSummaryComponent getSummary={getSummary} streamObject={streamObject} />
  }

  public renderOpenBridges(streamObject) {
    const { publicTroutBridgeCount, bridgeText } = streamObject.stream.properties
    return (
      <div>
        {publicTroutBridgeCount > 0 && (
          <span className={classes.publicBridgesBadge}>{publicTroutBridgeCount}</span>
        )}
        {bridgeText}
      </div>
    )
  }

  public render() {
    const { title, streamObject } = this.props
    return (
      <div className={classes.body}>
        <div className={classes.header}>{title}</div>
        {this.renderOpenOrClosed(streamObject, this.props.getSummary)}
        {this.renderOpenBridges(streamObject)}
      </div>
    )
  }
}

// StreamItemBodyComponent.propTypes = {
//   title: PropTypes.string.isRequired,
//   streamObject: PropTypes.object.isRequired,
//   getSummary: PropTypes.func.isRequired,
// }

class StreamItemComponent extends React.PureComponent<{}> {
  public render() {
    // const { title, url, streamObject, getSummary } = this.props
    return null
    // return (
    //   <Link
    //     to={url}
    //     className={classes.container}
    //     data-stream-gid={streamObject.stream.properties.gid}
    //   >
    //     <div className={classes.media}>
    //       <MicroMapContainer
    //         id={`${streamObject.stream.properties.slug}-canvas`}
    //         isVisible={this.props.isVisible}
    //         streamObject={streamObject}
    //       />
    //     </div>
    //     <StreamItemBodyComponent
    //       title={title}
    //       streamObject={streamObject}
    //       getSummary={getSummary}
    //     />
    //   </Link>
    // )
  }
}

// StreamItemComponent.propTypes = {
//   title: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   streamObject: PropTypes.object.isRequired,
//   isVisible: PropTypes.bool.isRequired,
//   getSummary: PropTypes.func.isRequired,
// }

export default StreamItemComponent
