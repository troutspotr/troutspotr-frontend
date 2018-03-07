import { storiesOf } from '@storybook/react'
import * as React from 'react'
// import { select, boolean } from '@storybook/addon-knobs'
// import { action } from '@storybook/addon-actions'
import { MapboxGlComponent } from 'ui/core/map/mapboxGl/MapboxGl.component'
import { createDefaultSettings, createLayerProperties } from './BaseStyle.stories'
import { transformGeo } from 'api2/GeoApi.transform.sync'
import { updateStateObject } from 'api2/StateApi'
import { createStyle, createSources, createLayers } from './Base.style'
import {
  createStreamLayer,
  createTroutSectionLayerLayer,
  createPalLayerLayer,
  createPalBackdropLayer,
  createTroutSectionBackdropLayer,
  createRestrictionSectionLayer,
  // createRestrictionBackdropLayer,
} from './Stream.layers'
import { number } from '@storybook/addon-knobs'

const topojson = require('./_stubs/driftless.topo.json')
const stateData = require('./_stubs/mn.data.json')
const dictionary = transformGeo(topojson, updateStateObject(stateData))
console.log(dictionary)
const stories = storiesOf('Map Styles/Stream', module)

stories.add('Default', () => {
  const streamWidth = number('stream Width', 1, {
    range: true,
    min: 0,
    max: 6,
    step: 0.01,
  })

  const troutSectionWidth = number('troutSection Width', 1, {
    range: true,
    min: 0,
    max: 6,
    step: 0.01,
  })

  const publicSectionWidth = number('pal Width', 1, {
    range: true,
    min: 0,
    max: 6,
    step: 0.01,
  })

  const layerProperties = createLayerProperties()
  layerProperties.streamSettings = {
    ...layerProperties.streamSettings,
    streamWidth,
    publicSectionWidth,
    troutSectionWidth,
  }
  const props = createDefaultSettings(layerProperties)
  const newSources = [
    { id: 'streams', geojson: dictionary.streamProperties },
    { id: 'trout_stream_section', geojson: dictionary.trout_stream_section },
    { id: 'pal_routes', geojson: dictionary.pal_routes },
    { id: 'restriction_section', geojson: dictionary.restriction_section },
  ]

  const sources = createSources(layerProperties, newSources)
  const myStyle = createStyle(layerProperties)
  const streamLayers = [
    ...createRestrictionSectionLayer(layerProperties, 'restriction_section'),
    ...createTroutSectionBackdropLayer(layerProperties, 'trout_stream_section'),
    ...createPalBackdropLayer(layerProperties, 'pal_routes'),
    // ...createRestrictionBackdropLayer(layerProperties, 'restriction_section'),
    ...createStreamLayer(layerProperties, 'streams'),
    ...createTroutSectionLayerLayer(layerProperties, 'trout_stream_section'),
    ...createPalLayerLayer(layerProperties, 'pal_routes'),
  ]
  const myLayers = createLayers(layerProperties, streamLayers)
  myStyle.sources = sources
  myStyle.layers = myLayers

  const newProps = {
    ...props,
    style: myStyle,
  }

  return <MapboxGlComponent {...newProps} />
})
