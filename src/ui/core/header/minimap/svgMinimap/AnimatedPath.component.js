import React, {Component} from 'react'
import PropTypes from 'prop-types'

class AnimatedPathComponent extends Component {
  constructor () {
    super()
    this.animate = this.animate.bind(this)
    this.onCreatePath = this.onCreatePath.bind(this)
  }

  componentWillMount () {
    this.componentPath = null
  }

  componentWillUnmount () {
    this.componentPath = null
  }

  shouldComponentUpdate () {
    return false
  }

  animate (lengthInMilliseconds, pathLength, delay = 0) {
    if (this.componentPath == null) {
      return
    }

    const length = this.componentPath.getTotalLength()
    this.componentPath.style.strokeDasharray = length + ' ' + length
    this.componentPath.style.strokeDashoffset = -length
    const path = this.componentPath
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.style.removeProperty('stroke')
    path.style.removeProperty('display')

    path.getBoundingClientRect()
    const transition = `stroke-dashoffset ${lengthInMilliseconds}ms cubic-bezier(0.390, 0.575, 0.565, 1.000) ${delay}ms`
    path.style.transition = path.style.WebkitTransition = transition

    path.style.strokeDashoffset = '0'
  }

  onCreatePath (path) {
    if (path == null) {
      return
    }

    this.componentPath = path

    this.componentPath.style.display = 'none'

    this.componentPath.style.transition = this.componentPath.style.WebkitTransition =
      'none'
    // Set up the starting positions
    this.componentPath.style.stroke = 'none'

    setTimeout(() => {
      this.animate(this.props.length, length, this.props.offset)
    }, 0)
  }

  render () {
    return (
      <path ref={this.onCreatePath} d={this.props.path} />
    )
  }
}

AnimatedPathComponent.propTypes = {
  cssName: PropTypes.string,
  path: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
}

export default AnimatedPathComponent
