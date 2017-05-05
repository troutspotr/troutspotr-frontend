import React, { PropTypes, Component } from 'react'
import classes from './MicroMap.scss'
import * as Micromap from './Micromap'

// calling getBoundingClientRect in WebKit is
// excruciatingly slow. CACHE IT FOR PERFORMANCE!
let boundingRectangleCache = null

class MicroMapComponent extends Component {
  constructor () {
    super()
    this.isInitialized = false
    this.setUpRefCanvas = this.setUpRefCanvas.bind(this)
  }

  setUpCanvas (override = false) {
    if (this.canvasElement == null) {
      return
    }

    if (this.isInitialized === true && override === false) {
      return
    }

    if (boundingRectangleCache == null) {
      boundingRectangleCache = this.canvasElement.parentElement.getBoundingClientRect()
    }
    let { height, width } = boundingRectangleCache
    this.width = width
    this.height = height
    let devicePixelRatio = window.devicePixelRatio || 1
    this.canvasContext = Micromap.setUpCanvas(this.canvasElement, this.width, this.height, devicePixelRatio)
    this.dimensions = {
      width,
      height,
      radius: (Math.min(width, height) - 11) * 0.5,
      buffer: 3,
      arcCompressionRatio: 0.90,
      rotatePhase: Math.PI / 2
    }

    this.isInitialized = true
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  deferredRenderToCanvas (operation) {
    if (window.requestIdleCallback != null) {
      window.requestIdleCallback(() => {
        operation()
      })
      return
    }

    // it's polite to save our canvas style here.
    // draw a big rectangle to clear our canvas.
    // this.canvasContext.fillStyle = colors.MoodyGray
    // this.canvasContext.save()
    let offset = (Math.random() * 200) + 80
    setTimeout(() => {
      operation()
    }, offset)
  }

  componentDidMount () {
    this.setUpCanvas()
  }

  setUpRefCanvas (canvasElement) {
    if (canvasElement == null) {
      return
    }
    this.canvasElement = canvasElement
  }

  render () {
    return (<canvas id={this.props.id} className={classes.microMap} ref={this.setUpRefCanvas} />)
  }
}

MicroMapComponent.propTypes = {
  id: PropTypes.string.isRequired
  // isVisible: PropTypes.bool.isRequired
}

export default MicroMapComponent
