import { MapboxGlComponent, IMapboxGlProps } from './MapboxGl.component'
import { withKnobs, number, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ICameraPadding, ICameraProps } from '../ICameraProps'
import { Style } from 'mapbox-gl'
import * as React from 'react'

import boundingBox from '@turf/bbox'
const RushRiver = require('./_stubs/rush-river-watershed.geo.json')
const WhitewaterRiver = require('./_stubs/rush-river-watershed.geo.json')
const rushRiverBbox = boundingBox(RushRiver)
const whitewaterRiverBbox = boundingBox(WhitewaterRiver)

const stories = storiesOf('Core/Map/Mapbox Gl', module)
stories.addDecorator(withKnobs)

const locations = {
  whitewaterRiverBbox,
  rushRiverBbox,
}

const createPlacesToVisit = (): number[][] => {
  const label = 'Places to go'
  const options = {
    whitewaterRiverBbox: 'whitewater',
    rushRiverBbox: 'rush river',
    pasig: 'pasig',
    falkanIslands: 'falkanIslands',
  }

  const defaultValue = 'whitewater'
  const item = select(label, options, defaultValue)
  const bbox = locations[item]
  return bbox
}

export const createCameraPaddingOffset = (): ICameraPadding => {
  const top = number('Padding Offset top (px)', 0, { range: true, min: -500, max: 500, step: 0.01 })
  const bottom = number('Padding Offset bottom (px)', 0, {
    range: true,
    min: -500,
    max: 500,
    step: 0.01,
  })
  const left = number('Padding Offset left (px)', 0, {
    range: true,
    min: -500,
    max: 500,
    step: 0.01,
  })
  const right = number('Padding Offset right (px)', 0, {
    range: true,
    min: -500,
    max: 500,
    step: 0.01,
  })
  return {
    top,
    bottom,
    left,
    right,
  }
}

const createStyles = (): Style | string => {
  const label = 'Styles (via Mapbox.com)'
  const options = {
    'mapbox://styles/mapbox/satellite-streets-v9': 'Satellite',
    'mapbox://styles/mapbox/dark-v9': 'Dark',
    'mapbox://styles/mapbox/light-v9': 'Light',
    'mapbox://styles/mapbox/outdoors-v9': 'Outdoors',
  }
  const defaultValue = 'mapbox://styles/mapbox/light-v9'
  return select(label, options, defaultValue)
}

const createCameraObject = (): ICameraProps => {
  return {
    bbox: createPlacesToVisit(),
    pitch: number('Pitch (aka tilt)', 0, { range: true, min: 0, max: 90, step: 0.01 }),
    bearing: number('Bearing (aka rotation)', 0, { range: true, min: 0, max: 360.0, step: 0.01 }),
    padding: createCameraPaddingOffset(),
    speed: number('Speed', 0, { range: true, min: 0.01, max: 3, step: 0.01 }),
  }
}

stories.add('Show a map with a default mapbox style', () => {
  const camera = createCameraObject()
  const styleOption = createStyles()

  const mapboxProps: IMapboxGlProps = {
    onMapInitialized: action('map initialized'),
    camera,
    style: styleOption,
    onFeaturesSelected: action('features clicked'),
  }
  return <MapboxGlComponent {...mapboxProps} />
})

// stories.add('Show a map with a mapbox style', () => {
//   const camera = createCameraObject()
//   const styleOption = createStyles()

//   const mapboxProps: IMapboxGlProps = {
//     onMapInitialized: action('map initialized'),
//     camera,
//     style: styleOption,
//     onFeaturesSelected: action('features clicked'),
//   }
//   return <MapboxGlComponent {...mapboxProps} />
// })
