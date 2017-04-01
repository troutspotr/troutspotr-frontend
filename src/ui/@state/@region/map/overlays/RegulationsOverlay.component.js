import React, { PropTypes } from 'react'
import classes from './MapOverlay.scss'
import RestrictionComponent from 'ui/core/regulations/Restriction.component'
import MessageOverlay from 'ui/core/messageOverlay/MessageOverlay.component'
import { isEmpty } from 'lodash'

// import { round } from 'lodash'
const RegulationsOverlayComponent = React.createClass({
  propTypes: {
    selectedStream: PropTypes.object,
    specialRegulationsCurrentSeason: PropTypes.array.isRequired
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  renderSpecialRegulationsOverlay () {
    let { selectedStream, specialRegulationsCurrentSeason } = this.props
    if (isEmpty(selectedStream) || specialRegulationsCurrentSeason.length === 0) {
      return null
    }
    let specialRegulationsElement = (<div>
      <div className={classes.specialRegulationsTitle}>Special Regulations</div>
      {
        specialRegulationsCurrentSeason.map((reg, index) => {
          return (<RestrictionComponent
            key={index}
            color={reg.isFishSanctuary ? 'red' : reg.isOpenerOverride ? 'blue' : 'yellow'}
            pattern={reg.isFishSanctuary ? 'solid' : 'stipple'}
            text={reg.legalText}
            length={reg.roundedLength + ' mi'} />)
        })
      }
    </div>)

    return (
      <MessageOverlay position='bottom'>
        {specialRegulationsElement}
      </MessageOverlay>)
  },

  render () {
    return this.renderSpecialRegulationsOverlay()
  }
})
export default RegulationsOverlayComponent
