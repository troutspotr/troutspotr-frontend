// tslint:disable:no-object-mutation

import { IStreamObject } from 'coreTypes/IStreamObject'
import { drawRingToCanvas } from 'ui/core/micromap/canvas/ring.canvas'
import { renderStreams } from 'ui/core/micromap/canvas/stream.canvas'
import {
  IDimensionsSettings,
  IMicromapCanvasSettings,
  TAU,
} from 'ui/core/micromap/Micromap.settings'

export const setUpCanvas = (
  canvasElement: HTMLCanvasElement,
  width: number,
  height: number,
  devicePixelRatio: number = 1
) => {
  const context = canvasElement.getContext('2d')
  if (context == null) {
    throw new Error('canvas context is null - cannot continue')
  }

  canvasElement.height = height
  canvasElement.width = width
  const canvas = canvasElement
  const oldWidth = canvas.width
  const oldHeight = canvas.height

  canvas.width = oldWidth * window.devicePixelRatio
  canvas.height = oldHeight * window.devicePixelRatio

  canvas.style.width = `${oldWidth}px`
  canvas.style.height = `${oldHeight}px`

  context.scale(window.devicePixelRatio, window.devicePixelRatio)
  return context
}

export const drawBackground = (
  canvasContext: CanvasRenderingContext2D,
  dimensions: IDimensionsSettings,
  color: string
) => {
  const { width, height } = dimensions
  canvasContext.clearRect(0, 0, width, height)
  canvasContext.fillStyle = color
  canvasContext.fillRect(0, 0, width, height)
}

export const drawStreamToCanvas = (
  canvasContext: CanvasRenderingContext2D,
  streamObject: IStreamObject,
  settings: IMicromapCanvasSettings
) => {
  const { dimensions } = settings
  canvasContext.clearRect(0, 0, dimensions.width, dimensions.height)
  renderPetriDish(canvasContext, settings, settings.colors.petriDish)
  renderStreams(streamObject, canvasContext, settings)
  drawRingToCanvas(canvasContext, streamObject, settings)
  return canvasContext
}

export const renderPetriDish = (
  context: CanvasRenderingContext2D,
  settings: IMicromapCanvasSettings,
  color = 'red'
) => {
  const { width, height } = settings.dimensions
  context.fillStyle = color
  context.lineWidth = 1
  context.strokeStyle = color
  context.beginPath()
  context.arc(width * 0.5, height * 0.5, width * 0.5 - 3, 0, TAU, true)
  context.fill()
  context.stroke()
}
