import { storiesOf } from '@storybook/react'
import { featureCollection, point } from '@turf/helpers'
import { transformGeo } from 'api/region/Region.transform.sync'
import * as React from 'react'
import { MapboxGlComponent } from 'ui/core/map/mapboxGl/MapboxGl.component'
import { createLayers, createSources, createStyle } from './Base.style'
import { createDefaultSettings, createLayerProperties } from './BaseStyle.stories'
import {
  createPalBackdropLayer,
  createPalLayerLayer,
  createRestrictionSectionLayer,
  createStreamLayer,
  createTroutSectionBackdropLayer,
  createTroutSectionLayerLayer,
  
  // createRestrictionBackdropLayer,
} from './Stream.layers'

import { createGpsBorderLayer } from './Gps.layers'

import {
  createAccessPointCircleLabelLayer,
  createAccessPointCircleLayerLayer,
  createAccessPointRoadLabelLayer,
} from './AccessPoints.layers'

import { boolean, number, color } from '@storybook/addon-knobs'
import { createPalBorderLayer, createPalLayer } from './Pal.layers'
import { formatStateData } from 'api/usState/FormatStateData'

const topojson = require('ui/routes/map/MapboxGlMap/styles/_stubs/driftless.topo.json')
const topojsonPal = require('ui/routes/map/MapboxGlMap/styles/_stubs/driftless.pal.topo.json')
const stateData = require('ui/routes/map/MapboxGlMap/styles/_stubs/mn.data.json')
const dictionary = transformGeo(topojson, topojsonPal, formatStateData(stateData), new Date())
const stories = storiesOf('Map Styles/Stream', module)

const makeLayerProps = () => {
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
  layerProperties.satelliteZoomLevel = 14.55
  layerProperties.satellitePrefetchZoomLevel = 14.0
  layerProperties.satelliteTransitionScalar = 1
  layerProperties.streamSettings = {
    ...layerProperties.streamSettings,
    streamWidth,
    publicSectionWidth,
    troutSectionWidth,
  }
  
  // layerProperties.satelliteZoomLevel = 16.6
  // layerProperties.satellitePrefetchZoomLevel = 16.51
  layerProperties.satelliteResolution = 256

  return layerProperties
}

const makeProps = (layerProperties: ILayerProperties) => {
  const newSources: any = [
    { id: 'streams', geojson: dictionary.streamProperties },
    { id: 'trout_stream_section', geojson: dictionary.trout_stream_section },
    { id: 'pal_routes', geojson: dictionary.pal_routes },
    { id: 'restriction_section', geojson: dictionary.restriction_section },
    { id: 'pal', geojson: dictionary.pal },
    { id: 'restricted_land', geojson: dictionary.restricted_land },
    { id: 'stream_access_point', geojson: dictionary.stream_access_point },
    { id: 'stream_centroid', geojson: dictionary.streamCentroid },
  ]

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

  newSources.push({ id: 'gps', geojson: gpsFeatureCollection })

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

  const gpsLayers = createGpsBorderLayer(layerProperties, 'gps')

  const labelsLayers = [createAccessPointCircleLabelLayer(layerProperties, 'stream_access_point'), createAccessPointRoadLabelLayer(layerProperties, 'stream_access_point')]

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
  const props = createDefaultSettings(layerProperties)
  const newProps = {
    ...props,
    style: myStyle,
  }

  return newProps
}

stories.add('Default', () => {
  const layerProps = makeLayerProps()
  const newProps = makeProps(layerProps)
  return <MapboxGlComponent {...newProps} />
})

stories.add('contour lines', () => {
  const layerProps = makeLayerProps()
  layerProps.pallete.contourColor = color('contour color', 'deeppink')
  const newProps = makeProps(layerProps)
  // newProps.style.layers
  return <MapboxGlComponent {...newProps} />
})
