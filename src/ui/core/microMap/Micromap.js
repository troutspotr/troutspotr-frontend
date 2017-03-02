import { getProjectionFromFeature } from '../header/minimap/svgMinimap/GetProjectionFromFeature'
import * as colors from '../../core/Colors'
import * as d3Geo from 'd3-geo'
// import * as d3Path from 'd3-path'
// let window = window || null
const TAU = Math.PI * 2
const LINE_WIDTH = 0.5 * 1
const STREAM_WIDTH = LINE_WIDTH
const TROUT_SECTION_WIDTH = LINE_WIDTH * 1.5
const PUBLIC_SECTION = LINE_WIDTH * 2.6
const END_POINT_SIZE = LINE_WIDTH * 2

const getBackingStoreRatio = (context) => {
  return context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1
}

// https://www.html5rocks.com/en/tutorials/canvas/hidpi/
export const setUpCanvas = (canvasElement, width, height, devicePixelRatio = 1) => {
  let context = canvasElement.getContext('2d')
  canvasElement.height = height
  canvasElement.width = width

  let backingStoreRatio = getBackingStoreRatio(context)
  let ratio = devicePixelRatio / backingStoreRatio
  if (devicePixelRatio !== backingStoreRatio) {
    let canvas = canvasElement
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
}

export const drawBackground = (canvasContext, dimensions, color) => {
  let { width, height } = dimensions
  canvasContext.clearRect(0, 0, width, height)
  canvasContext.fillStyle = color
  canvasContext.fillRect(0, 0, width, height)
}

const renderStreams = (streamObject, canvasContext, dimensions) => {
  let projection = getProjectionFromFeature(streamObject.circle, dimensions)
  let geoPath = d3Geo.geoPath()
    .projection(projection)
    .pointRadius(END_POINT_SIZE)
    .context(canvasContext)

  let streamConfluence = streamObject.stream.geometry.coordinates[0]
  renderPointOnStream(projection, canvasContext, streamConfluence, colors.StreamGray, 2)

  // render stream
  renderStream(geoPath, canvasContext, streamObject.stream, colors.StreamGray, STREAM_WIDTH)

  // // render sections
  streamObject.sections.forEach(section => {
    renderStream(geoPath, canvasContext, section, colors.StreamBlue, TROUT_SECTION_WIDTH)
  })

  // render public sections
  streamObject.palSections.forEach(section => {
    renderStream(geoPath, canvasContext, section, colors.PalGreen, PUBLIC_SECTION)
  })
}

const renderStream = (path, context, geoJson, color = 'red', thickness = 1) => {
  if (path == null) {
    return
  }

  if (context == null) {
    return
  }
  context.lineWidth = thickness
  context.lineJoin = 'round'
  context.strokeStyle = color
  context.beginPath()
  path(geoJson)
  context.stroke()
}

export const renderPointOnStream = (projection, context, coordinates, color = 'red', radius = 1) => {
  if (projection == null) {
    return
  }

  if (context == null) {
    return
  }
  context.save()
  context.beginPath()
  context.fillStyle = color
  let canvasCoordiantes = projection(coordinates)
  context.lineWidth = 1
  context.strokeStyle = color
  context.arc(canvasCoordiantes[0], canvasCoordiantes[1], radius, 0, TAU, false)
  context.fill()
  context.stroke()
}

export const renderPetriDish = (context, dimensions, color) => {
  let { width, height } = dimensions
  context.fillStyle = color
  context.lineWidth = 1
  context.strokeStyle = color
  context.beginPath()
  context.arc(width * 0.5, height * 0.5, (width * 0.5) - 3, 0, TAU, true)
  context.fill()
  context.stroke()
}

export const drawStreamToCanvas = (canvasContext, streamObject, dimensions) => {
  renderStreams(streamObject, canvasContext, dimensions)
  // drawRingToCanvas(canvasContext, streamObject, dimensions)
  return canvasContext
}

export const drawRingToCanvas = (canvasContext, streamObject, dimensions) => {
  renderRings(streamObject, canvasContext, dimensions)
  return canvasContext
}

const renderRings = (streamObject, canvasContext, dimensions) => {
  renderStreamRing(streamObject, canvasContext, dimensions)
  renderTroutStreamSectionRings(streamObject, canvasContext, dimensions)
  renderPublicSectionRings(streamObject, canvasContext, dimensions)
}

export const renderStreamRing = (streamObject, canvasContext, dimensions) => {
  let length = streamObject.stream.properties.length_mi
  let start = 0
  let stop = length
  let ring = { start, stop, length }
  renderRing(ring, canvasContext, dimensions, colors.StreamGray, STREAM_WIDTH)
}

export const renderTroutStreamSectionRings = (streamObject, canvasContext, dimensions) => {
  let streamLength = streamObject.stream.properties.length_mi
  streamObject.sections.forEach((section, index) => {
    let ring = {
      start: section.properties.start,
      stop: section.properties.stop,
      length: streamLength
    }

    renderRing(ring, canvasContext, dimensions, colors.StreamBlue, TROUT_SECTION_WIDTH)
  })
}

export const renderPublicSectionRings = (streamObject, canvasContext, dimensions) => {
  let streamLength = streamObject.stream.properties.length_mi
  streamObject.palSections.forEach((section, index) => {
    let ring = {
      start: section.properties.start,
      stop: section.properties.stop,
      length: streamLength
    }

    renderRing(ring, canvasContext, dimensions, colors.PalGreen, PUBLIC_SECTION)
  })
}

const renderRing = ({ start, stop, length }, context, dimensions, color, thickness = STREAM_WIDTH) => {
  let { width, height, radius, arcCompressionRatio, rotatePhase } = dimensions
  let data = [start, stop].map(mileOffset => {
    let normalizedOffset = mileOffset / length
    let normalizedArcLength = TAU * arcCompressionRatio
    let arcOffset = (normalizedOffset * normalizedArcLength) - rotatePhase
    return arcOffset
  })
  context.beginPath()
  context.lineWidth = thickness
  context.lineJoin = 'round'
  context.strokeStyle = color
  context.arc(width / 2, height / 2, radius, data[0], data[1])
  context.stroke()
}
