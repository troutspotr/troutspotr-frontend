import _ from 'lodash'
import * as topojson from 'topojson-client'

export const transformGeo = (topojsonObject) => {
  let geoJsonObjects = decompress(topojsonObject, topojson)
  let dictionaries = createStreamDictionaries(geoJsonObjects, _)
  let streamDictionary = createStreamDictionary(geoJsonObjects, dictionaries, _)
    // update with tributaries.
  _.valuesIn(streamDictionary).forEach(stream => {
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

  console.log('finished now!!!')
  return streamDictionary
}

export const createStreamDictionaries = (geoJsonObjects) => {
  let sectionsMap = _.groupBy(geoJsonObjects.trout_stream_section.features, 'properties.stream_gid')
  let restrictionsMap = _.groupBy(geoJsonObjects.restriction_section.features, 'properties.stream_gid')
  let palMap = _.groupBy(geoJsonObjects.pal_routes.features, 'properties.stream_gid')
  let accessMap = _.groupBy(geoJsonObjects.stream_access_point.features, 'properties.stream_gid')
  // let tributaries = _.groupBy(geoJsonObjects.stream_tributary.features
  //     .filter(x => x.properties.linear_offset > 0.0001 && x.properties.linear_offset < 0.999),
  //      'properties.stream_gid')

  // let tempCircleDictionary = _.keyBy(geoJsonObjects.bounding_circles.features, 'properties.gid')

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

export const decompress = (topojsonObject) => {
  // let bounds = topojson.feature(topojsonObject, topojsonObject.objects.bounding_square_circles)
  return {
    trout_stream_section: topojson.feature(topojsonObject, topojsonObject.objects.troutSection),
    restriction_section: topojson.feature(topojsonObject, topojsonObject.objects.restrictionSection),
    streamProperties: topojson.feature(topojsonObject, topojsonObject.objects.stream),
    pal_routes: topojson.feature(topojsonObject, topojsonObject.objects.palSection),
    stream_access_point: topojson.feature(topojsonObject, topojsonObject.objects.accessPoint),
    pal: topojson.feature(topojsonObject, topojsonObject.objects.pal)
    // stream_tributary: topojson.feature(topojsonObject, topojsonObject.objects.stream_tributary),
    // bounding_circles: bounds
  }
}

