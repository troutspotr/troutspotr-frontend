import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './StreamItem.scss'
// import BubbleComponent from './Bubble.component'

const StreamItemComponent = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    streamObject: PropTypes.object.isRequired
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  renderOpenOrClosed (streamObject, isClosed) {
    let { stream, restrictions } = streamObject
    
    let openOrClosed = {
      text: isClosed ? 'Closed' : 'Open',
      className: isClosed ? classes.closed : classes.open
    }

    let date = new Date(Date.UTC(2017, 11, 20, 3, 0, 0))
    let options = {}
    let dateText = date.toLocaleDateString('en-US', options)
    console.log(dateText)

    return (
      <div>
        <span className={openOrClosed.className}>
          {openOrClosed.text}
        </span>
        until {dateText}
      </div>)
  },

  renderOpenBridges (streamObject, isClosed) {
    if (isClosed) {
      return null
    }
    let number = streamObject.accessPoints
      .filter(x => x.properties.is_over_trout_stream && x.properties.is_over_publicly_accessible_land)
      .length

    let noun = number === 1 ? ' bridge' : ' bridges'
    let countSymbol = number === 0
      ? 'No'
      : (<span className={classes.publicBridgesBadge}>{number}</span>)
    return (
      <div>
        {countSymbol} {noun} over publically fishable land.
      </div>)
  },

  render () {
    let { title, url, streamObject } = this.props
    let isClosed = Math.random() > 0.8
    return (
      <div className={classes.container}>
        <Link to={url} className={classes.header}>
          {title}
        </Link>
        {this.renderOpenOrClosed(streamObject, isClosed)}
        {this.renderOpenBridges(streamObject, isClosed)}
      </div>)
  }
})
export default StreamItemComponent
