import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { ILayerProperties, defaultLayerProperties } from './styles/ICreateLayer'
import { DarkMapColors, LightMapColors } from './styles/MapColors'
import { createSelector } from 'reselect'
import { themeSelector } from 'ui/core/Core.selectors'
import { Theme } from 'ui/core/Core.redux'
import { IStreamSettings } from 'ui/core/micromap/Micromap.settings'
import { isOfflineSelector } from 'ui/page/offline/Offline.selectors'
import { createStyle, createLayers } from './styles/Base.style'
import { Style as MapboxStyle, Layer } from 'mapbox-gl'
import { featureCollection } from '@turf/helpers'
import {
  streamsSelector,
  troutStreamSectionsSelector,
  palSectionsSelector,
  restrictionSectionsSelector,
  palsSelector,
} from 'ui/routes/@usState/@region/Region.selectors'
import { streamAccessPointSelector } from '../../@usState/@region/Region.selectors'
import { FeatureCollection } from 'geojson'
import { StyleSourceId } from './styles/Style.constants'
import * as streamLayersLib from './styles/Stream.layers'
import * as palLayersLib from './styles/Pal.layers'
import * as accessPointLib from './styles/AccessPoints.layers'
import {
  isGpsTrackingActiveStateSelector,
  gpsFeatureCollectionSelector,
} from '../../../core/gps/Gps.selectors'
import { createGpsBorderLayer } from './styles/Gps.layers'

const DEFAULT_LAYER_PROPS = defaultLayerProperties()

const DEFAULT_STREAM_SETTINGS = {
  radius: 0,
  streamWidth: 1,
  troutSectionWidth: 2,
  publicSectionWidth: 3,
  specialRegulationsWidth: 4,
  terminusDiameter: 0,
  backdropWidth: 3,
}
export const streamSettingsSelector = (reduxState: IReduxState): IStreamSettings =>
  DEFAULT_STREAM_SETTINGS

export const layerPropertiesSelector = createSelector(
  themeSelector,
  streamSettingsSelector,
  isOfflineSelector,
  (theme: Theme, streamSettings: IStreamSettings, isOffline: boolean): ILayerProperties => {
    const pallete = theme === Theme.dark ? DarkMapColors : LightMapColors
    const layerProps = {
      ...DEFAULT_LAYER_PROPS,
      pallete,
      isOnline: isOffline === false,
      isHighContrastEnabled: theme === Theme.light,
      streamSettings,
    }

    return layerProps
  }
)

export const EMPTY_FEATURE_COLLECTION = featureCollection([])

const GEOJSON_TYPE = 'geojson'
const src = (id, feature, dictionary) => {
  dictionary[id] = {
    data: feature || EMPTY_FEATURE_COLLECTION,
    type: GEOJSON_TYPE,
  }
}
export const sourceGeometryDictionarySelector = createSelector(
  streamsSelector,
  troutStreamSectionsSelector,
  palSectionsSelector,
  restrictionSectionsSelector,
  palsSelector,
  streamAccessPointSelector,
  gpsFeatureCollectionSelector,
  (
    streams,
    troutSection,
    palSection,
    restrictionSection,
    pals,
    streamAccessPoint,
    gpsFeature
  ): { [index: string]: any } => {
    const s = {}
    src(StyleSourceId.streams, streams, s)
    src(StyleSourceId.troutStreamSection, troutSection, s)
    src(StyleSourceId.palRoutes, palSection, s)
    src(StyleSourceId.restrictionSection, restrictionSection, s)
    src(StyleSourceId.pals, pals, s)
    src(StyleSourceId.streamAccessPoint, streamAccessPoint, s)
    src(StyleSourceId.gps, gpsFeature, s)
    return s
  }
)

export const mapboxGlSourcesSelector = createSelector(
  layerPropertiesSelector,
  sourceGeometryDictionarySelector,
  (layerProps: ILayerProperties, sourcesGeometry) => {
    let sources = {}
    const { isOnline } = layerProps
    const onlineSources = {
      composite: {
        url: 'mapbox://mapbox.mapbox-streets-v7',
        type: 'vector',
      },
      'mapbox://mapbox.satellite': {
        url: 'mapbox://mapbox.satellite',
        type: 'raster',
        tileSize: layerProps.satelliteResolution,
      },
    }

    if (isOnline) {
      sources = {
        ...onlineSources,
        ...sourcesGeometry,
      }
    }

    return sources
  }
)

export const mapboxGlLayersSelector = createSelector(
  layerPropertiesSelector,
  isGpsTrackingActiveStateSelector,
  (layerProperties: ILayerProperties, isGpsEnabled: boolean): Layer[] => {
    const streamLayers = [
      ...streamLayersLib.createRestrictionSectionLayer(layerProperties, 'restriction_section'),
      ...streamLayersLib.createTroutSectionBackdropLayer(layerProperties, 'trout_stream_section'),
      ...streamLayersLib.createPalBackdropLayer(layerProperties, 'pal_routes'),
      // ...layers.createRestrictionBackdropLayer(layerProperties, 'restriction_section'),

      ...streamLayersLib.createStreamLayer(layerProperties, 'streams'),
      ...streamLayersLib.createTroutSectionLayerLayer(layerProperties, 'trout_stream_section'),
      ...streamLayersLib.createPalLayerLayer(layerProperties, 'pal_routes'),
    ]

    const palLayers = [
      ...palLayersLib.createPalLayer(layerProperties, 'pal'),
      ...palLayersLib.createPalBorderLayer(layerProperties, 'pal'),
    ]

    const accessPointLayers = [
      ...accessPointLib.createAccessPointCircleLayerLayer(layerProperties, 'stream_access_point'),
    ]

    const gpsLayers = isGpsEnabled ? createGpsBorderLayer(layerProperties, 'gps') : []

    const labelsLayers = [
      accessPointLib.createAccessPointCircleLabelLayer(layerProperties, 'stream_access_point'),
    ]

    const myLayers = createLayers(
      layerProperties,
      streamLayers,
      palLayers,
      accessPointLayers,
      labelsLayers,
      gpsLayers
    )

    return myLayers
  }
)

export const DEFAULT_STYLE = {
  version: 8,
  name: 'TroutSpotr',
  center: [-91.86636953883972, 43.68162187731622],
  zoom: 16.67091316232325,
  bearing: -0.33453331132216135,
  pitch: 0,
  // sources: createSources(layerProps),
  transition: {
    duration: 800,
    delay: 0,
  },
  sprite: 'mapbox://sprites/andest01/civsy0pgb00022kkxcbqtcogh',
  glyphs: '/map-fonts/{fontstack}/{range}.pbf',
  // layers: createLayers(layerProps),
}
export const mapboxGlStyleSelector = createSelector(
  layerPropertiesSelector,
  mapboxGlSourcesSelector,
  mapboxGlLayersSelector,
  (layerProps: ILayerProperties, sources: any, layers): MapboxStyle => {
    const style = {
      ...DEFAULT_STYLE,
      sources,
      layers,
    }
    return style
  }
)
