import {
  drawBackground, drawRingToCanvas, drawStreamToCanvas,
  setUpCanvas
} from '../src/ui/core/micromap/Micromap'
import { scaleDefaultSettingsBy, DEFAULT_SETTINGS } from '../src/ui/core/micromap/Micromap.settings'
import * as colors from '../src/ui/core/Colors'
import Canvas from 'canvas'
import _ from 'lodash'

const largerImageSettings = _.cloneDeep(DEFAULT_SETTINGS)
const sharp = require('sharp')
const WIDTH = 400
const PADDING = 235
const DEFAULT_CIRCLE_RADIUS = WIDTH - PADDING

largerImageSettings.dimensions = {
  width: WIDTH + 60,
  height: WIDTH,
  padding: PADDING,
}

largerImageSettings.settings.stream.radius = DEFAULT_CIRCLE_RADIUS - 30
largerImageSettings.settings.stream.troutSectionWidth *= 0.7
largerImageSettings.settings.circle.radius = DEFAULT_CIRCLE_RADIUS
largerImageSettings.settings.circle.troutSectionWidth *= 0.85

largerImageSettings.settings.accessPoints.radius = DEFAULT_CIRCLE_RADIUS + 20

const microMapSettings = scaleDefaultSettingsBy(0.6, largerImageSettings)
console.log(microMapSettings)
const saveAsPng = (stream, directory) => {
  if (stream.stream.properties.slug == null || stream.stream.properties.slug.length === 0) {
    console.log('stream properties are wrong. bailing.') // eslint-disable-line
    return
  }
  const { width, height } = largerImageSettings.dimensions
  const canvas = new Canvas(width, height)
  const context = setUpCanvas(canvas)
  drawBackground(context, microMapSettings.dimensions, colors.Background)
  drawStreamToCanvas(context, stream, microMapSettings)
  const buf = canvas.toBuffer()
  const fileName = `${directory}/${stream.stream.properties.slug}.jpg`
  console.log(`saving ${fileName}`) // eslint-disable-line
  sharp(buf)
    .toFile(fileName)
}

export default saveAsPng
