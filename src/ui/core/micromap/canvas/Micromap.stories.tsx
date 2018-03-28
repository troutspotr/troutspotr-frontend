import { color, select, number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
const TroutRunCreek = require('./_stubs/trout-run-creek.json')
import * as MicromapSettings from 'ui/core/micromap/Micromap.settings'
import { MicroMapComponentCanvas } from './Micromap.component.canvas'
const colors = require('ui/styles/_colors.scss')
import * as MapColors from 'ui/routes/map/MapboxGlMap/styles/MapColors'
export const getRadius = (dimensions: number, ratio: number): number => {
  return dimensions * ratio / 2
}

const stories = storiesOf('Micromap', module)
const getDimensions = (): MicromapSettings.IDimensionsSettings => {
  const sizePx = number('Dimensions', 300, { range: true, min: 10, max: 500, step: 1 })
  const dimensions = {
    width: sizePx,
    height: sizePx,
  }
  return dimensions
}

const getContentSettings = (
  dimensions: MicromapSettings.IDimensionsSettings
): MicromapSettings.IContentSettings => {
  const arcCompressionRatio = number('Arc Compression Ratio', Math.PI / 6, {
    range: true,
    min: 0,
    max: Math.PI * 1.9,
    step: 0.01,
  })

  const rotationPhase = number('Rotation Phase', Math.PI / 2, {
    range: true,
    min: 0,
    max: Math.PI * 1.9,
    step: 0.01,
  })

  const stream = getStreamSettings(dimensions)
  const circle = getCircleSettings(dimensions, stream)
  const accessPoints = getAccessPointSettings(dimensions)

  return {
    arcCompressionRatio,
    rotationPhase,
    stream,
    circle,
    accessPoints,
  }
}

const getStreamSettings = (
  dimensions: MicromapSettings.IDimensionsSettings
): MicromapSettings.IStreamSettings => {
  const radiusRatio = number('Stream Radius Ratio', 0.9, {
    range: true,
    min: 0,
    max: 1,
    step: 0.01,
  })

  const backdropWidth = number('stream backdrop width', 1, {
    range: true,
    min: 0,
    max: 10,
    step: 0.01,
  })

  const radius = getRadius(dimensions.height, radiusRatio)
  const streamWidth = number('Stream Width', 1, {
    range: true,
    min: 0,
    max: 60,
    step: 0.01,
  })
  const troutSectionWidth = number('Trout Section Width', 1.1, {
    range: true,
    min: 0,
    max: 60,
    step: 0.01,
  })
  const publicSectionWidth = number('Public Section Width', 1.2, {
    range: true,
    min: 0,
    max: 60,
    step: 0.01,
  })
  const specialRegulationsWidth = number('Special Regulations Width', 1.3, {
    range: true,
    min: 0,
    max: 60,
    step: 0.01,
  })
  const terminusDiameter = number('Terminus Diameter', 1, {
    range: true,
    min: 0,
    max: 60,
    step: 0.01,
  })

  return {
    radius,
    streamWidth,
    troutSectionWidth,
    publicSectionWidth,
    specialRegulationsWidth,
    terminusDiameter,
    backdropWidth,
  }
}

const getCircleSettings = (
  dimensions: MicromapSettings.IDimensionsSettings,
  streamSettings: MicromapSettings.IStreamSettings
): MicromapSettings.ICircleSettings => {
  const radiusRatio = number('Circle Radius Ratio ', 0.9, {
    range: true,
    min: 0,
    max: 1,
    step: 0.01,
  })

  const radius = getRadius(dimensions.height, radiusRatio)

  return {
    ...streamSettings,
    radius,
  }
}

const getAccessPointSettings = (
  dimensions: MicromapSettings.IDimensionsSettings
): MicromapSettings.IAccessPointsSettings => {
  // const maxRadius = Math.max((dimensions.height - dimensions.padding) / 2, 0)
  // const radius = number('Access Point Radius', 0, {
  //   range: true,
  //   min: 0,
  //   max: maxRadius,
  //   step: 0.01,
  // })
  const radiusRatio = number('Access Point Radius Ratio', 0.9, {
    range: true,
    min: 0,
    max: 1,
    step: 0.01,
  })

  const radius = getRadius(dimensions.height, radiusRatio)

  const permissionRequiredDiameter = number('Permission Required Diameter', 0, {
    range: true,
    min: 0,
    max: 10,
    step: 0.01,
  })
  const publiclyFishableDiameter = number('Publicly Fishable Diameter', 0, {
    range: true,
    min: 0,
    max: 10,
    step: 0.01,
  })

  const backdropWidth = number('AP Backdrop Width', 1, {
    range: true,
    min: 0,
    max: 10,
    step: 0.01,
  })

  return {
    radius,
    permissionRequiredDiameter,
    publiclyFishableDiameter,
    backdropWidth: backdropWidth,
  }
}

export const getMicromapColorSettings = (): MicromapSettings.IColorSettings => {
  const backgroundFill = color('background color', colors.background)
  const streamColor = color('stream colors', colors.bluegray)
  const troutSectionFill = color('troutStreamSection color', colors.blue)
  const restrictionYellow = color('specialRegulation color', colors.yellow)
  const palSectionFill = color('palSection color', colors.green)
  const primaryLabelFill = color('primaryText color', colors.white)
  const secondaryLabelFill = color('secondaryText color', colors.offwhite)
  const petriDish = color('petri dish color', colors.gray)
  const backdropColor = color('backdrop', colors.black)
  return {
    backgroundFill,
    streamFill: streamColor,
    troutSectionFill,
    restrictionYellow,
    palSectionFill,
    primaryLabelFill,
    secondaryLabelFill,
    petriDish,
    backdropFill: backdropColor,
  }
}

export const getMicromapCanvasSettings = (): MicromapSettings.IMicromapCanvasSettings => {
  const dimensions = getDimensions()
  const settings = getContentSettings(dimensions)
  const colorsSettings = getMicromapColorSettings()
  const micromapSettings = {
    dimensions,
    settings,
    colors: colorsSettings,
  }

  return micromapSettings
}

stories.add('Customize', () => {
  const settings = getMicromapCanvasSettings()
  const props = {
    settings,
    streamObject: TroutRunCreek,
    id: '123',
  }

  console.log(settings)

  return <MicroMapComponentCanvas {...props} />
})

stories.add('Dark/Light', () => {
  const theme = select('Map Theme', { dark: 'dark', light: 'light' }, 'dark')
  const settings = MicromapSettings.DEFAULT_MICROMAP_CANVAS_SETTINGS
  const colorSettings = theme === 'dark' ? MapColors.DarkMapColors : MapColors.LightMapColors
  const updatedSettings: MicromapSettings.IMicromapCanvasSettings = {
    ...settings,
    colors: colorSettings,
  }
  const props = {
    settings: updatedSettings,
    streamObject: TroutRunCreek,
    id: '123',
  }

  console.log(settings)

  return <MicroMapComponentCanvas {...props} />
})
