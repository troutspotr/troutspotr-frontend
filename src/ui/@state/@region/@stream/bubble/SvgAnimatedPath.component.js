import React, { PropTypes } from 'react'

const SvgAnimatedPathComponent = React.createClass({
  propTypes: {
    cssName: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired
  },

  // componentWillMount () {
  //   this.componentPath = null
  // },

  // componentWillUnmount () {
  //   this.componentPath = null
  // },

  // shouldComponentUpdate () {
  //   return false
  // },

  // animate (lengthInMilliseconds, pathLength, delay = 0) {
  //   if (this.componentPath == null) {
  //     return
  //   }

  //   let path = this.componentPath
  //   // Trigger a layout so styles are calculated & the browser
  //   // picks up the starting position before animating
  //   // path.removeAttribute('style.stroke')
  //   path.style.removeProperty('stroke')
  //   path.style.removeProperty('display')
  //   let cssNames = this.props.cssName.split(' ').filter(token => token != null && token.length > 0)

  //   // there is a lot of DOM unmounting and apparently recycling.
  //   // I had to remove all classes and then specifically add my own here.
  //   // Basically, I'm just trying to add the classes that were in props to the actual real-deal
  //   // path element. You know, normal stuff.

  //   // also, we need to check for IE 11, which DOES NOT have classList for SVG elements
  //   let hasClassList = path.classList != null
  //   if (hasClassList) {
  //     // manually remove all the items, starting from the end and moving backwards
  //     for (let i = path.classList.length - 1; i >= 0; i--) {
  //       let classListItem = path.classList.item(i)
  //       path.classList.remove(classListItem)
  //     }

  //     // now that the list is empty, ADD OUR CLASSES BACK.
  //     cssNames.forEach(token => {
  //       path.classList.add(token)
  //     })
  //   } else if (path.getAttribute) {
  //     // https://github.com/Polymer/polymer/commit/0f5bfa5b56582bde3928fcc7d2ef62ccd42984bf
  //     // Used that link to learn how to add/remove classes manually in IE. YUUUCKY.
  //     let newClassNames = cssNames.join(' ')
  //     path.setAttribute('class', newClassNames)
  //   }

  //   path.getBoundingClientRect()
  //   // Define our transition
  //   let transition = `stroke-dashoffset ${lengthInMilliseconds}ms cubic-bezier(0.390, 0.575, 0.565, 1.000) ${delay}ms`
  //   path.style.transition = path.style.WebkitTransition = transition

  //   // Go!
  //   path.style.strokeDashoffset = '0'
  // },

  // onCreatePath (path) {
  //   if (path == null) {
  //     return
  //   }

  //   this.componentPath = path

  //   let length = this.componentPath.getTotalLength()
  //   this.componentPath.style.display = 'none'

  //   this.componentPath.style.transition = this.componentPath.style.WebkitTransition =
  //     'none'
  //   // Set up the starting positions
  //   this.componentPath.style.strokeDasharray = length + ' ' + length
  //   this.componentPath.style.stroke = 'none'

  //   // force it to go backwards - from upstream to downstream.
  //   this.componentPath.style.strokeDashoffset = -length
  //   setTimeout(() => {
  //     this.animate(this.props.length, length)
  //   }, this.props.offset)
  // },

// className={this.props.cssName}
  render () {
    return (
      <path className={this.props.cssName}  d={this.props.path} />
    )
  }
})

export default SvgAnimatedPathComponent
