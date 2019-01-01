// tslint:disable:no-object-mutation
// This file only does one thing: draw rings.
// tslint:disable:max-file-line-count
import { ISection } from 'coreTypes/ISection'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { IMicromapCanvasSettings, TAU } from 'ui/core/micromap/Micromap.settings'
const colors = require('ui/styles/_colors.scss')

const renderRing = (
  { start, stop, length }: ISection,
  context: CanvasRenderingContext2D,
  settings: IMicromapCanvasSettings,
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
  context.save()
  context.beginPath()
  context.lineWidth = thickness
  context.lineJoin = 'round'
  context.strokeStyle = color
  context.arc(width / 2, height / 2, radius, data[0], data[1])
  context.stroke()
  context.restore()
}

const renderPointAlongRing = (
  normalizedOffset: number,
  context: CanvasRenderingContext2D,
  settings: IMicromapCanvasSettings,
  color = 'red',
  thickness = 1,
  radius: number
) => {
  const dimensions = {
    ...settings.dimensions,
    arcCompressionRatio: settings.settings.arcCompressionRatio,
    rotationPhase: settings.settings.rotationPhase,
    radius: settings.settings.circle.radius,
  }
  const { width, height, arcCompressionRatio, rotationPhase } = dimensions
  const normalizedArcLength = TAU * arcCompressionRatio
  const arcOffset = normalizedOffset * normalizedArcLength - rotationPhase
  const xCoordinate = Math.cos(arcOffset) * radius + width * 0.5
  const yCoordinate = Math.sin(arcOffset) * radius + height * 0.5
  context.save()
  context.beginPath()
  context.fillStyle = color
  context.strokeStyle = color
  context.arc(xCoordinate, yCoordinate, thickness, 0, TAU, false)
  context.fill()
  context.restore()
}

export const drawPointAlongRing = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapCanvasSettings,
  scale = 1,
  color = colors.OffWhite,
  canvasCoordiantes: ReadonlyArray<number>
) => {
  canvasContext.save()
  canvasContext.beginPath()
  canvasContext.fillStyle = color
  canvasContext.lineWidth = 1
  canvasContext.strokeStyle = color
  canvasContext.arc(canvasCoordiantes[0], canvasCoordiantes[1], scale, 0, TAU, false)
  canvasContext.fill()
  canvasContext.stroke()
  canvasContext.restore()
}

export const renderPublicSectionRings = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapCanvasSettings,
  thickness: number,
  color: string
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

    renderRing(ring, canvasContext, settings, color, thickness)
  })
}

export const renderStreamRing = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapCanvasSettings
) => {
  const length =
    streamObject.stream.properties == null ? 0 : streamObject.stream.properties.length_mi
  const start = 0
  const stop = length
  const ring: ISection = { start: start, stop: stop, length: length }

  renderRing(
    ring,
    canvasContext,
    settings,
    settings.colors.streamFill,
    settings.settings.stream.streamWidth
  )
}

export const renderTroutStreamSectionRings = (
  canvasContext: CanvasRenderingContext2D,
  streamObject: IStreamObject,
  settings: IMicromapCanvasSettings,
  thickness: number,
  color: string
) => {
  if (streamObject.stream == null || streamObject.stream.properties == null) {
    return
  }

  const streamLength = streamObject.stream.properties.length_mi
  streamObject.sections.forEach((section, index: number) => {
    const ring: ISection = {
      start: section.properties == null ? 0 : section.properties.start,
      stop: section.properties == null ? 0 : section.properties.stop,
      length: streamLength,
    }

    renderRing(ring, canvasContext, settings, color, thickness)
  })
}

export const renderTerminusStreamRing = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapCanvasSettings
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
    settings.colors.secondaryLabelFill,
    canvasCoordinates
  )
}

const renderRings = (
  canvasContext: CanvasRenderingContext2D,
  streamObject: IStreamObject,
  settings: IMicromapCanvasSettings
) => {
  renderTerminusStreamRing(streamObject, canvasContext, settings)
  renderTroutStreamSectionRings(
    canvasContext,
    streamObject,
    settings,
    settings.settings.circle.troutSectionWidth + settings.settings.circle.backdropWidth,
    settings.colors.backdropFill
  )
  renderPublicSectionRings(
    streamObject,
    canvasContext,
    settings,
    settings.settings.circle.publicSectionWidth + settings.settings.circle.backdropWidth,
    settings.colors.backdropFill
  )
  const drawnAccessPoints = streamObject.accessPoints.filter(
    ap =>
      ap.properties.bridgeType === 'publicTrout' ||
      ap.properties.bridgeType === 'permissionRequired'
  )

  drawnAccessPoints.forEach(ap => {
    const { bridgeType, linear_offset } = ap.properties

    if (bridgeType === 'publicTrout') {
      renderPointAlongRing(
        linear_offset,
        canvasContext,
        settings,
        settings.colors.backdropFill,
        settings.settings.accessPoints.publiclyFishableDiameter * 0.5 +
          settings.settings.accessPoints.backdropWidth,
        settings.settings.accessPoints.radius
      )
    }

    if (bridgeType === 'permissionRequired') {
      renderPointAlongRing(
        linear_offset,
        canvasContext,
        settings,
        settings.colors.backdropFill,
        settings.settings.accessPoints.permissionRequiredDiameter * 0.5 +
          settings.settings.accessPoints.backdropWidth,
        settings.settings.accessPoints.radius
      )
    }
  })

  renderStreamRing(streamObject, canvasContext, settings)
  renderTroutStreamSectionRings(
    canvasContext,
    streamObject,
    settings,
    settings.settings.circle.troutSectionWidth,
    settings.colors.troutSectionFill
  )
  renderPublicSectionRings(
    streamObject,
    canvasContext,
    settings,
    settings.settings.circle.publicSectionWidth,
    settings.colors.palSectionFill
  )
  if (streamObject.accessPoints == null) {
    return
  }

  drawnAccessPoints.forEach(ap => {
    const { bridgeType, linear_offset } = ap.properties
    if (bridgeType === 'publicTrout') {
      renderPointAlongRing(
        linear_offset,
        canvasContext,
        settings,
        settings.colors.palSectionFill,
        settings.settings.accessPoints.publiclyFishableDiameter * 0.5,
        settings.settings.accessPoints.radius
      )
    }

    if (bridgeType === 'permissionRequired') {
      renderPointAlongRing(
        linear_offset,
        canvasContext,
        settings,
        settings.colors.troutSectionFill,
        settings.settings.accessPoints.permissionRequiredDiameter * 0.5,
        settings.settings.accessPoints.radius
      )
    }
  })
}

export const drawRingToCanvas = (
  canvasContext: CanvasRenderingContext2D,
  streamObject: IStreamObject,
  settings: IMicromapCanvasSettings
) => {
  renderRings(canvasContext, streamObject, settings)
  return canvasContext
}
