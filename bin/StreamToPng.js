import { drawStreamToCanvas, setUpCanvas, drawBackground, drawRingToCanvas } from '../src/ui/core/micromap/Micromap'
import * as colors from '../src/ui/core/Colors'
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
var sharp = require('sharp')

import Canvas from 'canvas'
const WIDTH = 300
const HEIGHT = 300
const BUFFER = 20
const SQUISH_FACTOR = 0.90
const ROTATE_PHASE = Math.PI / 2
// const RADIUS = (Math.min(HEIGHT, WIDTH) / 2) - BUFFER

const DIMENSIONS = {
  width: WIDTH,
  height: HEIGHT,
  radius: (Math.min(WIDTH, HEIGHT) - BUFFER) * 0.5,
  buffer: BUFFER,
  arcCompressionRatio: SQUISH_FACTOR,
  rotatePhase: ROTATE_PHASE
}

const saveAsPng = (stream, directory, width = WIDTH, height = HEIGHT) => {
  console.log('trying to save stream')
  if (stream.stream.properties.slug == null || stream.stream.properties.slug.length === 0) {
    console.log('stream properties are wrong. bailing.')
    return
  }

  let canvas = new Canvas(width, height)
  let context = setUpCanvas(canvas)
  drawBackground(context, DIMENSIONS, colors.Background)
  // renderPetriDish(context, DIMENSIONS, colors.MoodyGray)
  const scaleWidthThicker = 5
  drawStreamToCanvas(context, stream, DIMENSIONS, scaleWidthThicker)
  drawRingToCanvas(context, stream, DIMENSIONS, scaleWidthThicker)
  let buf = canvas.toBuffer()
  let fileName = `${directory}/${stream.stream.properties.slug}.jpg`
  console.log('saving ' + fileName)
  sharp(buf)
    .toFile(fileName)
  // return fs.writeFile(fileName, buf)
}

export default saveAsPng
