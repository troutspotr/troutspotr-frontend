import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './StreamItem.scss'
import MicroMapComponent from 'ui/core/microMap/MicroMap.component'
// import BubbleComponent from './Bubble.component'
// import { some } from 'lodash'
/* eslint-disable camelcase */
const StreamItemComponent = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    streamObject: PropTypes.object.isRequired
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  renderOpenClosedHelper ({ statusClass, statusText, explainerText, dateText }) {
    return (
      <div>
        <span className={statusClass}>
          {statusText}
        </span>
        {explainerText} until {dateText}
      </div>)
  },

  getIsOpenStatus (streamObject) {
    let { stream } = streamObject
    let now = new Date()
    if (stream.properties.water_id === 3) {

    }
    let openers = streamObject.stream.properties.openers.filter(opener => {
      let { end_time, start_time } = opener
      let isWithinBounds = now < end_time && now >= start_time
      return isWithinBounds
    })

    let isOpenSeason = openers.length >= 1

    let openSeasonOverrides = streamObject.restrictions.filter(restriction => {
      let { end_time, start_time } = restriction.properties
      if (end_time == null || start_time == null) {
        return false
      }

      let isWithinBounds = now < end_time && now >= start_time
      return isWithinBounds
    })

    let hasRegulationThatOverridesOpenSeason = openSeasonOverrides.length >= 1

    return {
      hasRegulationThatOverridesOpenSeason,
      isOpenSeason,
      openSeasonOverrides,
      openers
    }
  },

  renderOpenOrClosed (streamObject) {
    let now = new Date()
    let {
      hasRegulationThatOverridesOpenSeason,
      isOpenSeason,
      openers,
      openSeasonOverrides } = this.getIsOpenStatus(streamObject)
    // let { stream, restrictions } = streamObject

    if (isOpenSeason === false && hasRegulationThatOverridesOpenSeason === false) {
      // plain vanilla closed. Get lost, bub.
      let openerDate = streamObject.stream.properties.openers.filter(x => x.start_time > now)
      let dateText = openerDate.length >= 1
        ? openerDate[0].start_time.toLocaleDateString('en-US')
        : 'an unknown date. Call the DNR for more details.'

      let args = {
        statusClass: classes.closed,
        statusText: 'Closed',
        explainerText: '',
        dateText
      }

      return this.renderOpenClosedHelper(args)
    }

    if (isOpenSeason && hasRegulationThatOverridesOpenSeason === false) {
      // it's plain vanilla open. Go nuts.
      let dateText = openers[0].end_time.toLocaleDateString('en-US')
      let args = {
        statusClass: classes.open,
        statusText: 'Open',
        explainerText: openers[0].restriction.shortText,
        dateText
      }

      return this.renderOpenClosedHelper(args)
    }

    if (isOpenSeason === false && hasRegulationThatOverridesOpenSeason) {
      // it's closed, but there's an exception. Be careful.

      let explainerText = 'but ' + openSeasonOverrides[0].properties.restriction.shortText
      let dateText = openSeasonOverrides[0].properties.end_time.toLocaleDateString('en-US')

      let args = {
        statusClass: classes.openCaution,
        statusText: 'Closed',
        explainerText,
        dateText
      }

      return this.renderOpenClosedHelper(args)
    }

    if (isOpenSeason && hasRegulationThatOverridesOpenSeason) {
      // it's open, but there's exceptions.
      let explainerText = 'but with exceptions'

      let dateText = openSeasonOverrides[0].properties.end_time.toLocaleDateString('en-US')

      let args = {
        statusClass: classes.openCaution,
        statusText: 'Open',
        explainerText,
        dateText
      }

      return this.renderOpenClosedHelper(args)
    }

    throw new Error('not covered')
  },

  renderOpenBridges (streamObject) {
    // if (isClosed) {
    //   return null
    // }

    let {
      hasRegulationThatOverridesOpenSeason,
      isOpenSeason } = this.getIsOpenStatus(streamObject)
    let number = streamObject.accessPoints
      .filter(x => x.properties.is_over_trout_stream && x.properties.is_over_publicly_accessible_land)
      .length

    let isDull = hasRegulationThatOverridesOpenSeason === false && isOpenSeason === false
    let bridgeClass = isDull
      ? classes.publicBridgesBadgeDull
      : classes.publicBridgesBadge

    let noun = number === 1 ? ' bridge' : ' bridges'
    let countSymbol = number === 0
      ? 'No'
      : (<span className={bridgeClass}>{number}</span>)
    return (
      <div>
        {countSymbol} {noun} over publically fishable land.
      </div>)
  },

  render () {
    let { title, url, streamObject } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.media}>
          <MicroMapComponent
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
