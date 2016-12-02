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

  renderCanvas () {
    let { geoPath, context } = this
    // render petri dish
    // this.renderPetriDish(context, colors.MoodyGray)
    // render end point
    // let streamCoordinates = this.props.streamObject.stream.geometry.coordinates
    // let endGeometry = streamCoordinates[0]
    // let endPoint = { 'type': 'Point', 'coordinates': endGeometry }
    // this.renderPointOnStream(this.projection, context, endPoint, colors.StreamGray, 3)
    // this.props.streamObject.accessPoints.filter(x => x.properties.bridgeType === publicTrout)
    //   .forEach(publicAccess => {
    //     this.renderPointOnStream(this.projection, context, publicAccess.geometry, colors.StreamGray, 4)
    //   })

    // render stream
    this.renderStream(geoPath, context, this.props.streamObject.stream, colors.StreamGray, STREAM_WIDTH)

    // render sections
    this.props.streamObject.sections.forEach(section => {
      this.renderStream(geoPath, context, section, colors.StreamBlue, TROUT_SECTION_WIDTH)
    })

    // render public sections
    this.props.streamObject.palSections.forEach(section => {
      this.renderStream(geoPath, context, section, colors.PalGreen, PUBLIC_SECTION)
    })
  },

  componentDidMount () {
    if (this.canvasElement == null) {
      return
    }
    let { height, width } = this.canvasElement.getBoundingClientRect()
    this.context = this.setUpCanvas(width, height)
    this.width = width
    this.height = height
    let dimensions = {
      width,
      height,
      radius: Math.min(width, height) * 0.5,
      buffer: 1
    }

    this.projection = getProjectionFromFeature(this.props.streamObject.circle, dimensions)
    this.geoPath = d3Geo.geoPath()
      .projection(this.projection)
      .pointRadius(END_POINT_SIZE)
      .context(this.context)

    // it's polite to save our canvas style here.
    // draw a big rectangle to clear our canvas.
    this.context.fillStyle = colors.MoodyGray
    // context.fillRect(0, 0, width, height)
    this.context.save()
    this.renderCanvas()
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
    // context.fill()
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

  },

  onClick (e) {

  },

  renderMap (canvasElement) {
    if (canvasElement == null) {
      return
    }
    this.canvasElement = canvasElement
  },

  shouldComponentUpdate () {
    return false
  },

  render () {
    console.log('rendering in micromap')
    return (
      <div onClick={this.onClick} className={classes.container}>
        <canvas id={this.props.id} className={classes.microMap} ref={this.renderMap} />
      </div>)
  }
})

export default SneezeGuardComponent
