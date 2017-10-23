import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './MapOverlay.scss'
import RestrictionComponent from 'ui/core/regulations/Restriction.component'
import MessageOverlay from 'ui/core/messageOverlay/MessageOverlay.component'
import {isEmpty} from 'lodash'
class RegulationsOverlayComponent extends Component {
  renderSpecialRegulationsOverlay () {
    const {selectedStream, specialRegulationsCurrentSeason} = this.props
    if (isEmpty(selectedStream) || specialRegulationsCurrentSeason.length === 0) {
      return null
    }
    const specialRegulationsElement = (<div>
      <div className={classes.specialRegulationsTitle}>Special Regulations</div>
      {
        specialRegulationsCurrentSeason.map((reg, index) => {
          const id = `${reg.restrictionId}_${reg.streamId}`
          return (<RestrictionComponent
            key={id}
            color={reg.color}
            pattern={reg.isFishSanctuary ? 'solid' : 'stipple'}
            text={reg.legalText}
            length={`${reg.roundedLength} mi`}
          />)
        })
      }
    </div>)

    return (
      <MessageOverlay position="bottom">
        {specialRegulationsElement}
      </MessageOverlay>)
  }

  render () {
    return this.renderSpecialRegulationsOverlay()
  }
}

RegulationsOverlayComponent.propTypes = {
  'selectedStream': PropTypes.object,
  'specialRegulationsCurrentSeason': PropTypes.array.isRequired,
}

export default RegulationsOverlayComponent
