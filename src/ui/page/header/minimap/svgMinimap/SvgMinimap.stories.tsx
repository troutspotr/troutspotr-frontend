import * as React from 'react'
import { MinimapSvgComponent, IMinimapSvgProps } from './SvgMinimap.component'
import { select } from '@storybook/addon-knobs'
import { keyBy } from 'lodash'
import { storiesOf } from '@storybook/react'
import boundingBox from '@turf/bbox'

import {
  // Feature,
  MultiPolygon,
  // Point,
  FeatureCollection,
} from 'geojson'

import { IState } from 'coreTypes/tableOfContents/IState'
const US_STATES = require('ui/page/header/minimap/_stubs/states.geo.json') as FeatureCollection<
  MultiPolygon,
  IState
>

const US_STATES_DICTIONARY = keyBy(US_STATES.features, x => x.properties.name)
const US_STATES_KEYS = US_STATES.features.reduce((dictionary, item) => {
  dictionary[item.properties.name] = item.properties.name
  return dictionary
}, {})
const usStateOptions = {
  ...US_STATES_KEYS,
  All: 'All',
}

const stories = storiesOf('Page/Header/Minimap/SvgMinimap', module)

const getSelectedState = () => {
  const selectedItem = select('Selected US State', usStateOptions, 'All')
  if (selectedItem === 'All') {
    return US_STATES
  }

  return US_STATES_DICTIONARY[selectedItem]
}

stories.add('Just states', () => {
  const width = 500
  const height = 500

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }

  const selectedState = getSelectedState()
  const bbox = boundingBox(selectedState)
  const cameraProps = {
    bbox: [[bbox[0], bbox[1]], [bbox[2], bbox[3]]],
    pitch: 0,
    bearing: 0,
    speed: 0,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  }

  const props: IMinimapSvgProps = {
    height,
    width,
    usStatesGeojson: US_STATES,
    camera: cameraProps,
  }
  return (
    <div style={style}>
      <MinimapSvgComponent {...props} />
    </div>
  )
})

stories.add('Crazy content', () => {
  const width = 500
  const height = 500

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }

  const props: IMinimapSvgProps = {
    height,
    width,
    usStatesGeojson: US_STATES,
  }
  return (
    <div style={style}>
      <MinimapSvgComponent {...props} />
    </div>
  )
})
