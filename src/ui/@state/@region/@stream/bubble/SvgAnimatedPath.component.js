import React, { PropTypes } from 'react'

const SvgAnimatedPathComponent = React.createClass({
  propTypes: {
    cssName: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
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
    path.style.removeProperty('display')
    this.props.cssName.split(' ').forEach(token => {
      if (token == null || token.length === 0) {
        return
      }

      path.classList.add(token)
    })

    path.getBoundingClientRect()
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
      `stroke-dashoffset ${lengthInMilliseconds}ms cubic-bezier(0.390, 0.575, 0.565, 1.000)`
    // Go!
    path.style.strokeDashoffset = '0'
  },

  onCreatePath (path) {
    if (path == null) {
      return
    }

    let length = path.getTotalLength()
    path.style.display = 'none'

    path.style.transition = path.style.WebkitTransition =
      'none'
    // Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length
    path.style.stroke = 'none'

    // force it to go backwards - from upstream to downstream.
    path.style.strokeDashoffset = -length
    setTimeout(() => { this.animate(path, this.props.length, length) }, this.props.offset)
  },

// className={this.props.cssName}
  render () {
    return (
      <path ref={this.onCreatePath} d={this.props.path} />
    )
  }
})

export default SvgAnimatedPathComponent
