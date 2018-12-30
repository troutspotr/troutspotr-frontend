import { IStateData } from 'api/usState/IStateData'
import { Dictionary } from 'lodash'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { point, featureCollection } from '@turf/helpers'

const groupBy = require('lodash-es/groupBy').default
const keyBy = require('lodash-es/keyBy').default
const valuesIn = require('lodash-es/valuesIn').default
const has = require('lodash-es/has').default
const topojson = require('topojson-client')
const { throttleReduce } = require('./Throttle')
const { getSanitizedRegulations } = require('./Region.regulations')

import {
  filterBadAccessPoints,
  addLettersToCrossings,
  provideRoadCrossingText,
  updateRoadCrossingProperties,
} from './Region.accessPoints'
import {
  TroutStreamSectionFeatureCollection,
  RestrictionFeatureCollection,
  StreamFeatureCollection,
  StreamFeature,
  PalSectionFeatureCollection,
  PalFeatureCollection,
  BoundingCircleFeatureCollection,
  AccessPointFeatureCollection,
  TributaryFeatureCollection,
  TroutStreamSectionFeature,
  RestrictionFeature,
  PalSectionFeature,
  AccessPointFeature,
  TributaryFeature,
  BoundingCircleFeature,
  StreamCentroidFeatureCollection,
  RestrictedLandFeatureCollection,
} from './IRegionGeoJSON'

export interface IGeometryPackageDictionary {
  trout_stream_section: TroutStreamSectionFeatureCollection
  restriction_section: RestrictionFeatureCollection
  streamProperties: StreamFeatureCollection
  pal_routes: PalSectionFeatureCollection
  pal: PalFeatureCollection
  restricted_land: RestrictedLandFeatureCollection,
  boundingCircle: BoundingCircleFeatureCollection
  stream_access_point?: AccessPointFeatureCollection
  tributary?: TributaryFeatureCollection
  streamCentroid: StreamCentroidFeatureCollection,
}
export const decompressTopojsonAsync = async (
  topojsonLib,
  topojsonObject
): Promise<IGeometryPackageDictionary> => {
  const ops = [
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.troutSection),
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.restrictionSection),
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.stream),
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.palSection),
    // topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.pal),
    topojsonLib.feature.bind(null, topojsonObject, topojsonObject.objects.boundingCircle),
  ]
  const [
    trout_stream_section,
    restriction_section,
    streamProperties,
    pal_routes,
    // pal,
    boundingCircle,
  ] = await throttleReduce(ops)

  // create centroids:
  const streamCentroids = featureCollection((streamProperties as StreamFeatureCollection).features.map(feature => {
    const pointFeature = point([
      feature.properties.centroid_longitude, feature.properties.centroid_latitude],
      feature.properties,
    )
    return pointFeature
  }))
  const dictionary: IGeometryPackageDictionary = {
    trout_stream_section,
    restriction_section,
    streamProperties,
    pal_routes,
    boundingCircle,
    streamCentroid: streamCentroids,
    // pal and restricted_land are provided elsewhere.
    // null them out here for now.
    pal: null,
    restricted_land: null,
  }
  return dictionary
}

export const updateStreamDictionary = (asdf: {
  // tslint:disable-next-line:no-any
  topojsonObject: any
  dictionary: IGeometryPackageDictionary
  stateData: IStateData
}, now: Date): IGeometryPackageDictionary => {
  const { topojsonObject, dictionary, stateData } = asdf
  // Time to update our objects to be more useful upstream!
  const regsDictionary = stateData.regulationsDictionary
  const watersDictionary = stateData.waterOpeners

  dictionary.restriction_section.features.forEach(feature => {
    const props = feature.properties
    if (props.start_time != null) {
      props.start_time = new Date(props.start_time)
    }

    if (props.end_time != null) {
      props.end_time = new Date(props.end_time)
    }

    // Add the restriction
    props.restriction = regsDictionary[props.restriction_id]
  })

  // Remove irrelevent restrictions by immediate time.
  dictionary.restriction_section.features = dictionary.restriction_section.features.filter(sp => {
    const { start_time, end_time } = sp.properties
    if (start_time == null || end_time == null) {
      return true
    }
    
    const isInBounds = start_time < now && end_time > now
    return isInBounds
  })

  // Update waters
  dictionary.streamProperties.features.forEach(feature => {
    const props = feature.properties
    if (has(watersDictionary, props.water_id) === false) {
      throw new Error(`couldnt find water id ${props.water_id}`)
    }
    props.openers = watersDictionary[props.water_id].openers
    // Let openers = watersDictionary[props.water_id]
  })

  // TODO: HACK. for some reason mapshaper and topojson aren't working for me.
  // MANUALLY turn this into a geojson point feature collection.
  updateRoadCrossingProperties(
    topojsonObject.objects.accessPoint.geometries,
    stateData.roadTypesDictionary
  )
  topojsonObject.objects.accessPoint.geometries = topojsonObject.objects.accessPoint.geometries.filter(
    filterBadAccessPoints
  )
  dictionary.stream_access_point = topojson.feature(
    topojsonObject,
    topojsonObject.objects.accessPoint
  )
  dictionary.tributary = topojson.feature(topojsonObject, topojsonObject.objects.tributary)

  return dictionary
  // tslint:disable-next-line:max-file-line-count
}

