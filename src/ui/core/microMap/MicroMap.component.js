import React, { PropTypes } from 'react'
import classes from './MicroMap.scss'
import * as colors from 'ui/core/Colors'
import * as d3Geo from 'd3-geo'
// import * as d3Path from 'd3-path'
import { getProjectionFromFeature } from 'ui/core/header/minimap/svgMinimap/SvgMap.component'
const TAU = Math.PI * 2
const LINE_WIDTH = 0.5
const STREAM_WIDTH = LINE_WIDTH
const TROUT_SECTION_WIDTH = LINE_WIDTH * 1.5
const PUBLIC_SECTION = LINE_WIDTH * 2
const END_POINT_SIZE = LINE_WIDTH * 2
const SneezeGuardComponent = React.createClass({
  propTypes: {
    streamObject: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  },

  // https://www.html5rocks.com/en/tutorials/canvas/hidpi/
  setUpCanvas (width, height) {
    let context = this.canvasElement.getContext('2d')
    this.canvasElement.height = height
    this.canvasElement.width = width

    let devicePixelRatio = window.devicePixelRatio || 1
    let backingStoreRatio = context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 1
    let ratio = devicePixelRatio / backingStoreRatio
    if (devicePixelRatio !== backingStoreRatio) {
      let canvas = this.canvasElement
      let oldWidth = canvas.width
      let oldHeight = canvas.height

      canvas.width = oldWidth * ratio
      canvas.height = oldHeight * ratio

      canvas.style.width = oldWidth + 'px'
      canvas.style.height = oldHeight + 'px'

      // now scale the context to counter
      // the fact that we've manually scaled
      // our canvas element
      context.scale(ratio, ratio)
    }

    return context
  },

  renderCanvas (streamObject) {
    this.projection = getProjectionFromFeature(streamObject.circle, this.dimensions)
    this.geoPath = d3Geo.geoPath()
      .projection(this.projection)
      .pointRadius(END_POINT_SIZE)
      .context(this.canvasContext)
    let { geoPath, canvasContext } = this
    // the first thing we do is clear the context right away.
    canvasContext.clearRect(0, 0, this.width, this.height)
    // render petri dish
    // this.renderPetriDish(canvasContext, colors.MoodyGray)

    // render stream
    this.renderStream(geoPath, canvasContext, streamObject.stream, colors.StreamGray, STREAM_WIDTH)

    // render sections
    streamObject.sections.forEach(section => {
      this.renderStream(geoPath, canvasContext, section, colors.StreamBlue, TROUT_SECTION_WIDTH)
    })

    // render public sections
    streamObject.palSections.forEach(section => {
      this.renderStream(geoPath, canvasContext, section, colors.PalGreen, PUBLIC_SECTION)
    })
  },

  componentWillUpdate (nextProps) {
    this.fireRenderToCanvas(nextProps.streamObject, true)
  },

  componentDidMount () {
    if (this.canvasElement == null) {
      return
    }

    let { height, width } = this.canvasElement.getBoundingClientRect()
    this.width = width
    this.height = height
    this.canvasContext = this.setUpCanvas(this.width, this.height)
    this.dimensions = {
      width,
      height,
      radius: Math.min(width, height) * 0.5,
      buffer: 1
    }

    // it's polite to save our canvas style here.
    // draw a big rectangle to clear our canvas.
    this.canvasContext.fillStyle = colors.MoodyGray
    this.canvasContext.save()

    this.fireRenderToCanvas(this.props.streamObject, true)
  },

  fireRenderToCanvas (streamObject, delay = true) {
    if (delay === false) {
      this.renderCanvas(streamObject)
      return
    }

    let offset = Math.floor(Math.random() * 5) + 5
    setTimeout(() => this.renderCanvas(streamObject), offset)
  },

  renderStream (path, context, geoJson, color = 'red', thickness = 1) {
    if (path == null) {
      return
    }

    if (context == null) {
      return
    }
    context.lineWidth = thickness
    context.strokeStyle = color
    context.beginPath()
    path(geoJson)
    context.stroke()
    context.restore()
  },

  renderArc (arcPath, context, geoJson, color = 'red', thickness = 1) {

  },

  renderPointOnStream (projection, context, { coordinates }, color = 'red', radius = 1) {
    if (projection == null) {
      return
    }

    if (context == null) {
      return
    }
    context.save()
    context.fillStyle = color
    let canvasCoordiantes = projection(coordinates)
    context.lineWidth = 1
    context.strokeStyle = color
    context.globalAlpha = 0.4
    context.beginPath()
    context.arc(canvasCoordiantes[0], canvasCoordiantes[1], radius, 0, TAU, true)
    context.stroke()
    context.restore()
  },

  renderPetriDish (context, color) {
    context.fillStyle = color
    context.lineWidth = 1
    context.strokeStyle = color
    context.beginPath()
    context.arc(this.width * 0.5, this.height * 0.5, (this.width * 0.5) - 3, 0, TAU, true)
    context.fill()
    context.stroke()
    context.restore()
  },

  componentWillUnmount () {
    // console.log('unmounted')
  },

  onClick (e) {

  },

  renderMap (canvasElement) {
    if (canvasElement == null) {
      return
    }
    this.canvasElement = canvasElement
  },

  shouldComponentUpdate (nextProps) {
    if (nextProps.streamObject.stream.properties.gid !== this.props.streamObject.stream.properties.gid) {
      return true
    }
    return false
  },

  render () {
    return (
      <div onClick={this.onClick} className={classes.container}>
        <canvas id={this.props.id} className={classes.microMap} ref={this.renderMap} />
      </div>)
  }
})

export default SneezeGuardComponent
