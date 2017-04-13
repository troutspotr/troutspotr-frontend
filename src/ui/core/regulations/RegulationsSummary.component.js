import React, { PropTypes, Component } from 'react'
import classes from './RegulationsSummary.scss'
// import { Link } from 'react-router'
/* eslint no-unneeded-ternary: 0 */
/* eslint-disable camelcase */

class RegulationsSummary extends Component {
  getIsOpenStatus (streamObject) {
    return this.props.getSummary(streamObject)
  }

  renderOpenClosedHelper ({ statusClass, statusText, explainerText, dateText }) {
    return (
      <div className={classes.container}>
        <span className={statusClass}>
          {statusText} until {dateText}
        </span>
        <span> {explainerText}</span>
      </div>)
  }

  renderOpenOrClosed (streamObject) {
    let now = new Date()

    let {
      hasRegulationThatOverridesOpenSeason,
      isOpenSeason,
      openers,
      closestOpener,
      openSeasonOverrides } = this.getIsOpenStatus(streamObject)
    if (isOpenSeason === false && hasRegulationThatOverridesOpenSeason === false) {
      // plain vanilla closed. Get lost, bub.
      let openerDate = streamObject.stream.properties.openers.filter(x => x.start_time > now)
      let dateText = openerDate.length >= 1
        ? openerDate[0].start_time.toLocaleDateString('en-US') + '.'
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
      let dateText = openers[0].end_time.toLocaleDateString('en-US') + '.'
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
      let explainerText = openSeasonOverrides[0].properties.restriction.shortText
      let hasCloseOpener = closestOpener != null
      let dateText = hasCloseOpener
        ? closestOpener.start_time.toLocaleDateString('en-US') + '.'
        : openSeasonOverrides[0].properties.end_time.toLocaleDateString('en-US') + '.'
      let args = {
        statusClass: classes.openCaution,
        statusText: 'Closed with exceptions',
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
  }

  render () {
    let { streamObject } = this.props
    return this.renderOpenOrClosed(streamObject)
  }
}

RegulationsSummary.propTypes = {
  streamObject: PropTypes.object.isRequired,
  getSummary: PropTypes.func.isRequired
}

export default RegulationsSummary