export const decompressAsync = async (
  // tslint:disable-next-line:no-any
  topojsonObject: any,
  stateData: IStateData,
  now: Date
): Promise<IGeometryPackageDictionary> => {
  const dictionary = await decompressTopojsonAsync(topojson, topojsonObject)
  return updateStreamDictionary({
    dictionary,
    topojsonObject,
    stateData,
  }, now)
}

export interface IGeometryFeatureDictionary {
  sectionsMap: Dictionary<TroutStreamSectionFeature[]>
  restrictionsMap: Dictionary<RestrictionFeature[]>
  palMap: Dictionary<PalSectionFeature[]>
  accessMap: Dictionary<AccessPointFeature[]>
  tributaries: Dictionary<TributaryFeature[]>
  tempCircleDictionary: Dictionary<BoundingCircleFeature[]>
}
export const createStreamDictionariesByStreamGid = (
  geoJsonObjects: IGeometryPackageDictionary
): IGeometryFeatureDictionary => {
  const sectionsMap = groupBy(geoJsonObjects.trout_stream_section.features, 'properties.stream_gid')
  const restrictionsMap = groupBy(
    geoJsonObjects.restriction_section.features,
    'properties.stream_gid'
  )
  const palMap = groupBy(geoJsonObjects.pal_routes.features, 'properties.stream_gid')
  const accessMap = groupBy(geoJsonObjects.stream_access_point.features, 'properties.stream_gid')
  const tributaries = groupBy(
    geoJsonObjects.tributary.features.filter(
      x => x.properties.linear_offset > 0.0001 && x.properties.linear_offset < 0.999
    ),
    'properties.stream_gid'
  )
  const tempCircleDictionary = keyBy(geoJsonObjects.boundingCircle.features, 'properties.gid')

  return {
    sectionsMap,
    restrictionsMap,
    palMap,
    accessMap,
    tributaries,
    tempCircleDictionary,
  }
}

export const createStreamDictionary = (
  geoJsonObjects,
  dictionaries: IGeometryFeatureDictionary
): Dictionary<IStreamObject> => {
  const sectionsMap = dictionaries.sectionsMap
  const restrictionsMap = dictionaries.restrictionsMap
  const palMap = dictionaries.palMap
  const accessMap = dictionaries.accessMap
  const tempCircleDictionary = dictionaries.tempCircleDictionary

  const streamDictionary = geoJsonObjects.streamProperties.features.reduce(
    (
      dictionary: Dictionary<IStreamObject>,
      currentItem: StreamFeature,
      index: number
    ): Dictionary<IStreamObject> => {
      const streamId = currentItem.properties.gid
      // tslint:disable-next-line:no-any
      const entry = {} as any
      entry.stream = currentItem
      if (sectionsMap[streamId] == null) {
        console.warn('Could not find section.') // eslint-disable-line
        console.warn(currentItem.properties) // eslint-disable-line
      }
      entry.sections = sectionsMap[streamId] || []

      entry.restrictions = getSanitizedRegulations(restrictionsMap[streamId])
      entry.palSections =
        palMap[streamId] == null
          ? []
          : palMap[streamId].sort((a, b) => b.properties.start - a.properties.start)

      entry.accessPoints =
        accessMap[streamId] == null
          ? []
          : accessMap[streamId].sort(
              (a, b) => b.properties.linear_offset - a.properties.linear_offset
            )

      entry.accessPoints = addLettersToCrossings(entry.accessPoints)
      entry.circle = tempCircleDictionary[streamId]
      const bridgeProperties = provideRoadCrossingText(entry.accessPoints)
      entry.stream.properties.publicTroutBridgeCount = bridgeProperties.publicTroutBridgeCount
      entry.stream.properties.permissionRequiredBridgeCount =
        bridgeProperties.permissionRequiredBridgeCount
      entry.stream.properties.unsafeBridgeCount = bridgeProperties.unsafeBridgeCount
      entry.stream.properties.uninterestingBridgeCount = bridgeProperties.uninterestingBridgeCount
      entry.stream.properties.bridgeText = bridgeProperties.bridgeText

      dictionary[streamId] = { ...entry }
      return dictionary
    },
    {}
  )

  valuesIn(streamDictionary).forEach(stream => {
    const streamId = stream.stream.properties.gid
    const tribs = dictionaries.tributaries[streamId]
    stream.tributaries =
      tribs == null
        ? []
        : dictionaries.tributaries[streamId]
            .filter(t => has(streamDictionary, t.properties.tributary_gid))
            .map(t => {
              const tributaryId = t.properties.tributary_gid
              return Object.assign(t, {
                properties: Object.assign(t.properties, {
                  streamData: streamDictionary[tributaryId],
                }),
              })
            })
  })
  return streamDictionary
}

export interface IGeoPackageOrWhatver extends IGeometryPackageDictionary {
  streamDictionary: Dictionary<IStreamObject>
}
export const transformGeo = async (
  // tslint:disable-next-line:no-any
  topojsonObject: any,
  stateData: IStateData,
  now: Date
): Promise<IGeoPackageOrWhatver> => {
  const geometryDictionary = await decompressAsync(topojsonObject, stateData, now)
  const dictionaries = createStreamDictionariesByStreamGid(geometryDictionary)
  const streamDictionary = createStreamDictionary(geometryDictionary, dictionaries)

  return {
    streamDictionary,
    ...geometryDictionary,
  }
}
