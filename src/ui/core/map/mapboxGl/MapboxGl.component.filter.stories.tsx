import { action } from '@storybook/addon-actions'
import { color, number, select, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import boundingBox from '@turf/bbox'
import { Layer, Style } from 'mapbox-gl'
import * as mapboxGl from 'mapbox-gl'
import * as React from 'react'
import { ICameraPadding, ICameraProps } from '../ICameraProps'
import { IMapboxGlProps, MapboxGlComponent } from './MapboxGl.component'
import { MapboxGlComponentFilter } from './MapboxGl.component.filter';
const darkStyle = require('./_stubs/dark-style.json')
const lightStyle = require('./_stubs/light-style.json')
const satelliteStyle = require('./_stubs/satellite-style.json')
const RushRiver = require('./_stubs/rush-river-watershed.geo.json')
const WhitewaterRiver = require('./_stubs/whitewater-watershed.geo.json')
const rushRiverBbox = boundingBox(RushRiver)
const whitewaterRiverBbox = boundingBox(WhitewaterRiver)

const stories = storiesOf('Core/Map/Mapbox Gl Filter', module)
stories.addDecorator(withKnobs)

const locations = {
  whitewater: whitewaterRiverBbox,
  rushriver: rushRiverBbox,
}

const createPlacesToVisit = (): number[][] => {
  const label = 'Places to go'
  const options = {
    whitewater: 'whitewater',
    rushriver: 'rushriver',
  }

  const defaultValue = 'whitewater'
  const item = select(label, options, defaultValue)
  const bbox = locations[item]
  return [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
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

export const createCameraObject = (): ICameraProps => {
  return {
    bbox: createPlacesToVisit(),
    pitch: number('Pitch (aka tilt)', 0, { range: true, min: 0, max: 90, step: 0.01 }),
    bearing: number('Bearing (aka rotation)', 0, { range: true, min: 0, max: 360.0, step: 0.01 }),
    padding: createCameraPaddingOffset(),
    speed: number('Speed', 0, { range: true, min: 0.01, max: 3, step: 0.01 }),
  }
}

export const createCameraObjectSimple = (): ICameraProps => {
  return {
    bbox: createPlacesToVisit(),
    pitch: 0,
    bearing: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
    speed: 1,
  }
}

const createCustomMapboxLayer = (
  sourceId: string,
  layerId: string,
  lineColor = 'pink',
  lineWidth = 5
): Layer => {
  const lineStyle: Layer = {
    id: layerId,
    source: sourceId,
    type: 'line',
    layout: {
      visibility: 'visible',
      'line-join': 'round',
    },
    paint: {
      'line-color': lineColor,
      'line-width': lineWidth,
    },
  }

  return lineStyle
}

stories.add('Show a map with a default mapbox style', () => {
  const styleOption = createStyles()
  const mapboxProps: IMapboxGlProps = {
    onMapInitialized: action('map initialized'),
    mapboxGl,
    style: styleOption,
    onFeaturesSelected: action('features clicked'),
  }
  return <MapboxGlComponent {...mapboxProps} />
})

const getSelectedStyle = (styles: Style[]): Style => {
  const label = 'Styles (via Mapbox.com)'
  const options = styles.reduce((dictionary, item: Style) => {
    dictionary[item.name] = item.name
    return dictionary
  }, {})

  const defaultValue = styles[0].name
  const selectedName = select(label, options, defaultValue)
  return styles.find(x => x.name === selectedName)
}

stories.add('Filter layers', () => {
  const styles = [darkStyle, lightStyle, satelliteStyle].map(x => x as Style)
  const selectedRawStyle = getSelectedStyle(styles)
  const customLayers = [
    createCustomMapboxLayer(
      'whitewater-river-layer',
      'whitewater-river-source',
      color('whitewater Color', 'blue'),
      number('Whitewater Line Width', 3, { range: true, min: 1, max: 100, step: 0.1 })
    ),
    createCustomMapboxLayer(
      'rush-river-layer',
      'rush-river-source',
      color('Rush Color', 'orange'),
      number('Rush Line Width', 3, { range: true, min: 1, max: 100, step: 0.1 })
    ),
  ]

  const insertBeforeLayerId = 'waterway-river-canal'
  const waterwayIndex = selectedRawStyle.layers.findIndex(x => x.id === insertBeforeLayerId)
  const insertIntoIndex = waterwayIndex >= 0 ? waterwayIndex + 1 : selectedRawStyle.layers.length
  const safeLayers = [...selectedRawStyle.layers]
  safeLayers.splice(insertIntoIndex + 1, 0, customLayers[0])
  safeLayers.splice(insertIntoIndex + 1, 0, customLayers[1])

  const mapboxProps: IMapboxGlProps = {
    onMapInitialized: action('map initialized'),
    mapboxGl,
    // style: { ...selectedRawStyle },
    style: {
      ...selectedRawStyle,
      layers: safeLayers,
      sources: {
        ...selectedRawStyle.sources,
        'rush-river-layer': {
          type: 'geojson',
          data: RushRiver,
        },
        'whitewater-river-layer': {
          type: 'geojson',
          data: WhitewaterRiver,
        },
      },
    },
    onFeaturesSelected: action('features clicked'),
  }

  const layerFilters = {
    'rush-river-source': ["in", 'gid', 84911],
    'whitewater-river-source': ["in", 'gid', 84911],
  }

  const mapboxFilters = Object.entries(layerFilters).map(([key, value]) => {
    const asdf = `${selectedRawStyle.name}-${key}`
    console.log(asdf)
    
    return <MapboxGlComponentFilter key={asdf} filter={value} layerId={key} />
  })

  return <MapboxGlComponent {...mapboxProps}>
    {mapboxFilters}
  </MapboxGlComponent>
})
