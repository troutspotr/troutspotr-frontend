import * as React from 'react'
import * as d3 from 'd3-path'
import SvgAnimatedPathComponent from '../SvgAnimatedPath.component'

const TAU = Math.PI * 2
class RingSectionComponent extends React.Component<any> {
  createRadialPath() {
    const { start, stop, length } = this.props
    const { width, height, radius, arcCompressionRatio, rotatePhase } = this.props.layout
    const data = [start, stop].map(mileOffset => {
      const normalizedOffset = mileOffset / length
      const normalizedArcLength = TAU * arcCompressionRatio
      const arcOffset = normalizedOffset * normalizedArcLength - rotatePhase
      return arcOffset
    })

    const pathGenerator = d3.path()
    pathGenerator.arc(width / 2, height / 2, radius, data[0], data[1])
    const result = pathGenerator.toString()
    return result
  }

  render() {
    return (
      <SvgAnimatedPathComponent
        offset={this.props.timing.offset}
        length={this.props.timing.length}
        cssName={this.props.cssName}
        path={this.createRadialPath()}
      />
    )
  }
}

// RingSectionComponent.propTypes = {
//   'length': PropTypes.number.isRequired,
//   'start': PropTypes.number.isRequired,
//   'stop': PropTypes.number.isRequired,
//   'cssName': PropTypes.string.isRequired,
//   'timing': PropTypes.shape({
//     'offset': PropTypes.number.isRequired,
//     'length': PropTypes.number.isRequired,
//   }),
//   'layout': PropTypes.shape({
//     'width': PropTypes.number.isRequired,
//     'height': PropTypes.number.isRequired,
//     'radius': PropTypes.number.isRequired,
//     'arcCompressionRatio': PropTypes.number.isRequired,
//     'rotatePhase': PropTypes.number.isRequired,
//   }),
// }

export default RingSectionComponent
