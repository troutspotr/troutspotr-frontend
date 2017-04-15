import React, { PropTypes, Component } from 'react'
import classes from './MapOverlay.scss'
import RestrictionComponent from 'ui/core/regulations/Restriction.component'
import MessageOverlay from 'ui/core/messageOverlay/MessageOverlay.component'
import { isEmpty } from 'lodash'
class RegulationsOverlayComponent extends Component {
  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  }

  renderSpecialRegulationsOverlay () {
    let { selectedStream, specialRegulationsCurrentSeason } = this.props
    if (isEmpty(selectedStream) || specialRegulationsCurrentSeason.length === 0) {
      return null
    }
    let specialRegulationsElement = (<div>
      <div className={classes.specialRegulationsTitle}>Special Regulations</div>
      {
        specialRegulationsCurrentSeason.map((reg, index) => {
          let id = `${reg.restrictionId}_${reg.streamId}`
          return (<RestrictionComponent
            key={id}
            color={reg.isFishSanctuary ? 'red' : reg.isOpenerOverride ? 'blue' : 'yellow'}
            pattern={reg.isFishSanctuary ? 'solid' : 'stipple'}
            text={reg.legalText}
            length={reg.roundedLength + ' mi'}
                  />)
        })
      }
    </div>)

    return (
      <MessageOverlay position='bottom'>
        {specialRegulationsElement}
      </MessageOverlay>)
  }

  render () {
    return this.renderSpecialRegulationsOverlay()
  }
}

RegulationsOverlayComponent.propTypes = {
  selectedStream: PropTypes.object,
  specialRegulationsCurrentSeason: PropTypes.array.isRequired
}

export default RegulationsOverlayComponent
