import React, { PropTypes, Component } from 'react'
import * as d3 from 'd3-path'
import SvgAnimatedPathComponent from '../SvgAnimatedPath.component'

const TAU = Math.PI * 2
class RingSectionComponent extends Component {
  createRadialPath () {
    let { start, stop, length } = this.props
    let { width, height, radius, arcCompressionRatio, rotatePhase } = this.props.layout
    let data = [start, stop].map(mileOffset => {
      let normalizedOffset = mileOffset / length
      let normalizedArcLength = TAU * arcCompressionRatio
      let arcOffset = (normalizedOffset * normalizedArcLength) - rotatePhase
      return arcOffset
    })

    let pathGenerator = d3.path()
    pathGenerator.arc(width / 2, height / 2, radius, data[0], data[1])
    let result = pathGenerator.toString()
    return result
  }

  render () {
    return (<SvgAnimatedPathComponent
      offset={this.props.timing.offset}
      length={this.props.timing.length}
      cssName={this.props.cssName}
      path={this.createRadialPath()}
            />)
  }
}

RingSectionComponent.propTypes = {
  length: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  stop: PropTypes.number.isRequired,
  cssName: PropTypes.string.isRequired,
  timing: PropTypes.shape({
    offset: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired
  }),
  layout: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    arcCompressionRatio: PropTypes.number.isRequired,
    rotatePhase: PropTypes.number.isRequired
  })
}

export default RingSectionComponent
