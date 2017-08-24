/* eslint-disable camelcase */
import {getProjectionFromFeature} from '../header/minimap/svgMinimap/GetProjectionFromFeature'
import * as colors from '../../core/Colors'
import * as d3Geo from 'd3-geo'
import bearing from '@turf/bearing'
// Import distance from '@turf/distance'
import {groupBy, has} from 'lodash'
// Import * as d3Path from 'd3-path'
// Let window = window || null
const TAU = Math.PI * 2
const LINE_WIDTH = 0.5 * 1
const STREAM_WIDTH = LINE_WIDTH
const TROUT_SECTION_WIDTH = LINE_WIDTH * 2
const PUBLIC_SECTION = LINE_WIDTH * 2.75
const END_POINT_SIZE = LINE_WIDTH * 2
const DEGREES_TO_RADIANS = 0.0174533
const getBackingStoreRatio = (context) => context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1

// https://www.html5rocks.com/en/tutorials/canvas/hidpi/
export const setUpCanvas = (canvasElement, width, height, devicePixelRatio = 1) => {
  const context = canvasElement.getContext('2d')
  canvasElement.height = height
  canvasElement.width = width

  const backingStoreRatio = getBackingStoreRatio(context)
  const ratio = devicePixelRatio / backingStoreRatio
  if (devicePixelRatio !== backingStoreRatio) {
    const canvas = canvasElement
    const oldWidth = canvas.width
    const oldHeight = canvas.height

    canvas.width = oldWidth * ratio
    canvas.height = oldHeight * ratio

    canvas.style.width = `${oldWidth}px`
    canvas.style.height = `${oldHeight}px`

    // Now scale the context to counter
    // The fact that we've manually scaled
    // Our canvas element
    context.scale(ratio, ratio)
  }
  return context
}

export const drawBackground = (canvasContext, dimensions, color) => {
  const {width, height} = dimensions
  canvasContext.clearRect(0, 0, width, height)
  canvasContext.fillStyle = color
  canvasContext.fillRect(0, 0, width, height)
}

const renderStreams = (streamObject, canvasContext, dimensions, scale = 1) => {
  const projection = getProjectionFromFeature(streamObject.circle, dimensions)
  const geoPath = d3Geo.geoPath()
    .projection(projection)
    .pointRadius(END_POINT_SIZE)
    .context(canvasContext)

  // Render stream
  renderStream(geoPath, canvasContext, streamObject.stream, colors.OffWhite, STREAM_WIDTH * 0.5 * scale)

  // // render sections
  streamObject.sections.forEach((section) => {
    renderStream(geoPath, canvasContext, section, colors.StreamBlue, TROUT_SECTION_WIDTH * scale)
  })

  // Render public sections
  streamObject.palSections.forEach((section) => {
    renderStream(geoPath, canvasContext, section, colors.PalGreen, PUBLIC_SECTION * scale)
  })

  const streamConfluence = streamObject.stream.geometry.coordinates[0]
  renderPointOnStream(projection, canvasContext, streamConfluence, colors.OffWhite, Number(scale))
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
  const canvasCoordiantes = projection(coordinates)
  context.lineWidth = 1
  context.strokeStyle = color
  context.arc(canvasCoordiantes[0], canvasCoordiantes[1], radius, 0, TAU, false)
  context.fill()
  context.stroke()
}

