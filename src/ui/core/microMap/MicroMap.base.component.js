import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './MicroMap.scss'
import * as Micromap from './Micromap'
import { scaleDefaultSettingsBy } from './MicroMap.settings'

// Calling getBoundingClientRect in WebKit is
// Excruciatingly slow. CACHE IT FOR PERFORMANCE!
const boundingRectangleCache = {}

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
    // assume that the parent determines size.
    const { className } = this.canvasElement.parentElement

    if (boundingRectangleCache[className] == null) {
      boundingRectangleCache[className] = this.canvasElement.parentElement.getBoundingClientRect()
    }

    const {height, width} = boundingRectangleCache[className]
    this.width = width
    this.height = height
    const devicePixelRatio = window.devicePixelRatio || 1
    this.canvasContext = Micromap.setUpCanvas(this.canvasElement, this.width, this.height, devicePixelRatio)

    const microMapSettings = scaleDefaultSettingsBy(this.props.scale)
    const defaultRadius = Math.min(this.width, this.height) * 0.5
    microMapSettings.dimensions = {
      width: this.width,
      height: this.height,
    }
    const { stream, circle, accessPoints } = microMapSettings.settings
    stream.radius = defaultRadius * 0.7
    circle.radius = defaultRadius * 0.75
    accessPoints.radius = defaultRadius * 0.9

    this.microMapSettings = microMapSettings
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

    // It's polite to save our canvas style here.
    // Draw a big rectangle to clear our canvas.
    operation()
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
  'id': PropTypes.string.isRequired,
  'scale': PropTypes.number.isRequired,
}

export default MicroMapComponent
