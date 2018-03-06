import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { select, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { MapboxGlComponent, IMapboxGlProps } from 'ui/core/map/mapboxGl/MapboxGl.component'
import { createCameraObjectSimple } from 'ui/core/map/mapboxGl/MapboxGl.stories'
import * as mapboxGl from 'mapbox-gl'
import { createStyle } from './Base.style'
import { LightMapColors, DarkMapColors } from './MapColors'
import { ILayerProperties } from './ICreateLayer'

const stories = storiesOf('Map Styles', module)

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
  const camera = createCameraObjectSimple()
  const isOnline = boolean('isOnline', true)
  const isHighContrastEnabled = false

  const theme = select('Map Theme', { dark: 'dark', light: 'light' }, 'dark')
  const satelliteZoomLevel = 12
  const satelliteTransitionScalar = 1
  const satellitePrefetchZoomLevel = 12
  const colorDictionary = theme === 'dark' ? DarkMapColors : LightMapColors
  const layerProps: ILayerProperties = {
    satelliteZoomLevel,
    satelliteResolution: 256,
    satelliteTransitionScalar,
    satellitePrefetchZoomLevel,
    pallete: colorDictionary,
    isOnline,
    roadTransparencyZoomLevel: DEFAULT_ROAD_TRANSPARENCY_ZOOM,
    roadTransparency: DEFAULT_ROAD_TRANSPARENCY,
    isHighContrastEnabled,
  }
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected,
    camera,
    mapboxGl,
    debugMode: false,
    style: createStyle(layerProps),
  }
  return <MapboxGlComponent {...props} />
})

stories.add('Satellite Tweaks', () => {
  const onFeaturesSelected = action('asdf')
  const camera = createCameraObjectSimple()
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
    satelliteZoomLevel,
    satelliteResolution: getResolution(),
    satelliteTransitionScalar,
    satellitePrefetchZoomLevel,
    roadTransparencyZoomLevel: DEFAULT_ROAD_TRANSPARENCY_ZOOM,
    roadTransparency: DEFAULT_ROAD_TRANSPARENCY,
    pallete: colorDictionary,
    isOnline,
    isHighContrastEnabled,
  }
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected,
    camera,
    mapboxGl,
    debugMode: true,
    style: createStyle(layerProps),
  }
  console.log('satelliteZoomLevel', satelliteZoomLevel)
  return <MapboxGlComponent {...props} />
})

stories.add('Street Transparency Tweaks', () => {
  const onFeaturesSelected = action('asdf')
  const camera = createCameraObjectSimple()
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
    satelliteZoomLevel,
    satelliteResolution: 256,
    satelliteTransitionScalar,
    satellitePrefetchZoomLevel,
    roadTransparencyZoomLevel,
    roadTransparency,
    pallete: colorDictionary,
    isOnline,
    isHighContrastEnabled,
  }
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected,
    camera,
    mapboxGl,
    debugMode: true,
    style: createStyle(layerProps),
  }
  console.log('satelliteZoomLevel', satelliteZoomLevel)
  return <MapboxGlComponent {...props} />
})

stories.add('High Contrast Mode', () => {
  const onFeaturesSelected = action('asdf')
  const camera = createCameraObjectSimple()
  const isOnline = boolean('isOnline', true)
  const isHighContrastEnabled = boolean('high contrast', false)

  const theme = select('Map Theme', { dark: 'dark', light: 'light' }, 'dark')
  const satelliteZoomLevel = 12
  const satelliteTransitionScalar = 1
  const satellitePrefetchZoomLevel = 12
  const colorDictionary = theme === 'dark' ? DarkMapColors : LightMapColors
  const layerProps: ILayerProperties = {
    satelliteZoomLevel,
    satelliteResolution: 256,
    satelliteTransitionScalar,
    satellitePrefetchZoomLevel,
    roadTransparencyZoomLevel: DEFAULT_ROAD_TRANSPARENCY_ZOOM,
    roadTransparency: DEFAULT_ROAD_TRANSPARENCY,
    pallete: colorDictionary,
    isOnline,
    isHighContrastEnabled,
  }
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected,
    camera,
    mapboxGl,
    debugMode: true,
    style: createStyle(layerProps),
  }
  console.log('satelliteZoomLevel', satelliteZoomLevel)
  return <MapboxGlComponent {...props} />
})
