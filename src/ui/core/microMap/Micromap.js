/* eslint-disable camelcase */
import { getProjectionFromFeature } from '../header/minimap/svgMinimap/GetProjectionFromFeature'
import * as colors from '../../core/Colors'
import * as d3Geo from 'd3-geo'
import bearing from '@turf/bearing'
// import distance from '@turf/distance'
import { groupBy, has } from 'lodash'
// import * as d3Path from 'd3-path'
// let window = window || null
const TAU = Math.PI * 2
const LINE_WIDTH = 0.5 * 1
const STREAM_WIDTH = LINE_WIDTH
const TROUT_SECTION_WIDTH = LINE_WIDTH * 2
const PUBLIC_SECTION = LINE_WIDTH * 2.75
const END_POINT_SIZE = LINE_WIDTH * 2
const DEGREES_TO_RADIANS = 0.0174533
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

  let streamConfluence = streamObject.stream.geometry.coordinates[0]
  renderPointOnStream(projection, canvasContext, streamConfluence, colors.OffWhite, 1 * scale)
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
  drawRingToCanvas(canvasContext, streamObject, dimensions, scale)
  return canvasContext
}

export const drawGpsLocationToCanvas = (canvasContext, streamObject, dimensions, scale = 1, gpsLocation = null) => {
  // Use the identity matrix while clearing the canvas
  let { width, height, radius } = dimensions
  canvasContext.clearRect(0, 0, width, height)

  if (gpsLocation == null) {
    return
  }

  let { centroid_longitude, centroid_latitude } = streamObject.stream.properties
  let streamLocation = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'Point',
      'coordinates': [centroid_longitude, centroid_latitude]
    }
  }

  let gpsBearing = bearing(streamLocation, gpsLocation)
  let degrees = gpsBearing + 90 * -1
  // let degrees = -197.69053372467283
  let radians = degrees * DEGREES_TO_RADIANS
  let xCoordinate = Math.cos(radians) * radius + (width * 0.5)
  let yCoordinate = Math.sin(radians) * radius + (height * 0.5)
  let coordinates = [xCoordinate, yCoordinate]
  drawPointAlongRing(streamObject, canvasContext, dimensions, scale, colors.Red, coordinates)
  return canvasContext
}

export const drawRingToCanvas = (canvasContext, streamObject, dimensions, scale = 1) => {
  renderRings(streamObject, canvasContext, dimensions, scale)
  return canvasContext
}

const renderRings = (streamObject, canvasContext, dimensions, scale = 1) => {
  renderTerminusStreamRing(streamObject, canvasContext, dimensions, scale)
  renderStreamRing(streamObject, canvasContext, dimensions, scale)
  renderTroutStreamSectionRings(streamObject, canvasContext, dimensions, scale)
  renderPublicSectionRings(streamObject, canvasContext, dimensions, scale)
  // let privateAccessPoints = streamObject.accessPoints.filter(x => x.properties.bridgeType === 'permissionRequired')
  // let publicAccessPoints = streamObject.accessPoints.filter(x => x.properties.bridgeType)
  let accessPointTypes = groupBy(streamObject.accessPoints, ap => ap.properties.bridgeType)
  let tweakedDimensions = { ...dimensions, radius: dimensions.radius + 4 }
  if (has(accessPointTypes, 'permissionRequired')) {
    accessPointTypes.permissionRequired.forEach(ap => {
      let normalizedOffset = ap.properties.linear_offset
      renderPointAlongRing(normalizedOffset, canvasContext, tweakedDimensions, colors.StreamBlue, 0.5)
    })
  }

  if (has(accessPointTypes, 'publicTrout')) {
    accessPointTypes.publicTrout.forEach(ap => {
      let normalizedOffset = ap.properties.linear_offset
      renderPointAlongRing(normalizedOffset, canvasContext, tweakedDimensions, colors.PalGreen, 1.2)
    })
  }
}

const renderPointAlongRing = (normalizedOffset, context, dimensions, color, thickness = STREAM_WIDTH) => {
  let { width, height, radius, arcCompressionRatio, rotatePhase } = dimensions
  // let normalizedOffset = mileOffset / length
  let normalizedArcLength = TAU * arcCompressionRatio
  let arcOffset = (normalizedOffset * normalizedArcLength) - rotatePhase
  let xCoordinate = Math.cos(arcOffset) * radius + (width * 0.5)
  let yCoordinate = Math.sin(arcOffset) * radius + (height * 0.5)
  context.beginPath()
  context.fillStyle = color
  context.lineWidth = thickness
  context.strokeStyle = color
  context.arc(xCoordinate, yCoordinate, thickness, 0, TAU, false)
  context.fill()
  context.stroke()
}

export const renderTerminusStreamRing = (streamObject, canvasContext, dimensions, scale = 1, color = colors.OffWhite) => {
  let canvasCoordiantes = [dimensions.width * 0.5, dimensions.height * 0.5 - dimensions.radius]
  drawPointAlongRing(streamObject, canvasContext, dimensions, scale, color, canvasCoordiantes)
}

export const drawPointAlongRing = (streamObject, canvasContext, dimensions, scale = 1, color = colors.OffWhite, canvasCoordiantes) => {
  canvasContext.beginPath()
  canvasContext.fillStyle = color
  canvasContext.lineWidth = 1
  canvasContext.strokeStyle = color
  canvasContext.arc(canvasCoordiantes[0], canvasCoordiantes[1], 1, 0, TAU, false)
  canvasContext.fill()
  canvasContext.stroke()
}

export const renderStreamRing = (streamObject, canvasContext, dimensions, scale = 1) => {
  let length = streamObject.stream.properties.length_mi
  let start = 0
  let stop = length
  let ring = { start, stop, length }
  renderRing(ring, canvasContext, dimensions, colors.StreamGray, STREAM_WIDTH * scale * 0.5)
}

export const renderTroutStreamSectionRings = (streamObject, canvasContext, dimensions, widthScale = 1) => {
  let streamLength = streamObject.stream.properties.length_mi
  streamObject.sections.forEach((section, index) => {
    let ring = {
      start: section.properties.start,
      stop: section.properties.stop,
      length: streamLength
    }

    renderRing(ring, canvasContext, dimensions, colors.StreamBlue, TROUT_SECTION_WIDTH * widthScale * 0.5)
  })
}

export const bearingToAngle = (alpha) => {
  var beta = alpha % 360
  if (beta < 0) {
    beta += 360
  }
  return beta
}

export const renderPublicSectionRings = (streamObject, canvasContext, dimensions, scale = 1) => {
  let streamLength = streamObject.stream.properties.length_mi
  streamObject.palSections.forEach((section, index) => {
    let ring = {
      start: section.properties.start,
      stop: section.properties.stop,
      length: streamLength
    }

    renderRing(ring, canvasContext, dimensions, colors.PalGreen, PUBLIC_SECTION * scale * 0.5)
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
