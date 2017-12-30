import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ringClasses from './RingAxis.scss'
import {times} from 'lodash'

const TICK_MOD = 20
const RADIANS_TO_DEGREES = 180 / Math.PI

class RingAxisComponent extends Component {
  renderTicks () {
    const {length, layout} = this.props
    const {width, height, radius, arcCompressionRatio, rotatePhase} = layout
    const ticks = Math.floor(length)
    const tickMod = ticks > TICK_MOD ? 5 : 1
    const tickDegrees = ((360 * arcCompressionRatio) / length)
    const rotatePhaseDegrees = rotatePhase * RADIANS_TO_DEGREES
    const isReallyLongStream = length > 50

    return times(ticks + 1).map((index) => {
      const rotationDegrees = tickDegrees * index - rotatePhaseDegrees
      const textAnchor = rotationDegrees > 90
        ? 'middle'
        : 'middle'

      const xPos = 0

      // Let preRotate = `rotate(${rotationDegrees})`
      // Let offsetTranslate = `translate(${radius},0)`
      const secondTranslate = `translate(${width * 0.5},${height * 0.5})`
      const rotate = `rotate(${rotationDegrees})`
      const firstTranslate = `translate(${radius + 20}, 0)`
      const counterRotation = `rotate(${-rotationDegrees})`
      const transform = `${secondTranslate}  ${rotate} ${firstTranslate} ${counterRotation}`
      return (
        <g key={index + rotatePhase} transform={transform}>
          <line transform={`rotate(${rotationDegrees}) translate(-10, 0)`} className={ringClasses.radialGuide} x1={-2} x2={2} />
          <g>
            {
              index % tickMod === 0
                ? (<text
                  className={ringClasses.radialText}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                  x={xPos}
                >{index}</text>)
                : isReallyLongStream ? null : (<text
                  className={ringClasses.radialTextSmall}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                  x={xPos}
                >{index}</text>)
            }
          </g>
        </g>)
    })
  }

  render () {
    return (<g id="radial-axis" className={ringClasses.radial}>
      {this.renderTicks()}
    </g>)
  }
}

RingAxisComponent.propTypes = {
  'length': PropTypes.number.isRequired,
  'layout': PropTypes.shape({
    'width': PropTypes.number.isRequired,
    'height': PropTypes.number.isRequired,
    'radius': PropTypes.number.isRequired,
    'arcCompressionRatio': PropTypes.number.isRequired,
    'rotatePhase': PropTypes.number.isRequired,
  }),
}

export default RingAxisComponent
