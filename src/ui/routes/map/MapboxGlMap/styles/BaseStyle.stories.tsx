import { action } from '@storybook/addon-actions'
import { boolean, number, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as mapboxGl from 'mapbox-gl'
import * as React from 'react'
import { IMapboxGlProps, MapboxGlComponent } from 'ui/core/map/mapboxGl/MapboxGl.component'
import { createStyle } from './Base.style'
import { defaultLayerProperties, ILayerProperties } from './ICreateLayer'
import { DarkMapColors, LightMapColors } from './MapColors'

const stories = storiesOf('Map Styles/Base Map', module)

export const createLayerProperties = (): ILayerProperties => {
  const theme = select('Map Theme', { dark: 'dark', light: 'light' }, 'dark')
  const colorDictionary = theme === 'dark' ? DarkMapColors : LightMapColors
  const isOnline = boolean('isOnline', true)
  const satelliteZoomLevel = 12
  const satelliteTransitionScalar = 1
  const satellitePrefetchZoomLevel = 12
  const isHighContrastEnabled = boolean('high contrast', false)

  const layerProps: ILayerProperties = {
    ...defaultLayerProperties(),
    satelliteZoomLevel,
    satelliteResolution: 256,
    satelliteTransitionScalar,
    satellitePrefetchZoomLevel,
    pallete: colorDictionary,
    isOnline,
    roadTransparencyZoomLevel: DEFAULT_ROAD_TRANSPARENCY_ZOOM,
    roadTransparency: DEFAULT_ROAD_TRANSPARENCY,
    isHighContrastEnabled,
    streamSettings: {
      radius: 0,
      streamWidth: 1,
      troutSectionWidth: 1,
      specialRegulationsWidth: 1,
      publicSectionWidth: 1,
      terminusDiameter: 0,
      backdropWidth: 3,
    },
  }

  return layerProps
}
export const createDefaultSettings = (layerProps = createLayerProperties()): IMapboxGlProps => {
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected: action('asdf'),
    mapboxGl,
    debugMode: true,
    style: createStyle(layerProps),
  }

  return props
}

const getResolution = () => {
  const satelliteResolution = parseInt(
    select(
      'Satellite Resolution',
      { '128': '128', '256': '256', '512': '512', '1024': '1024' },
      '512'
    ),
    10
  )

  if (satelliteResolution <= 128) {
    return 128
  }

  if (satelliteResolution <= 256) {
    return 256
  }

  if (satelliteResolution <= 512) {
    return 512
  }

  return 1024
}
const DEFAULT_ROAD_TRANSPARENCY_ZOOM = 16.5
const DEFAULT_ROAD_TRANSPARENCY = 0.3
stories.add('Dark and Light', () => {
  const onFeaturesSelected = action('asdf')
  const isOnline = boolean('isOnline', true)
  const isHighContrastEnabled = false

  const theme = select('Map Theme', { dark: 'dark', light: 'light' }, 'dark')
  const satelliteZoomLevel = 12
  const satelliteTransitionScalar = 1
  const satellitePrefetchZoomLevel = 12
  const colorDictionary = theme === 'dark' ? DarkMapColors : LightMapColors
  const layerProps: ILayerProperties = {
    ...defaultLayerProperties(),
    satelliteZoomLevel,
    satelliteResolution: 256,
    satelliteTransitionScalar,
    satellitePrefetchZoomLevel,
    pallete: colorDictionary,
    isOnline,
    roadTransparencyZoomLevel: DEFAULT_ROAD_TRANSPARENCY_ZOOM,
    roadTransparency: DEFAULT_ROAD_TRANSPARENCY,
    isHighContrastEnabled,
    streamSettings: {
      radius: 0,
      streamWidth: 1,
      troutSectionWidth: 1,
      specialRegulationsWidth: 1,
      publicSectionWidth: 1,
      terminusDiameter: 0,
      backdropWidth: 3,
    },
  }
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected,
    mapboxGl,
    debugMode: false,
    style: createStyle(layerProps),
  }
  return <MapboxGlComponent {...props} />
})

