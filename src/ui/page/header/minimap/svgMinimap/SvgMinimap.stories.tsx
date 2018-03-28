import { boolean, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import boundingBox from '@turf/bbox'
import { featureCollection } from '@turf/helpers'
import keyBy from 'lodash-es/keyBy'
import * as React from 'react'
import { IMinimapSvgProps, SvgMinimapComponent } from './SvgMinimap.component'

import {
  Feature,
  FeatureCollection,
  // Point,
  MultiPolygon,
} from 'geojson'

import { IRegion } from 'coreTypes/tableOfContents/IRegion'
import { IUsState } from 'coreTypes/tableOfContents/IState'
import { SelectionStatus, LoadingStatus } from 'coreTypes/Ui'
import { action } from '@storybook/addon-actions'

const US_STATES = require('ui/page/header/minimap/_stubs/states.geo.json') as FeatureCollection<
  MultiPolygon,
  IUsState
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
  const selectedStateName = getSelectedStateName()
  const states = {
    ...US_STATES,
    features: US_STATES.features.map(x => {
      const selectionStatus =
        x.properties.short_name === selectedStateName
          ? SelectionStatus.Selected
          : selectedStateName === 'All' ? SelectionStatus.Active : SelectionStatus.Inactive
      return {
        ...x,
        properties: {
          ...x.properties,
          loadingStatus: LoadingStatus.Success,
          selectionStatus,
        },
      }
    }),
  }
  const bbox = boundingBox(getSelectedState(selectedStateName))
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
    handleClose: action('close'),
    handleSelection: (a: string, b: string) => {},
    usStatesGeoJson: states,
    regionsGeoJson: emptyRegion,
    camera: cameraProps,
    isOffline: boolean('offline', false),
    isExpanded: boolean('expanded', true),
  }

  console.log(cameraProps)
  return (
    <div style={style}>
      <SvgMinimapComponent {...props} />
    </div>
  )
})

export const createStatesAndRegions = (width = 500, height = 500) => {
  const selectedStateName = getSelectedStateName()
  const states = {
    ...US_STATES,
    features: US_STATES.features.map(x => {
      const selectionStatus =
        x.properties.short_name === selectedStateName
          ? SelectionStatus.Selected
          : selectedStateName === 'All' ? SelectionStatus.Active : SelectionStatus.Inactive
      return {
        ...x,
        properties: {
          ...x.properties,
          loadingStatus: LoadingStatus.Success,
          selectionStatus,
        },
      }
    }),
  }
  const bbox = boundingBox(getSelectedState(selectedStateName))
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

  const regions =
    selectedStateName === 'All'
      ? emptyRegion
      : (featureCollection(regionionsByName[selectedStateName]) as FeatureCollection<
          MultiPolygon,
          IRegion
        >)

  const props: IMinimapSvgProps = {
    handleClose: action('close'),
    handleSelection: (a: string, b: string) => {},
    usStatesGeoJson: states,
    camera: cameraProps,
    regionsGeoJson: regions,
    isOffline: boolean('offline', false),
    isExpanded: boolean('expanded', true),
  }
  return <SvgMinimapComponent {...props} />
}
stories.add('States and regions', () => {
  const style = {
    width: `${500}px`,
    height: `${500}px`,
  }

  return <div style={style}>{createStatesAndRegions(500, 500)}</div>
})

stories.add('Region Loading', () => {
  const width = 500
  const height = 500

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }
  // const stateName = getSelectedStateName()
  // const selectedState = getSelectedState(stateName)
  // const bbox = boundingBox(selectedState)
  const selectedStateName = getSelectedStateName()
  const states = {
    ...US_STATES,
    features: US_STATES.features.map(x => {
      const selectionStatus =
        x.properties.short_name === selectedStateName
          ? SelectionStatus.Selected
          : selectedStateName === 'All' ? SelectionStatus.Active : SelectionStatus.Inactive
      return {
        ...x,
        properties: {
          ...x.properties,
          loadingStatus: LoadingStatus.Success,
          selectionStatus,
        },
      }
    }),
  }
  const bbox = boundingBox(getSelectedState(selectedStateName))

  const regions =
    selectedStateName === 'All'
      ? emptyRegion
      : (featureCollection(regionionsByName[selectedStateName]) as FeatureCollection<
          MultiPolygon,
          IRegion
        >)
  if (selectedStateName !== 'All') {
    const regionOptions = regionionsByName[selectedStateName].reduce(
      (dictionary, item) => {
        dictionary[item.properties.path] = item.properties.path
        return dictionary
      },
      { None: 'None' }
    )
    const selectedRegionName = select('Selected Region', regionOptions, 'None')
    regions.features = regions.features.map((x, index) => {
      const isItemLoading = selectedRegionName === x.properties.path
      const isNoneSelected = selectedRegionName === 'None'
      return {
        ...x,
        properties: {
          ...x.properties,
          selectionStatus:
            isNoneSelected || isItemLoading ? SelectionStatus.Active : SelectionStatus.Inactive,
          loadingStatus: isItemLoading ? LoadingStatus.Pending : LoadingStatus.Success,
        },
      }
    })
  }

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
    handleClose: action('close'),
    handleSelection: (a: string, b: string) => {},
    usStatesGeoJson: states,
    camera: cameraProps,
    regionsGeoJson: regions,
    isOffline: boolean('offline', false),
    isExpanded: boolean('expanded', true),
  }
  return (
    <div style={style}>
      <SvgMinimapComponent {...props} />
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
    handleClose: action('close'),
    handleSelection: (a: string, b: string) => {},
    usStatesGeoJson: US_STATES,
    regionsGeoJson: regions,
    camera: cameraProps,
    isOffline: boolean('offline', false),
    isExpanded: boolean('expanded', true),
  }
  return (
    <div style={style}>
      <SvgMinimapComponent {...props} />
    </div>
  )
})
