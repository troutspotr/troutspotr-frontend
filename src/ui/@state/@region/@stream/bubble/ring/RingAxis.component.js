import React, { PropTypes, Component } from 'react'
import ringClasses from './RingAxis.scss'
import { times } from 'lodash'

const TICK_MOD = 20
const RADIANS_TO_DEGREES = 180 / Math.PI

class RingAxisComponent extends Component {
  renderTicks () {
    let { length, layout } = this.props
    let { width, height, radius, arcCompressionRatio, rotatePhase } = layout
    let ticks = Math.floor(length)
    let tickMod = ticks > TICK_MOD ? 5 : 1
    let tickDegrees = ((360 * arcCompressionRatio) / length)
    let rotatePhaseDegrees = rotatePhase * RADIANS_TO_DEGREES
    let isReallyLongStream = length > 50

    return times(ticks + 1).map(index => {
      let rotationDegrees = tickDegrees * index - rotatePhaseDegrees
      if (rotationDegrees > 90) {
        // console.log(index)
      }

      let textAnchor = rotationDegrees > 90
        ? 'middle'
        : 'middle'

      let xPos = 0

      // let preRotate = `rotate(${rotationDegrees})`
      // let offsetTranslate = `translate(${radius},0)`
      let secondTranslate = `translate(${width * 0.5},${height * 0.5})`
      let rotate = `rotate(${rotationDegrees})`
      let firstTranslate = `translate(${radius + 20}, 0)`
      let counterRotation = `rotate(${-rotationDegrees})`
      let transform = `${secondTranslate}  ${rotate} ${firstTranslate} ${counterRotation}`
      return (
        <g key={index + rotatePhase} transform={transform}>
          <line transform={`rotate(${rotationDegrees}) translate(-10, 0)`} className={ringClasses.radialGuide} x1={-2} x2={2} />
          <g>
            {
            index % tickMod === 0
            ? (<text
              className={ringClasses.radialText}
              textAnchor={textAnchor}
              dominantBaseline='central'
              x={xPos}
               >{index}</text>)
            : isReallyLongStream ? null : (<text
              className={ringClasses.radialTextSmall}
              textAnchor={textAnchor}
              dominantBaseline='central'
              x={xPos}
                                           >{index}</text>)
          }
          </g>
        </g>)
    })
  }

  render () {
    return (<g id='radial-axis' className={ringClasses.radial}>
      {this.renderTicks()}
    </g>)
  }
}

RingAxisComponent.propTypes = {
  length: PropTypes.number.isRequired,
  layout: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    arcCompressionRatio: PropTypes.number.isRequired,
    rotatePhase: PropTypes.number.isRequired
  })
}

export default RingAxisComponent
