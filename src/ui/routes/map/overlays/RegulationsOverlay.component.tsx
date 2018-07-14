import isEmpty from 'lodash-es/isEmpty'
import * as React from 'react'
// const classes = require('./MapOverlay.scss')
// import RestrictionComponent from 'ui/core/regulations/Restriction.component'
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component'
class RegulationsOverlayComponent extends React.Component<any> {
  public renderSpecialRegulationsOverlay() {
    const { selectedStream, specialRegulationsCurrentSeason } = this.props
    if (isEmpty(selectedStream) || specialRegulationsCurrentSeason.length === 0) {
      return null
    }
    const specialRegulationsElement = null
    // const specialRegulationsElement = (
    //   <div>
    //     <div className={classes.specialRegulationsTitle}>Special Regulations</div>
    //     {specialRegulationsCurrentSeason.map((reg, index) => {
    //       const id = `${reg.restrictionId}_${reg.streamId}`
    //       return (
    //         <RestrictionComponent
    //           key={id}
    //           color={reg.color}
    //           pattern={reg.isFishSanctuary ? 'solid' : 'stipple'}
    //           text={reg.legalText}
    //           length={`${reg.roundedLength} mi`}
    //         />
    //       )
    //     })}
    //   </div>
    // )

    return (
      <MessageOverlayComponent position="bottom">
        {specialRegulationsElement}
      </MessageOverlayComponent>
    )
  }

  public render() {
    return this.renderSpecialRegulationsOverlay()
  }
}

// RegulationsOverlayComponent.propTypes = {
//   'selectedStream': PropTypes.object,
//   'specialRegulationsCurrentSeason': PropTypes.array.isRequired,
// }

export default RegulationsOverlayComponent