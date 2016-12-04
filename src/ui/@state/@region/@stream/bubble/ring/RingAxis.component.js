import React, { PropTypes } from 'react'
import ringClasses from './RingAxis.scss'
import { times } from 'lodash'

const TICK_MOD = 20
const RADIANS_TO_DEGREES = 180 / Math.PI

const RingAxisComponent = React.createClass({
  propTypes: {
    length: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    layout: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      arcCompressionRatio: PropTypes.number.isRequired,
      rotatePhase: PropTypes.number.isRequired
    })
  },

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

      let humanReadableRotationDegrees = rotationDegrees > 90
        ? 180
        : 0

      // let transform = rotationDegrees > 90
      //   ? 'rotate(180)'
      //   : 'rotate(0)'

      let textAnchor = rotationDegrees > 90
        ? 'end'
        : 'start'

      let xPos = rotationDegrees > 90
        ? -9
        : 9

      // let preRotate = `rotate(${rotationDegrees})`
      // let offsetTranslate = `translate(${radius},0)`
      let secondTranslate = `translate(${width * 0.5},${height * 0.5})`
      let rotate = `rotate(${rotationDegrees})`
      let firstTranslate = `translate(${radius}, 0)`
      let transform = `${secondTranslate}  ${rotate} ${firstTranslate}`
      return (
        <g key={index} transform={transform}>
          <line className={ringClasses.radialGuide} x1={0} x2={0 + 3} />
          <g transform={`rotate(${humanReadableRotationDegrees})`}>
            {
            index % tickMod === 0
            ? (<text
              className={ringClasses.radialText}
              textAnchor={textAnchor}
              dominantBaseline='central'
              x={xPos} >{index}</text>)
            : isReallyLongStream ? null : (<text
              className={ringClasses.radialTextSmall}
              textAnchor={textAnchor}
              dominantBaseline='central'
              x={xPos} >{index}</text>)
          }
          </g>
        </g>)
    })
  },

  render () {
    return <g id='radial-axis' className={ringClasses.radial}>
      {this.renderTicks()}
    </g>
  }
})

export default RingAxisComponent
