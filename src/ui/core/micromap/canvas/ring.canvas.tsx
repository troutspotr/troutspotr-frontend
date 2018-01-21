// tslint:disable:no-object-mutation
// This file only does one thing: draw rings.
// tslint:disable:max-file-line-count
import { groupBy } from 'lodash'
import { ISection } from 'coreTypes/ISection'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { IMicromapSettings, TAU } from '../Micromap.settings'
const colors = require('ui/styles/_colors.scss')

const renderRing = (
  { start, stop, length }: ISection,
  context: CanvasRenderingContext2D,
  settings: IMicromapSettings,
  color = 'red',
  thickness = 1
) => {
  const dimensions = {
    ...settings.dimensions,
    arcCompressionRatio: settings.settings.arcCompressionRatio,
    rotationPhase: settings.settings.rotationPhase,
    radius: settings.settings.circle.radius,
  }
  const { width, height, radius, arcCompressionRatio, rotationPhase } = dimensions

  const data = [start, stop].map(mileOffset => {
    const normalizedOffset = mileOffset / length
    const normalizedArcLength = TAU * arcCompressionRatio
    const arcOffset = normalizedOffset * normalizedArcLength - rotationPhase
    return arcOffset
  })
  context.beginPath()
  context.lineWidth = thickness
  context.lineJoin = 'round'
  context.strokeStyle = color
  context.arc(width / 2, height / 2, radius, data[0], data[1])
  context.stroke()
}

const renderPointAlongRing = (
  normalizedOffset: number,
  context: CanvasRenderingContext2D,
  settings: IMicromapSettings,
  color = 'red',
  thickness = 1
) => {
  const dimensions = {
    ...settings.dimensions,
    arcCompressionRatio: settings.settings.arcCompressionRatio,
    rotationPhase: settings.settings.rotationPhase,
    radius: settings.settings.circle.radius,
  }
  const { width, height, radius, arcCompressionRatio, rotationPhase } = dimensions
  const normalizedArcLength = TAU * arcCompressionRatio
  const arcOffset = normalizedOffset * normalizedArcLength - rotationPhase
  const xCoordinate = Math.cos(arcOffset) * radius + width * 0.5
  const yCoordinate = Math.sin(arcOffset) * radius + height * 0.5
  context.beginPath()
  context.fillStyle = color
  context.strokeStyle = color
  context.arc(xCoordinate, yCoordinate, thickness, 0, TAU, false)
  context.fill()
}

export const drawPointAlongRing = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapSettings,
  scale = 1,
  color = colors.OffWhite,
  canvasCoordiantes: ReadonlyArray<number>
) => {
  canvasContext.beginPath()
  canvasContext.fillStyle = color
  canvasContext.lineWidth = 1
  canvasContext.strokeStyle = color
  canvasContext.arc(canvasCoordiantes[0], canvasCoordiantes[1], scale, 0, TAU, false)
  canvasContext.fill()
  canvasContext.stroke()
}

export const renderPublicSectionRings = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapSettings
) => {
  if (streamObject.stream.properties == null) {
    return
  }

  // if (streamObject.palSections.pr)

  const streamLength = streamObject.stream.properties.length_mi
  streamObject.palSections.forEach((section, index) => {
    const ring: ISection = {
      start: section.properties == null ? 0 : section.properties.start,
      stop: section.properties == null ? 0 : section.properties.stop,
      length: streamLength,
    }

    renderRing(
      ring,
      canvasContext,
      settings,
      colors.PalGreen,
      settings.settings.circle.publicSectionWidth
    )
  })
}

export const renderStreamRing = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapSettings
) => {
  const length =
    streamObject.stream.properties == null ? 0 : streamObject.stream.properties.length_mi
  const start = 0
  const stop = length
  const ring: ISection = { start, stop, length }

  renderRing(ring, canvasContext, settings, colors.StreamGray, settings.settings.stream.streamWidth)
}

export const renderTroutStreamSectionRings = (
  canvasContext: CanvasRenderingContext2D,
  streamObject: IStreamObject,
  settings: IMicromapSettings
) => {
  if (streamObject.stream == null || streamObject.stream.properties == null) {
    return
  }

  const streamLength = streamObject.stream.properties.length_mi
  streamObject.troutSections.forEach((section, index: number) => {
    const ring: ISection = {
      start: section.properties == null ? 0 : section.properties.start,
      stop: section.properties == null ? 0 : section.properties.stop,
      length: streamLength,
    }

    renderRing(
      ring,
      canvasContext,
      settings,
      colors.StreamBlue,
      settings.settings.circle.troutSectionWidth
    )
  })
}

export const renderTerminusStreamRing = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapSettings,
  color = colors.OffWhite
) => {
  const { dimensions } = settings
  const canvasCoordinates = [
    dimensions.width * 0.5,
    dimensions.height * 0.5 - settings.settings.circle.radius,
  ]
  drawPointAlongRing(
    streamObject,
    canvasContext,
    settings,
    settings.settings.circle.terminusDiameter * 0.5,
    color,
    canvasCoordinates
  )
}

const renderRings = (
  canvasContext: CanvasRenderingContext2D,
  streamObject: IStreamObject,
  settings: IMicromapSettings
) => {
  renderStreamRing(streamObject, canvasContext, settings)
  renderTroutStreamSectionRings(canvasContext, streamObject, settings)
  renderPublicSectionRings(streamObject, canvasContext, settings)
  const accessPointTypes = groupBy(
    streamObject.accessPoints,
    ap => (ap.properties || {}).bridgeType
  )
  if (accessPointTypes.permissionRequired != null) {
    accessPointTypes.permissionRequired.forEach(ap => {
      const normalizedOffset = 0 // ap.properties.linear_offset
      renderPointAlongRing(
        normalizedOffset,
        canvasContext,
        settings,
        colors.StreamBlue,
        settings.settings.accessPoints.permissionRequiredDiameter * 0.5
      )
    })
  }
  if (accessPointTypes.publicTrout != null) {
    accessPointTypes.publicTrout.forEach(ap => {
      const normalizedOffset = 0 // ap.properties.linear_offset
      renderPointAlongRing(
        normalizedOffset,
        canvasContext,
        settings,
        colors.PalGreen,
        settings.settings.accessPoints.publiclyFishableDiameter * 0.5
      )
    })
  }

  renderTerminusStreamRing(streamObject, canvasContext, settings)
}

export const drawRingToCanvas = (
  canvasContext: CanvasRenderingContext2D,
  streamObject: IStreamObject,
  settings: IMicromapSettings
) => {
  renderRings(canvasContext, streamObject, settings)
  return canvasContext
}
