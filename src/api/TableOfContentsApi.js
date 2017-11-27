import BaseApi from './BaseApi'
import localForage from 'localforage'
import * as topojson from 'topojson-client'
export const buildTableOfContentsEndpoint = () => `/data/v4/TableOfContents.topo.json`
export const createTroutStreamBoundingBox = feature => {
    let {
      bbox_maximum_latitude,
      bbox_maximum_longitude,
      bbox_minimum_latitude,
      bbox_minimum_longitude
    } = feature.properties

   return { "type": "Feature",
         "geometry": {
           "type": "Polygon",
           "coordinates": [
             [ [bbox_minimum_longitude, bbox_minimum_latitude], [bbox_maximum_longitude, bbox_minimum_latitude], [bbox_maximum_longitude, bbox_maximum_latitude],
               [bbox_minimum_longitude, bbox_maximum_latitude], [bbox_minimum_longitude, bbox_minimum_latitude] ]
             ]
         },
         "properties": {
           
           }
         }
       }
export const decompress = (tocTopojson) => {
  const states = topojson.feature(tocTopojson, tocTopojson.objects.states)
  const counties = topojson.feature(tocTopojson, tocTopojson.objects.counties)
  const regions = topojson.feature(tocTopojson, tocTopojson.objects.region_stats)
  console.log(regions)
  regions.features.forEach(feature => {
    var bbox = createTroutStreamBoundingBox(feature);
    feature.properties.troutBbox = bbox;
  })
  return {
    states,
    counties,
    regions,
  }
}
export class TableOfContentsApi extends BaseApi {
  async getTableOfContents () {
    const endpoint = buildTableOfContentsEndpoint()
    try {
    const tocTopojson = await this.get(endpoint)
    return decompress(tocTopojson)
    } catch (e) {
      console.log(e)
    }

  }
}

export default new TableOfContentsApi(localForage)
