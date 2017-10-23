/* eslint-disable camelcase */
import {getProjectionFromFeature} from '../header/minimap/svgMinimap/GetProjectionFromFeature'
import * as colors from '../../core/Colors'
import * as d3Geo from 'd3-geo'
import bearing from '@turf/bearing'
import { groupBy, has } from 'lodash'

// Import distance from '@turf/distance'
// Import * as d3Path from 'd3-path'
// Let window = window || null
const TAU = Math.PI * 2
// const LINE_WIDTH = 1

// export const DEFAULT_SETTINGS = {
//   LINE_WIDTH,
//   STREAM_WIDTH: LINE_WIDTH,
//   TROUT_SECTION_WIDTH: LINE_WIDTH * 2,
//   PUBLIC_SECTION: LINE_WIDTH * 2.75,
//   END_POINT_SIZE: LINE_WIDTH * 2,
// }

// const LINE_WIDTH = 0.5
// const STREAM_WIDTH = LINE_WIDTH
// const TROUT_SECTION_WIDTH = LINE_WIDTH * 2
// const PUBLIC_SECTION = LINE_WIDTH * 2.75
// const END_POINT_SIZE = LINE_WIDTH * 2
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

const renderStreams = (streamObject, canvasContext, settings) => {
  const { dimensions } = settings
  const streamSettings = settings.settings.stream
  const projection = getProjectionFromFeature(streamObject.circle, { ...dimensions, radius: settings.settings.stream.radius })
  const geoPath = d3Geo.geoPath()
    .projection(projection)
    .pointRadius(streamSettings.terminusDiameter)
    .context(canvasContext)

  // Render stream
  renderStream(geoPath, canvasContext, streamObject.stream, colors.StreamGray, streamSettings.streamWidth)

  // render sections
  streamObject.sections.forEach((section) => {
    renderStream(geoPath, canvasContext, section, colors.StreamBlue, streamSettings.troutSectionWidth)
  })

  // Render public sections
  streamObject.palSections.forEach((section) => {
    renderStream(geoPath, canvasContext, section, colors.PalGreen, streamSettings.publicSectionWidth)
  })

  const streamConfluence = streamObject.stream.geometry.coordinates[0]
  renderPointOnStream(projection, canvasContext, streamConfluence, colors.OffWhite, streamSettings.terminusDiameter * 0.5)
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

export const drawStreamToCanvas = (canvasContext, streamObject, settings) => {
  const { dimensions } = settings
  canvasContext.clearRect(0, 0, dimensions.width, dimensions.height)
  // const streamDimensions = {
  //   ...dimensions,
  //   radius: dimensions.radius * 0.72,
  // }
  renderStreams(streamObject, canvasContext, settings)

  // const ringDimensions = {
  //   ...dimensions,
  //   radius: dimensions.radius * 0.78,
  // }
  drawRingToCanvas(canvasContext, streamObject, settings)
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

export const drawRingToCanvas = (canvasContext, streamObject, settings) => {
  renderRings(streamObject, canvasContext, settings)
  return canvasContext
}

const renderRings = (streamObject, canvasContext, settings) => {
  const accessPointSetttings = settings.settings.accessPoints
  renderStreamRing(streamObject, canvasContext, settings)
  renderTroutStreamSectionRings(streamObject, canvasContext, settings)
  renderPublicSectionRings(streamObject, canvasContext, settings)
  const accessPointTypes = groupBy(streamObject.accessPoints, (ap) => ap.properties.bridgeType)
  const accessPointsDimensions = {
    ...settings.dimensions,
    arcCompressionRatio: settings.settings.arcCompressionRatio,
    rotationPhase: settings.settings.rotationPhase,
    radius: accessPointSetttings.radius,
  }
  // const tweakedDimensions = {...accessPointsDimensions, 'radius': dimensions.radius + (2.5 * scale)}
  if (has(accessPointTypes, 'permissionRequired')) {
    accessPointTypes.permissionRequired.forEach((ap) => {
      const normalizedOffset = ap.properties.linear_offset
      renderPointAlongRing(normalizedOffset, canvasContext, accessPointsDimensions, colors.StreamBlue, settings.settings.accessPoints.permissionRequiredDiameter * 0.5)
    })
  }
  if (has(accessPointTypes, 'publicTrout')) {
    accessPointTypes.publicTrout.forEach((ap) => {
      const normalizedOffset = ap.properties.linear_offset
      renderPointAlongRing(normalizedOffset, canvasContext, accessPointsDimensions, colors.PalGreen, settings.settings.accessPoints.publiclyFishableDiameter * 0.5)
    })
  }

  renderTerminusStreamRing(streamObject, canvasContext, settings)
}

const renderPointAlongRing = (normalizedOffset, context, dimensions, color, thickness) => {
  const {width, height, radius, arcCompressionRatio, rotationPhase} = dimensions
  // Let normalizedOffset = mileOffset / length
  const normalizedArcLength = TAU * arcCompressionRatio
  const arcOffset = (normalizedOffset * normalizedArcLength) - rotationPhase
  const xCoordinate = Math.cos(arcOffset) * radius + (width * 0.5)
  const yCoordinate = Math.sin(arcOffset) * radius + (height * 0.5)
  context.beginPath()
  context.fillStyle = color
  // context.lineWidth = thickness * 10
  context.strokeStyle = color
  context.arc(xCoordinate, yCoordinate, thickness, 0, TAU, false)
  context.fill()
  // context.stroke()
}

export const renderTerminusStreamRing = (streamObject, canvasContext, settings, color = colors.OffWhite) => {
  const { dimensions } = settings
  const canvasCoordinates = [
    dimensions.width * 0.5,
    dimensions.height * 0.5 - settings.settings.circle.radius,
  ]
  drawPointAlongRing(streamObject, canvasContext, dimensions, settings.settings.circle.terminusDiameter * 0.5, color, canvasCoordinates)
}

export const drawPointAlongRing = (streamObject, canvasContext, dimensions, scale = 1, color = colors.OffWhite, canvasCoordiantes) => {
  canvasContext.beginPath()
  canvasContext.fillStyle = color
  canvasContext.lineWidth = 1
  canvasContext.strokeStyle = color
  canvasContext.arc(canvasCoordiantes[0], canvasCoordiantes[1], scale, 0, TAU, false)
  canvasContext.fill()
  canvasContext.stroke()
}

export const renderStreamRing = (streamObject, canvasContext, settings) => {
  const length = streamObject.stream.properties.length_mi
  const start = 0
  const stop = length
  const ring = {start, stop, length}
  const dimensions = {
    ...settings.dimensions,
    arcCompressionRatio: settings.settings.arcCompressionRatio,
    rotationPhase: settings.settings.rotationPhase,
    radius: settings.settings.circle.radius,
  }

  renderRing(ring, canvasContext, dimensions, colors.StreamGray, settings.settings.stream.streamWidth)
}

export const renderTroutStreamSectionRings = (streamObject, canvasContext, settings) => {
  const streamLength = streamObject.stream.properties.length_mi
  const dimensions = {
    ...settings.dimensions,
    arcCompressionRatio: settings.settings.arcCompressionRatio,
    rotationPhase: settings.settings.rotationPhase,
    radius: settings.settings.circle.radius,
  }
  streamObject.sections.forEach((section, index) => {
    const ring = {
      'start': section.properties.start,
      'stop': section.properties.stop,
      'length': streamLength,
    }

    renderRing(ring, canvasContext, dimensions, colors.StreamBlue, settings.settings.circle.troutSectionWidth)
  })
}

export const bearingToAngle = (alpha) => {
  let beta = alpha % 360
  if (beta < 0) {
    beta += 360
  }
  return beta
}

export const renderPublicSectionRings = (streamObject, canvasContext, settings) => {
  const dimensions = {
    ...settings.dimensions,
    arcCompressionRatio: settings.settings.arcCompressionRatio,
    rotationPhase: settings.settings.rotationPhase,
    radius: settings.settings.circle.radius,
  }
  const streamLength = streamObject.stream.properties.length_mi
  streamObject.palSections.forEach((section, index) => {
    const ring = {
      'start': section.properties.start,
      'stop': section.properties.stop,
      'length': streamLength,
    }

    renderRing(ring, canvasContext, dimensions, colors.PalGreen, settings.settings.circle.publicSectionWidth)
  })
}

const renderRing = ({start, stop, length}, context, dimensions, color, thickness) => {
  const {width, height, radius, arcCompressionRatio, rotationPhase} = dimensions
  const data = [
    start,
    stop,
  ].map((mileOffset) => {
    const normalizedOffset = mileOffset / length
    const normalizedArcLength = TAU * arcCompressionRatio
    const arcOffset = (normalizedOffset * normalizedArcLength) - rotationPhase
    return arcOffset
  })
  context.beginPath()
  context.lineWidth = thickness
  context.lineJoin = 'round'
  context.strokeStyle = color
  context.arc(width / 2, height / 2, radius, data[0], data[1])
  context.stroke()
}
