import React, { PropTypes } from 'react'
import classes from './RegulationsSummary.scss'
// import { Link } from 'react-router'
/* eslint no-unneeded-ternary: 0 */
/* eslint-disable camelcase */
const RegulationsSummary = React.createClass({
  propTypes: {
    streamObject: PropTypes.object.isRequired,
    getSummary: PropTypes.func.isRequired
  },

  getIsOpenStatus (streamObject) {
    return this.props.getSummary(streamObject)
  },

  renderOpenClosedHelper ({ statusClass, statusText, explainerText, dateText }) {
    return (
      <div className={classes.container}>
        <span className={statusClass}>
          {statusText}
        </span>
        {explainerText}until {dateText}
      </div>)
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

  render () {
    let { streamObject } = this.props
    return this.renderOpenOrClosed(streamObject)
  }
})
export default RegulationsSummary
