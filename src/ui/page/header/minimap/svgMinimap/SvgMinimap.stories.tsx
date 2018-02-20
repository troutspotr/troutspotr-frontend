import * as React from 'react'
import { MinimapSvgComponent, IMinimapSvgProps } from './SvgMinimap.component'
import { select } from '@storybook/addon-knobs'
import keyBy from 'lodash-es/keyBy'
import head from 'lodash-es/head'
import { storiesOf } from '@storybook/react'
import boundingBox from '@turf/bbox'
import { featureCollection } from '@turf/helpers'

import {
  Feature,
  MultiPolygon,
  // Point,
  FeatureCollection,
} from 'geojson'

import { IState } from 'coreTypes/tableOfContents/IState'
import { IRegion } from 'coreTypes/tableOfContents/IRegion'
const US_STATES = require('ui/page/header/minimap/_stubs/states.geo.json') as FeatureCollection<
  MultiPolygon,
  IState
>

const REGIONS = require('ui/page/header/minimap/_stubs/regions.geo.json') as FeatureCollection<
  MultiPolygon,
  IRegion
>
const emptyRegion = {
  features: [],
  type: 'FeatureCollection',
} as FeatureCollection<MultiPolygon, IRegion>
const RegionHash: { [key: string]: [Feature<MultiPolygon, IRegion>] } = {}

const regionionsByName = REGIONS.features.reduce((dictionary, item) => {
  if (dictionary[item.properties.state_short_name] == null) {
    dictionary[item.properties.state_short_name] = [item]
    return dictionary
  }

  dictionary[item.properties.state_short_name].push(item)
  return dictionary
}, RegionHash)

const US_STATES_DICTIONARY = keyBy(US_STATES.features, x => x.properties.short_name)
const US_STATES_KEYS = US_STATES.features.reduce((dictionary, item) => {
  dictionary[item.properties.short_name] = item.properties.short_name
  return dictionary
}, {})
const usStateOptions = {
  ...US_STATES_KEYS,
  All: 'All',
}

const stories = storiesOf('Page/Header/Minimap/SvgMinimap', module)
const getSelectedStateName = (): string => {
  return select('Selected US State', usStateOptions, 'All') || 'All'
}
const getSelectedState = (stateName: string) => {
  if (stateName === 'All') {
    return US_STATES
  }
  return US_STATES_DICTIONARY[stateName]
}

stories.add('Just states', () => {
  const width = 500
  const height = 500

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }

  const selectedState = getSelectedState(getSelectedStateName())
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
    usStatesGeoJson: US_STATES,
    availableRegionsGeoJson: emptyRegion,
    loadingRegionsGeoJson: emptyRegion,
    selectedRegionsGeoJson: emptyRegion,
    camera: cameraProps,
  }
  return (
    <div style={style}>
      <MinimapSvgComponent {...props} />
    </div>
  )
})

stories.add('States and regions', () => {
  const width = 500
  const height = 500

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }
  const stateName = getSelectedStateName()
  const selectedState = getSelectedState(stateName)
  const bbox = boundingBox(selectedState)
  const regions =
    stateName === 'All'
      ? emptyRegion
      : (featureCollection(regionionsByName[stateName]) as FeatureCollection<MultiPolygon, IRegion>)
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
    usStatesGeoJson: US_STATES,
    availableRegionsGeoJson: regions,
    camera: cameraProps,
    loadingRegionsGeoJson: emptyRegion,
    selectedRegionsGeoJson: emptyRegion,
  }
  return (
    <div style={style}>
      <MinimapSvgComponent {...props} />
    </div>
  )
})

stories.add('Region Loading', () => {
  const width = 500
  const height = 500

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }
  const stateName = getSelectedStateName()
  const selectedState = getSelectedState(stateName)
  const bbox = boundingBox(selectedState)
  const regions =
    stateName === 'All'
      ? emptyRegion
      : (featureCollection(regionionsByName[stateName]) as FeatureCollection<MultiPolygon, IRegion>)

  const firstRegion = head(regions.features)
  const loadingRegionsFeatureCollection =
    firstRegion == null
      ? emptyRegion
      : (featureCollection([firstRegion]) as FeatureCollection<MultiPolygon, IRegion>)
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
    usStatesGeoJson: US_STATES,
    availableRegionsGeoJson: regions,
    camera: cameraProps,
    loadingRegionsGeoJson: loadingRegionsFeatureCollection,
    selectedRegionsGeoJson: emptyRegion,
  }
  return (
    <div style={style}>
      <MinimapSvgComponent {...props} />
    </div>
  )
})

stories.add('Region Selected', () => {
  const width = 500
  const height = 500

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }
  const stateName = getSelectedStateName()
  const selectedState = getSelectedState(stateName)
  const bbox = boundingBox(selectedState)
  const regions =
    stateName === 'All'
      ? emptyRegion
      : (featureCollection(regionionsByName[stateName]) as FeatureCollection<MultiPolygon, IRegion>)

  const firstRegion = head(regions.features)
  const selectedRegionsFeatureCollection =
    firstRegion == null
      ? emptyRegion
      : (featureCollection([firstRegion]) as FeatureCollection<MultiPolygon, IRegion>)
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
    usStatesGeoJson: US_STATES,
    availableRegionsGeoJson: regions,
    camera: cameraProps,
    loadingRegionsGeoJson: selectedRegionsFeatureCollection,
    selectedRegionsGeoJson: emptyRegion,
  }
  return (
    <div style={style}>
      <MinimapSvgComponent {...props} />
    </div>
  )
})