stories.add('Satellite Tweaks', () => {
  const onFeaturesSelected = action('asdf')

  const isOnline = boolean('isOnline', true)
  const isHighContrastEnabled = false

  const theme = select('Map Theme', { dark: 'dark', light: 'light' }, 'dark')
  const satelliteZoomLevel = number('Satellite Zoom', 12, {
    range: true,
    min: 0,
    max: 22,
    step: 0.01,
  })

  const satelliteTransitionScalar = number('Satellite transition scalar', 1, {
    range: true,
    min: 0,
    max: 4,
    step: 0.01,
  })

  const satellitePrefetch = number('Satellite prefetch zoom', 0, {
    range: true,
    min: -2,
    max: 0,
    step: 0.01,
  })

  const satellitePrefetchZoomLevel = satelliteZoomLevel + satellitePrefetch
  const colorDictionary = theme === 'dark' ? DarkMapColors : LightMapColors
  const layerProps: ILayerProperties = {
    ...defaultLayerProperties(),
    satelliteZoomLevel,
    satelliteResolution: getResolution(),
    satelliteTransitionScalar,
    satellitePrefetchZoomLevel,
    roadTransparencyZoomLevel: DEFAULT_ROAD_TRANSPARENCY_ZOOM,
    roadTransparency: DEFAULT_ROAD_TRANSPARENCY,
    pallete: colorDictionary,
    isOnline,
    isHighContrastEnabled,
    streamSettings: {
      radius: 0,
      streamWidth: 1,
      troutSectionWidth: 1,
      specialRegulationsWidth: 1,
      publicSectionWidth: 1,
      terminusDiameter: 0,
      backdropWidth: 3,
    },
  }
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected,

    mapboxGl,
    debugMode: true,
    style: createStyle(layerProps),
  }
  console.log('satelliteZoomLevel', satelliteZoomLevel)
  return <MapboxGlComponent {...props} />
})

stories.add('Street Transparency Tweaks', () => {
  const onFeaturesSelected = action('asdf')

  const isOnline = boolean('isOnline', true)
  const isHighContrastEnabled = boolean('high contrast', false)

  const theme = select('Map Theme', { dark: 'dark', light: 'light' }, 'dark')
  const satelliteZoomLevel = number('Satellite Zoom', 12, {
    range: true,
    min: 0,
    max: 22,
    step: 0.01,
  })

  const roadTransparencyZoomLevel = number('Road Trans. Zoom', 12.5, {
    range: true,
    min: 0,
    max: 22,
    step: 0.01,
  })

  const roadTransparency = number('Road Transparency', 0.3, {
    range: true,
    min: 0,
    max: 1,
    step: 0.01,
  })

  const satelliteTransitionScalar = 1
  const satellitePrefetchZoomLevel = satelliteZoomLevel
  const colorDictionary = theme === 'dark' ? DarkMapColors : LightMapColors
  const layerProps: ILayerProperties = {
    ...defaultLayerProperties(),
    satelliteZoomLevel,
    satelliteResolution: 256,
    satelliteTransitionScalar,
    satellitePrefetchZoomLevel,
    roadTransparencyZoomLevel,
    roadTransparency,
    pallete: colorDictionary,
    isOnline,
    isHighContrastEnabled,
    streamSettings: {
      radius: 0,
      streamWidth: 1,
      troutSectionWidth: 1,
      specialRegulationsWidth: 1,
      publicSectionWidth: 1,
      terminusDiameter: 0,
      backdropWidth: 3,
    },
  }
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected,

    mapboxGl,
    debugMode: true,
    style: createStyle(layerProps),
  }
  console.log('satelliteZoomLevel', satelliteZoomLevel)
  return <MapboxGlComponent {...props} />
})

stories.add('High Contrast Mode', () => {
  const onFeaturesSelected = action('asdf')

  const isOnline = boolean('isOnline', true)
  const isHighContrastEnabled = boolean('high contrast', false)

  const theme = select('Map Theme', { dark: 'dark', light: 'light' }, 'dark')
  const satelliteZoomLevel = 12
  const satelliteTransitionScalar = 1
  const satellitePrefetchZoomLevel = 12
  const colorDictionary = theme === 'dark' ? DarkMapColors : LightMapColors
  const layerProps: ILayerProperties = {
    ...defaultLayerProperties(),
    satelliteZoomLevel,
    satelliteResolution: 256,
    satelliteTransitionScalar,
    satellitePrefetchZoomLevel,
    roadTransparencyZoomLevel: DEFAULT_ROAD_TRANSPARENCY_ZOOM,
    roadTransparency: DEFAULT_ROAD_TRANSPARENCY,
    pallete: colorDictionary,
    isOnline,
    isHighContrastEnabled,
    streamSettings: {
      radius: 0,
      streamWidth: 1,
      troutSectionWidth: 1,
      specialRegulationsWidth: 1,
      publicSectionWidth: 1,
      terminusDiameter: 0,
      backdropWidth: 3,
    },
  }
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected,

    mapboxGl,
    debugMode: true,
    style: createStyle(layerProps),
  }
  console.log('satelliteZoomLevel', satelliteZoomLevel)
  return <MapboxGlComponent {...props} />
})
