// import _ from 'lodash'
import { groupBy, keyBy, valuesIn, has } from 'lodash'
import * as topojson from 'topojson-client'

export const transformGeo = (topojsonObject, stateData) => {
  let geoJsonObjects = decompress(topojsonObject, stateData)
  let dictionaries = createStreamDictionaries(geoJsonObjects)
  let streamDictionary = createStreamDictionary(geoJsonObjects, dictionaries)
    // update with tributaries.
  valuesIn(streamDictionary).forEach(stream => {
    // let streamId = stream.stream.properties.gid
    // let tribs = dictionaries.tributaries[streamId]
    // stream.tributaries = tribs == null
    //   ? []
    //   : dictionaries.tributaries[streamId].map(t => {
    //     let tributaryId = t.properties.tributary_gid
    //     return {
    //       ...t,
    //       ...{
    //         properties: {
    //           ...t.properties,
    //           streamData: streamDictionary[tributaryId]
    //         }
    //       }
    //     }
    //   })
  })

  return {
    streamDictionary,
    ...geoJsonObjects
  }
}

export const createStreamDictionaries = (geoJsonObjects) => {
  let sectionsMap = groupBy(geoJsonObjects.trout_stream_section.features, 'properties.stream_gid')
  let restrictionsMap = groupBy(geoJsonObjects.restriction_section.features, 'properties.stream_gid')
  let palMap = groupBy(geoJsonObjects.pal_routes.features, 'properties.stream_gid')
  let accessMap = groupBy(geoJsonObjects.stream_access_point.features, 'properties.stream_gid')
  // let tributaries = groupBy(geoJsonObjects.stream_tributary.features
  //     .filter(x => x.properties.linear_offset > 0.0001 && x.properties.linear_offset < 0.999),
  //      'properties.stream_gid')

  // let tempCircleDictionary = keyBy(geoJsonObjects.bounding_circles.features, 'properties.gid')

  return {
    sectionsMap,
    restrictionsMap,
    palMap,
    accessMap
    // tributaries,
    // tempCircleDictionary
  }
}

export const createStreamDictionary = (geoJsonObjects, dictionaries) => {
  const MINIMUM_LENGTH_MILES = 0.05
  let {
    sectionsMap,
    restrictionsMap,
    palMap,
    accessMap
    // tempCircleDictionary
  } = dictionaries

  let streamDictionary = geoJsonObjects.streamProperties.features
    .reduce((dictionary, currentItem, index) => {
      let streamId = currentItem.properties.gid
      dictionary[streamId] = {}
      let entry = dictionary[streamId]
      entry.stream = currentItem

      entry.sections = sectionsMap[streamId]
        // .sort((a, b) => b.properties.start - a.properties.start)

      entry.restrictions = restrictionsMap[streamId] == null
        ? []
        : restrictionsMap[streamId]

      entry.palSections = palMap[streamId] == null
        ? []
        : palMap[streamId].sort((a, b) => b.properties.start - a.properties.start)

      entry.accessPoints = accessMap[streamId] == null
        ? []
        : accessMap[streamId]
          .sort((a, b) => b.properties.linear_offset - a.properties.linear_offset)
          .reduce((previousResult, currentItem, currentIndex) => {
            if (currentIndex === 0) {
              return previousResult.concat(currentItem)
            }

            // get the last item
            let previousItem = previousResult[previousResult.length - 1]
            let previousRoadName = previousItem.properties.street_name
            // TODO: HACK: This is wrong, but it will work.
            // data needs to disolve on TIS_C
            let currentRoadName = currentItem.properties.street_name
            let isSameRoad = currentRoadName === previousRoadName
            if (isSameRoad) {
              // check to see if distance is too close.
              let length = entry.stream.properties.length_mi
              let previousOffset = previousItem.properties.linear_offset * length
              let currentOffset = currentItem.properties.linear_offset * length
              let distance = Math.abs(currentOffset - previousOffset)

              let isTooClose = distance < MINIMUM_LENGTH_MILES
              if (isTooClose) {
                // SKIP THIS ITEM - IT'S CLEARLY A DUPLICATE
                return previousResult
              }
            }
            return previousResult.concat(currentItem)
          }, [])
      // entry.circle = tempCircleDictionary[streamId]
      return dictionary
    }, {})

  return streamDictionary
}

export const decompress = (topojsonObject, stateData) => {
  // let bounds = topojson.feature(topojsonObject, topojsonObject.objects.bounding_square_circles)
  let dictionary = {
    trout_stream_section: topojson.feature(topojsonObject, topojsonObject.objects.troutSection),
    restriction_section: topojson.feature(topojsonObject, topojsonObject.objects.restrictionSection),
    streamProperties: topojson.feature(topojsonObject, topojsonObject.objects.stream),
    pal_routes: topojson.feature(topojsonObject, topojsonObject.objects.palSection),
    pal: topojson.feature(topojsonObject, topojsonObject.objects.pal)
    // stream_tributary: topojson.feature(topojsonObject, topojsonObject.objects.stream_tributary),
    // bounding_circles: bounds
  }

  // time to update our objects to be more useful upstream!
  let regsDictionary = keyBy(stateData.regulations, 'id')
  let watersDictionary = stateData.waterOpeners

  dictionary.restriction_section.features.forEach(feature => {
    let props = feature.properties
    if (props.start_time != null) {
      props.start_time = new Date(props.start_time)
    }

    if (props.end_time != null) {
      props.end_time = new Date(props.end_time)
    }

    // add the restriction
    props.restriction = regsDictionary[props.restriction_id]
  })

  // update waters
  try
  {
    dictionary.streamProperties.features.forEach(feature => {
      let props = feature.properties
      props.openers = watersDictionary[props.water_id].openers
      // let openers = watersDictionary[props.water_id]
    })
  } catch (e) {
    console.log(e)
  }

  // TODO: HACK. for some reason mapshaper and topojson aren't working for me.
  // MANUALLY turn this into a geojson point feature collection.
  dictionary.stream_access_point = {
    features: topojsonObject.objects.accessPoint.geometries.map(x => {
      return {
        geometry: {
          type: 'Point',
          coordinates: x.coordinates
        },
        id: x.id,
        properties: x.properties,
        type: 'Feature'
      }
    }),
    type: 'FeatureCollection'
  }

  //  topojson.feature(topojsonObject, topojsonObject.objects.accessPoint)
  return dictionary
}

