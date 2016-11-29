import React, { PropTypes } from 'react'

const SvgAnimatedCircle = React.createClass({
  propTypes: {
    cssName: PropTypes.string.isRequired,
    coordinates: PropTypes.array.isRequired,
    radius: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired
  },

  componentWillMount () {

  },

  animate (path, lengthInMilliseconds, pathLength) {
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    // path.removeAttribute('style.stroke')
    path.style.removeProperty('stroke')
    path.getBoundingClientRect()
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
      `stroke-dashoffset ${lengthInMilliseconds}ms ease-out`
    // Go!
    path.style.strokeDashoffset = '0'
  },

  onCreatePath (path) {
    let length = path.getTotalLength()

    path.style.transition = path.style.WebkitTransition =
      'none'
    // Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length
    path.style.stroke = 'none'

    // force it to go backwards - from upstream to downstream.
    path.style.strokeDashoffset = -length
    setTimeout(() => { this.animate(path, this.props.length, length) }, this.props.offset)
  },

  render () {
    return (
      <path ref={this.onCreatePath}
        className={this.props.cssName}
        cx={this.props.coordinates[0]}
        cy={this.props.coordinates[1]}
        r={this.props.radius} />
    )
  }
})

export default SvgAnimatedCircle
