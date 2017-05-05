import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import classes from './StreamItem.scss'
import MicroMapContainer from 'ui/core/microMap/MicroMap.container'
import RegulationsSummaryComponent from 'ui/core/regulations/RegulationsSummary.component'
import shallowCompare from 'shallow-compare'
/* eslint-disable camelcase */

class StreamItemBodyComponent extends Component {
  renderOpenOrClosed (streamObject, getSummary) {
    if (getSummary == null) {
      throw new Error('getSummary not defined')
    }
    return (<RegulationsSummaryComponent getSummary={getSummary} streamObject={streamObject} />)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  renderOpenBridges (streamObject) {
    let number = streamObject.accessPoints
      .filter(x => x.properties.bridgeType === 'publicTrout')
      .length

    let bridgeClass = classes.publicBridgesBadge

    let noun = number === 1 ? ' bridge' : ' bridges'
    let countSymbol = number === 0
      ? 'No'
      : (<span className={bridgeClass}>{number}</span>)
    return (
      <div>
        {countSymbol}{noun} over publically fishable land.
      </div>)
  }

  render () {
    let { title, streamObject } = this.props
    return (
      <div className={classes.body}>
        <div className={classes.header}>{title}</div>
        {this.renderOpenOrClosed(streamObject, this.props.getSummary)}
        {this.renderOpenBridges(streamObject)}
      </div>)
  }
}

StreamItemBodyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  streamObject: PropTypes.object.isRequired
}

class StreamItemComponent extends Component {
  renderOpenBridges (streamObject) {
    let number = streamObject.accessPoints
      .filter(x => x.properties.bridgeType === 'publicTrout')
      .length

    let bridgeClass = classes.publicBridgesBadge

    let noun = number === 1 ? ' bridge' : ' bridges'
    let countSymbol = number === 0
      ? 'No'
      : (<span className={bridgeClass}>{number}</span>)
    return (
      <div>
        {countSymbol}{noun} over publically fishable land.
      </div>)
  }

  render () {
    let { title, url, streamObject, getSummary } = this.props
    return (
      <Link to={url} className={classes.container}>
        <div className={classes.media}>
          <MicroMapContainer
            id={streamObject.stream.properties.slug + '-canvas'}
            isVisible={this.props.isVisible}
            streamObject={streamObject}
          />
        </div>
        <StreamItemBodyComponent
          title={title}
          streamObject={streamObject}
          getSummary={getSummary}
        />
      </Link>
    )
  }
}

StreamItemComponent.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  streamObject: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired
}

export default StreamItemComponent
