import React, { PropTypes } from 'react'

const SvgAnimatedPathComponent = React.createClass({
  propTypes: {
    cssName: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired
  },

  componentWillMount () {
    console.log('mounting right now')
    this.componentPath = null
  },

  componentWillUnmount () {
    this.componentPath = null
    console.log('animated path unmounting')
  },

  shouldComponentUpdate () {
    return false
  },

  animate (lengthInMilliseconds, pathLength) {
    if (this.componentPath == null) {
      return
    }

    let path = this.componentPath
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    // path.removeAttribute('style.stroke')
    path.style.removeProperty('stroke')
    path.style.removeProperty('display')
    let cssNames = this.props.cssName.split(' ').filter(token => token != null && token.length > 0)

    // there is a lot of DOM unmounting and apparently recycling.
    // I had to remove all classes and then specifically add my own here.
    for (let i = path.classList.length - 1; i >= 0; i--) {
      let classListItem = path.classList.item(i)
      console.log(classListItem)
      path.classList.remove(classListItem)
    }
    // if (cssNames.length !== path.classList.length) {
    //   console.log(cssNames, path.classList)
    // }

    cssNames.forEach(token => {
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

    this.componentPath = path

    let length = this.componentPath.getTotalLength()
    this.componentPath.style.display = 'none'

    this.componentPath.style.transition = this.componentPath.style.WebkitTransition =
      'none'
    // Set up the starting positions
    this.componentPath.style.strokeDasharray = length + ' ' + length
    this.componentPath.style.stroke = 'none'

    // force it to go backwards - from upstream to downstream.
    this.componentPath.style.strokeDashoffset = -length
    setTimeout(() => {
      this.animate(this.props.length, length)
    }, this.props.offset)
  },

// className={this.props.cssName}
  render () {
    return (
      <path ref={this.onCreatePath} d={this.props.path} />
    )
  }
})

export default SvgAnimatedPathComponent
