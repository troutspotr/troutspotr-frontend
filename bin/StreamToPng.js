import {drawBackground, drawRingToCanvas, drawStreamToCanvas, setUpCanvas} from '../src/ui/core/micromap/Micromap'
import * as colors from '../src/ui/core/Colors'
import Canvas from 'canvas'

const sharp = require('sharp')
const WIDTH = 300
const HEIGHT = 300
const BUFFER = 20
const SQUISH_FACTOR = 0.90
const ROTATE_PHASE = Math.PI / 2

const DIMENSIONS = {
  'width': WIDTH,
  'height': HEIGHT,
  'radius': (Math.min(WIDTH, HEIGHT) - BUFFER) * 0.5,
  'buffer': BUFFER,
  'arcCompressionRatio': SQUISH_FACTOR,
  'rotatePhase': ROTATE_PHASE,
}

const saveAsPng = (stream, directory, width = WIDTH, height = HEIGHT) => {
  if (stream.stream.properties.slug == null || stream.stream.properties.slug.length === 0) {
    console.log('stream properties are wrong. bailing.') // eslint-disable-line
    return
  }

  const canvas = new Canvas(width, height)
  const context = setUpCanvas(canvas)
  drawBackground(context, DIMENSIONS, colors.Background)
  const scaleWidthThicker = 5
  drawStreamToCanvas(context, stream, DIMENSIONS, scaleWidthThicker)
  drawRingToCanvas(context, stream, DIMENSIONS, scaleWidthThicker)
  const buf = canvas.toBuffer()
  const fileName = `${directory}/${stream.stream.properties.slug}.jpg`
  console.log(`saving ${fileName}`) // eslint-disable-line
  sharp(buf)
    .toFile(fileName)
}

export default saveAsPng
