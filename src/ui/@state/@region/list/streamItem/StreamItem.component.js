import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
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
    const {publicTroutBridgeCount, bridgeText} = streamObject.stream.properties
    return (
      <div>
        {publicTroutBridgeCount > 0 && <span className={classes.publicBridgesBadge}>{publicTroutBridgeCount}</span>}
        {bridgeText}
      </div>)
  }

  render () {
    const {title, streamObject} = this.props
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
  streamObject: PropTypes.object.isRequired,
  getSummary: PropTypes.func.isRequired,
}

class StreamItemComponent extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const {title, url, streamObject, getSummary} = this.props
    return (
      <Link to={url} className={classes.container}>
        <div className={classes.media}>
          <MicroMapContainer
            id={`${streamObject.stream.properties.slug}-canvas`}
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
  isVisible: PropTypes.bool.isRequired,
  getSummary: PropTypes.func.isRequired,
}

export default StreamItemComponent
