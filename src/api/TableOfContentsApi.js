import BaseApi from './BaseApi'
import * as topojson from 'topojson-client'
export const buildTableOfContentsEndpoint = () => {
  return `/data/v1/TableOfContents.topo.json`
}
export class TableOfContentsApi extends BaseApi {
  async getTableOfContents () {
    let endpoint = buildTableOfContentsEndpoint()
    let tocTopojson = await this.get(endpoint)
    let states = topojson.feature(tocTopojson, tocTopojson.objects.minnesota)
    let counties = topojson.feature(tocTopojson, tocTopojson.objects.minnesota_county)
    let regions = topojson.feature(tocTopojson, tocTopojson.objects.region)
    return {
      states,
      counties,
      regions
    }
  }
}

export default new TableOfContentsApi()
