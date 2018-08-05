import { featureCollection } from '@turf/helpers'
import { Layer, Style as MapboxStyle } from 'mapbox-gl'
import { createSelector } from 'reselect'
import { Theme } from '../../../core/Core.redux'
import { selectedRegionSelector, themeSelector, selectedStateSelector } from '../../../core/Core.selectors'
import {
  gpsFeatureCollectionSelector,
  isGpsTrackingActiveStateSelector,
} from '../../../core/gps/Gps.selectors'
import { IStreamSettings } from '../../../core/micromap/Micromap.settings'
import { isOfflineSelector } from '../../../page/offline/Offline.selectors'
import { IReduxState } from '../../../redux/Store.redux.rootReducer'
import {
  palSectionsSelector,
  palsSelector,
  restrictionSectionsSelector,
  streamCentroidsSelector,
  streamsSelector,
  troutStreamSectionsSelector,
} from '../../@usState/@region/Region.selectors'
import { streamAccessPointSelector } from '../../@usState/@region/Region.selectors'
import * as accessPointLib from './styles/AccessPoints.layers'
import { drawLabelsRegion } from './styles/AdminBorders.layers';
import { createLayers } from './styles/Base.style'
import { createGpsBorderLayer } from './styles/Gps.layers'
import { defaultLayerProperties, ILayerProperties } from './styles/ICreateLayer'
import { DarkMapColors, LightMapColors } from './styles/MapColors'
import * as palLayersLib from './styles/Pal.layers'
import * as streamLayersLib from './styles/Stream.layers'
import { StyleSourceId } from './styles/Style.constants'
// import { streamCentroidsSelector } from '../../@usState/UsState.selectors';

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

export const buildSources = (
  streams = null,
  troutSection = null,
  palSection = null,
  restrictionSection = null,
  pals = null,
  streamAccessPoint = null,
  gpsFeature = null,
  streamCentroids = null,
  selectedRegion = null,
  selectedState = null,
): { [index: string]: any } => {
  const s = {}
  src(StyleSourceId.streams, streams, s)
  src(StyleSourceId.troutStreamSection, troutSection, s)
  src(StyleSourceId.palRoutes, palSection, s)
  src(StyleSourceId.restrictionSection, restrictionSection, s)
  src(StyleSourceId.pals, pals, s)
  src(StyleSourceId.streamAccessPoint, streamAccessPoint, s)
  src(StyleSourceId.gps, gpsFeature, s)
  src(StyleSourceId.centroids, streamCentroids, s)
  src('region', selectedRegion, s)
  src('state', selectedState, s)
  return s
}
export const sourceGeometryDictionarySelector = createSelector(
  streamsSelector,
  troutStreamSectionsSelector,
  palSectionsSelector,
  restrictionSectionsSelector,
  palsSelector,
  streamAccessPointSelector,
  gpsFeatureCollectionSelector,
  streamCentroidsSelector,
  selectedRegionSelector,
  selectedStateSelector,
  buildSources
)

export const mapboxGlSourcesSelector = createSelector(
  layerPropertiesSelector,
  sourceGeometryDictionarySelector,
  (layerProps: ILayerProperties, sourcesGeometry) => {
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
    let sources = {
      ...sourcesGeometry,
    }

    if (isOnline) {
      sources = {
        ...sources,
        ...onlineSources,
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
      accessPointLib.createAccessPointRoadLabelLayer(layerProperties, 'stream_access_point'),
      drawLabelsRegion(layerProperties, 'region')[0],
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