export const renderPetriDish = (context, dimensions, color) => {
  const {width, height} = dimensions
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
  const {width, height, radius} = dimensions
  canvasContext.clearRect(0, 0, width, height)

  if (gpsLocation == null) {
    return
  }

  const {centroid_longitude, centroid_latitude} = streamObject.stream.properties
  const streamLocation = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'Point',
      'coordinates': [
        centroid_longitude,
        centroid_latitude,
      ],
    },
  }

  const gpsBearing = bearing(streamLocation, gpsLocation)
  const degrees = gpsBearing + 90 * -1
  // Let degrees = -197.69053372467283
  const radians = degrees * DEGREES_TO_RADIANS
  const xCoordinate = Math.cos(radians) * radius + (width * 0.5)
  const yCoordinate = Math.sin(radians) * radius + (height * 0.5)
  const coordinates = [
    xCoordinate,
    yCoordinate,
  ]
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
  // Let privateAccessPoints = streamObject.accessPoints.filter(x => x.properties.bridgeType === 'permissionRequired')
  // Let publicAccessPoints = streamObject.accessPoints.filter(x => x.properties.bridgeType)
  const accessPointTypes = groupBy(streamObject.accessPoints, (ap) => ap.properties.bridgeType)
  const tweakedDimensions = {...dimensions, 'radius': dimensions.radius + 4}
  if (has(accessPointTypes, 'permissionRequired')) {
    accessPointTypes.permissionRequired.forEach((ap) => {
      const normalizedOffset = ap.properties.linear_offset
      renderPointAlongRing(normalizedOffset, canvasContext, tweakedDimensions, colors.StreamBlue, 0.5)
    })
  }

  if (has(accessPointTypes, 'publicTrout')) {
    accessPointTypes.publicTrout.forEach((ap) => {
      const normalizedOffset = ap.properties.linear_offset
      renderPointAlongRing(normalizedOffset, canvasContext, tweakedDimensions, colors.PalGreen, 1.2)
    })
  }
}

const renderPointAlongRing = (normalizedOffset, context, dimensions, color, thickness = STREAM_WIDTH) => {
  const {width, height, radius, arcCompressionRatio, rotatePhase} = dimensions
  // Let normalizedOffset = mileOffset / length
  const normalizedArcLength = TAU * arcCompressionRatio
  const arcOffset = (normalizedOffset * normalizedArcLength) - rotatePhase
  const xCoordinate = Math.cos(arcOffset) * radius + (width * 0.5)
  const yCoordinate = Math.sin(arcOffset) * radius + (height * 0.5)
  context.beginPath()
  context.fillStyle = color
  context.lineWidth = thickness
  context.strokeStyle = color
  context.arc(xCoordinate, yCoordinate, thickness, 0, TAU, false)
  context.fill()
  context.stroke()
}

export const renderTerminusStreamRing = (streamObject, canvasContext, dimensions, scale = 1, color = colors.OffWhite) => {
  const canvasCoordiantes = [
    dimensions.width * 0.5,
    dimensions.height * 0.5 - dimensions.radius,
  ]
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
  const length = streamObject.stream.properties.length_mi
  const start = 0
  const stop = length
  const ring = {start, stop, length}
  renderRing(ring, canvasContext, dimensions, colors.StreamGray, STREAM_WIDTH * scale * 0.5)
}

export const renderTroutStreamSectionRings = (streamObject, canvasContext, dimensions, widthScale = 1) => {
  const streamLength = streamObject.stream.properties.length_mi
  streamObject.sections.forEach((section, index) => {
    const ring = {
      'start': section.properties.start,
      'stop': section.properties.stop,
      'length': streamLength,
    }

    renderRing(ring, canvasContext, dimensions, colors.StreamBlue, TROUT_SECTION_WIDTH * widthScale * 0.5)
  })
}

export const bearingToAngle = (alpha) => {
  let beta = alpha % 360
  if (beta < 0) {
    beta += 360
  }
  return beta
}

export const renderPublicSectionRings = (streamObject, canvasContext, dimensions, scale = 1) => {
  const streamLength = streamObject.stream.properties.length_mi
  streamObject.palSections.forEach((section, index) => {
    const ring = {
      'start': section.properties.start,
      'stop': section.properties.stop,
      'length': streamLength,
    }

    renderRing(ring, canvasContext, dimensions, colors.PalGreen, PUBLIC_SECTION * scale * 0.5)
  })
}

const renderRing = ({start, stop, length}, context, dimensions, color, thickness = STREAM_WIDTH) => {
  const {width, height, radius, arcCompressionRatio, rotatePhase} = dimensions
  const data = [
    start,
    stop,
  ].map((mileOffset) => {
    const normalizedOffset = mileOffset / length
    const normalizedArcLength = TAU * arcCompressionRatio
    const arcOffset = (normalizedOffset * normalizedArcLength) - rotatePhase
    return arcOffset
  })
  context.beginPath()
  context.lineWidth = thickness
  context.lineJoin = 'round'
  context.strokeStyle = color
  context.arc(width / 2, height / 2, radius, data[0], data[1])
  context.stroke()
}
