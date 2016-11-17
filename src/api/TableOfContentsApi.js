import BaseApi from './BaseApi'
import * as topojson from 'topojson-client'
export const buildTableOfContentsEndpoint = () => {
  return `/data/v1/TableOfContents.topo.json`
}
export class TableOfContentsApi extends BaseApi {
  async getTableOfContents () {
    console.log('why am i being called');
    let endpoint = buildTableOfContentsEndpoint()
    let tocTopojson = await this.get(endpoint)
    let states = topojson.feature(tocTopojson, tocTopojson.objects.minnesota)
    let counties = topojson.feature(tocTopojson, tocTopojson.objects.minnesota_county)
    let regions = topojson.feature(tocTopojson, tocTopojson.objects.region)
    let streamCentroids = {
      features: tocTopojson.objects.stream_centroids.geometries
    }
    // console.log(streamCentroids.features.map(f => f.geometry.coordinates))
    return {
      states,
      counties,
      regions,
      streamCentroids
    }
  }
}

export default new TableOfContentsApi()
