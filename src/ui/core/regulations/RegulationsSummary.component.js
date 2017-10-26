import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './RegulationsSummary.scss'
// Import { Link } from 'react-router'
/* eslint no-unneeded-ternary: 0 */
/* eslint-disable camelcase */

class RegulationsSummary extends Component {
  getIsOpenStatus (streamObject) {
    return this.props.getSummary(streamObject)
  }

  renderOpenClosedHelper ({statusClass, statusText, explainerText, dateText}) {
    return (
      <div className={classes.container}>
        <span className={statusClass}>
          {statusText} until {dateText}
        </span>
        <span> {explainerText}</span>
      </div>)
  }

  renderOpenOrClosed (streamObject) {
    const now = new Date()

    const {
      hasRegulationThatOverridesOpenSeason,
      isOpenSeason,
      openers,
      closestOpener,
      openSeasonOverrides,
    } = this.getIsOpenStatus(streamObject)
    if (isOpenSeason === false && hasRegulationThatOverridesOpenSeason === false) {
      // Plain vanilla closed. Get lost, bub.
      const openerDate = streamObject.stream.properties.openers.filter((x) => x.start_time > now)
      const dateText = openerDate.length >= 1
        ? `${openerDate[0].start_time.toLocaleDateString('en-US')}.`
        : 'an unknown date. Call the DNR for more details.'

      const args = {
        'statusClass': classes.closed,
        'statusText': 'Closed',
        'explainerText': '',
        dateText,
      }

      return this.renderOpenClosedHelper(args)
    }

    if (isOpenSeason && hasRegulationThatOverridesOpenSeason === false) {
      // It's plain vanilla open. Go nuts.
      const dateText = `${openers[0].end_time.toLocaleDateString('en-US')}.`
      const args = {
        'statusClass': classes.open,
        'statusText': 'Open',
        'explainerText': openers[0].restriction.shortText,
        dateText,
      }

      return this.renderOpenClosedHelper(args)
    }

    if (isOpenSeason === false && hasRegulationThatOverridesOpenSeason) {
      // It's closed, but there's an exception. Be careful.
      const explainerText = openSeasonOverrides[0].properties.restriction.shortText
      const hasCloseOpener = closestOpener != null
      const dateText = hasCloseOpener
        ? `${closestOpener.start_time.toLocaleDateString('en-US')}.`
        : `${openSeasonOverrides[0].properties.end_time.toLocaleDateString('en-US')}.`
      const args = {
        'statusClass': classes.openCaution,
        'statusText': 'Closed with exceptions',
        explainerText,
        dateText,
      }

      return this.renderOpenClosedHelper(args)
    }

    if (isOpenSeason && hasRegulationThatOverridesOpenSeason) {
      // It's open, but there's exceptions.
      const explainerText = 'but with exceptions'

      const dateText = openSeasonOverrides[0].properties.end_time.toLocaleDateString('en-US')

      const args = {
        'statusClass': classes.openCaution,
        'statusText': 'Open',
        explainerText,
        dateText,
      }

      return this.renderOpenClosedHelper(args)
    }

    throw new Error('not covered')
  }

  render () {
    const {streamObject} = this.props
    return this.renderOpenOrClosed(streamObject)
  }
}

RegulationsSummary.propTypes = {
  'streamObject': PropTypes.object.isRequired,
  'getSummary': PropTypes.func.isRequired,
}

export default RegulationsSummary
