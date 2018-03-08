import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { point, featureCollection } from '@turf/helpers'
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

import { createGpsBorderLayer } from './Gps.layers'

import {
  createAccessPointCircleLayerLayer,
  createAccessPointCircleLabelLayer,
} from './AccessPoints.layers'

import { createPalLayer, createPalBorderLayer } from './Pal.layers'
import { number, boolean } from '@storybook/addon-knobs'

const topojson = require('static/data/v3/wi/driftless-central.topo.json')
const stateData = require('static/data/v3/wi/wi.data.json')
const dictionary = transformGeo(topojson, updateStateObject(stateData))
console.log(dictionary)
const stories = storiesOf('Map Styles/Stream', module)

stories.add('Default', () => {
  const isGpsEnabled = boolean('gps', false)
  const gpsLat = number('gps lat 123', 43.892, {
    range: true,
    min: 43.458,
    max: 44.277,
    step: 0.001,
  })

  const gpsLng = number('gps lng 123', -91.828, {
    range: true,
    min: -92.8,
    max: -91.148,
    step: 0.001,
  })

  console.log(gpsLng, gpsLat)
  const gpsFeature = point([gpsLng, gpsLat])
  const gpsFeatureCollection = featureCollection([gpsFeature])

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
  layerProperties.satelliteZoomLevel = 16
  layerProperties.streamSettings = {
    ...layerProperties.streamSettings,
    streamWidth,
    publicSectionWidth,
    troutSectionWidth,
  }
  const props = createDefaultSettings(layerProperties)
  layerProperties.satelliteZoomLevel = 14
  layerProperties.satellitePrefetchZoomLevel = 14
  const newSources = [
    { id: 'streams', geojson: dictionary.streamProperties },
    { id: 'trout_stream_section', geojson: dictionary.trout_stream_section },
    { id: 'pal_routes', geojson: dictionary.pal_routes },
    { id: 'restriction_section', geojson: dictionary.restriction_section },
    { id: 'pal', geojson: dictionary.pal },
    { id: 'stream_access_point', geojson: dictionary.stream_access_point },
  ]

  if (isGpsEnabled) {
    newSources.push({ id: 'gps', geojson: gpsFeatureCollection })
  }

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

  const palLayers = [
    ...createPalLayer(layerProperties, 'pal'),
    ...createPalBorderLayer(layerProperties, 'pal'),
  ]

  const accessPointLayers = [
    ...createAccessPointCircleLayerLayer(layerProperties, 'stream_access_point'),
  ]

  const gpsLayers = isGpsEnabled ? createGpsBorderLayer(layerProperties, 'gps') : []

  const labelsLayers = [createAccessPointCircleLabelLayer(layerProperties, 'stream_access_point')]

  // palLayers.pop()
  // palLayers.pop()
  const myLayers = createLayers(
    layerProperties,
    streamLayers,
    palLayers,
    accessPointLayers,
    labelsLayers,
    gpsLayers
  )
  myStyle.sources = sources
  myStyle.layers = myLayers

  const newProps = {
    ...props,
    style: myStyle,
  }

  return <MapboxGlComponent {...newProps} />
})
