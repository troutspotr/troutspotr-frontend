import React, { PropTypes } from 'react'

const SvgAnimatedCircle = React.createClass({
  propTypes: {
    cssName: PropTypes.string.isRequired,
    coordinates: PropTypes.array.isRequired,
    radius: PropTypes.number.isRequired
  },

  componentWillMount () {
    this.componentPath = null
  },

  animate (path, lengthInMilliseconds, pathLength) {
    if (this.componentPath == null) {
      return
    }

    let holderPath = this.componentPath
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    // path.removeAttribute('style.stroke')
    holderPath.style.removeProperty('stroke')
    holderPath.getBoundingClientRect()
    // Define our transition
    holderPath.style.transition = holderPath.style.WebkitTransition =
      `stroke-dashoffset ${lengthInMilliseconds}ms ease-out`
    // Go!
    holderPath.style.strokeDashoffset = '0'
  },

  onCreatePath (path) {
    this.componentPath = path
    let length = this.componentPath.getTotalLength()

    this.componentPath.style.transition = this.componentPath.style.WebkitTransition =
      'none'
    // Set up the starting positions
    this.componentPath.style.strokeDasharray = length + ' ' + length
    this.componentPath.style.stroke = 'none'

    // force it to go backwards - from upstream to downstream.
    this.componentPath.style.strokeDashoffset = -length
    // setTimeout(() => {
    //   if (this.componentPath == null) {
    //     return
    //   }

    //   this.animate(this.componentPath, this.props.length, length)
    // }, this.props.offset)
  },
// ref={this.onCreatePath}
  render () {
    return (

      <path
        className={this.props.cssName}
        cx={this.props.coordinates[0]}
        cy={this.props.coordinates[1]}
        r={this.props.radius} />
    )
  }
})

export default SvgAnimatedCircle
