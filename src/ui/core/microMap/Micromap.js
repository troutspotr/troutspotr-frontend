import { getProjectionFromFeature } from '../header/minimap/svgMinimap/GetProjectionFromFeature'
import * as colors from '../../core/Colors'
import * as d3Geo from 'd3-geo'
// import * as d3Path from 'd3-path'
// let window = window || null
const TAU = Math.PI * 2
const LINE_WIDTH = 0.5 * 1
const STREAM_WIDTH = LINE_WIDTH
const TROUT_SECTION_WIDTH = LINE_WIDTH * 2
const PUBLIC_SECTION = LINE_WIDTH * 2.75
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

const renderStreams = (streamObject, canvasContext, dimensions, scale = 1) => {
  let projection = getProjectionFromFeature(streamObject.circle, dimensions)
  let geoPath = d3Geo.geoPath()
    .projection(projection)
    .pointRadius(END_POINT_SIZE)
    .context(canvasContext)

  let streamConfluence = streamObject.stream.geometry.coordinates[0]
  renderPointOnStream(projection, canvasContext, streamConfluence, colors.OffWhite, 2 * scale)

  // render stream
  renderStream(geoPath, canvasContext, streamObject.stream, colors.OffWhite, STREAM_WIDTH * 0.5 * scale)

  // // render sections
  streamObject.sections.forEach(section => {
    renderStream(geoPath, canvasContext, section, colors.StreamBlue, TROUT_SECTION_WIDTH * scale)
  })

  // render public sections
  streamObject.palSections.forEach(section => {
    renderStream(geoPath, canvasContext, section, colors.PalGreen, PUBLIC_SECTION * scale)
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

export const drawStreamToCanvas = (canvasContext, streamObject, dimensions, scale = 1) => {
  renderStreams(streamObject, canvasContext, dimensions, scale)
  // drawRingToCanvas(canvasContext, streamObject, dimensions)
  return canvasContext
}

export const drawRingToCanvas = (canvasContext, streamObject, dimensions, scale = 1) => {
  renderRings(streamObject, canvasContext, dimensions, scale)
  return canvasContext
}

const renderRings = (streamObject, canvasContext, dimensions, scale = 1) => {
  renderStreamRing(streamObject, canvasContext, dimensions, scale)
  renderTroutStreamSectionRings(streamObject, canvasContext, dimensions, scale)
  renderPublicSectionRings(streamObject, canvasContext, dimensions, scale)
}

export const renderStreamRing = (streamObject, canvasContext, dimensions, scale = 1) => {
  let length = streamObject.stream.properties.length_mi
  let start = 0
  let stop = length
  let ring = { start, stop, length }
  renderRing(ring, canvasContext, dimensions, colors.StreamGray, STREAM_WIDTH * scale)
}

export const renderTroutStreamSectionRings = (streamObject, canvasContext, dimensions, widthScale = 1) => {
  let streamLength = streamObject.stream.properties.length_mi
  streamObject.sections.forEach((section, index) => {
    let ring = {
      start: section.properties.start,
      stop: section.properties.stop,
      length: streamLength
    }

    renderRing(ring, canvasContext, dimensions, colors.StreamBlue, TROUT_SECTION_WIDTH * widthScale)
  })
}

export const renderPublicSectionRings = (streamObject, canvasContext, dimensions, scale = 1) => {
  let streamLength = streamObject.stream.properties.length_mi
  streamObject.palSections.forEach((section, index) => {
    let ring = {
      start: section.properties.start,
      stop: section.properties.stop,
      length: streamLength
    }

    renderRing(ring, canvasContext, dimensions, colors.PalGreen, PUBLIC_SECTION * scale)
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
