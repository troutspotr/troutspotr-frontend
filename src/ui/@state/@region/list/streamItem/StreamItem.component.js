import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './StreamItem.scss'
import MicroMapContainer from 'ui/core/microMap/MicroMap.container'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
/* eslint-disable camelcase */
const StreamItemComponent = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    streamObject: PropTypes.object.isRequired,
    getWaters: PropTypes.func.isRequired
  },

  renderOpenOrClosed (streamObject) {
    return (<RegulationsSummaryContainer streamObject={streamObject} />)
  },

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
  },

  render () {
    let { title, url, streamObject } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.media}>
          <MicroMapContainer
            streamObject={streamObject}
            id={streamObject.stream.properties.slug + '-canvas'} />
        </div>

        <div className={classes.body}>
          <Link to={url} className={classes.header}>
            {title}
          </Link>
          {this.renderOpenOrClosed(streamObject)}
          {this.renderOpenBridges(streamObject)}
        </div>
      </div>)
  }
})
export default StreamItemComponent
