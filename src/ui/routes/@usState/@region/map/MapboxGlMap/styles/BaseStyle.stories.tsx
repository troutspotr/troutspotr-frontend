import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { MapboxGlComponent, IMapboxGlProps } from 'ui/core/map/mapboxGl/MapboxGl.component'
import { createCameraObjectSimple } from 'ui/core/map/mapboxGl/MapboxGl.stories'
import * as mapboxGl from 'mapbox-gl'
import { createStyle } from './Base.style'
import { LightMapColors, DarkMapColors } from './MapColors'
const stories = storiesOf('Map Styles/Base Style', module)

stories.add('Dark Mode', () => {
  const onFeaturesSelected = action('asdf')
  const camera = createCameraObjectSimple()
  const theme = select('Map Theme', { dark: 'dark', light: 'light' }, 'dark')
  const colorDictionary = theme === 'dark' ? DarkMapColors : LightMapColors
  const props: IMapboxGlProps = {
    onMapInitialized: action('onMapInitialized'),
    onFeaturesSelected,
    camera,
    mapboxGl,
    style: createStyle(colorDictionary),
  }
  return <MapboxGlComponent {...props} />
})
