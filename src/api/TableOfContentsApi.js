import BaseApi from './BaseApi'
import localForage from 'localforage'
import * as topojson from 'topojson-client'
export const buildTableOfContentsEndpoint = () => `/data/v2/TableOfContents.topo.json`
export class TableOfContentsApi extends BaseApi {
  async getTableOfContents () {
    const endpoint = buildTableOfContentsEndpoint()
    const tocTopojson = await this.get(endpoint)
    const states = topojson.feature(tocTopojson, tocTopojson.objects.minnesota)
    const counties = topojson.feature(tocTopojson, tocTopojson.objects.minnesota_county)
    const regions = topojson.feature(tocTopojson, tocTopojson.objects.region)
    return {
      states,
      counties,
      regions,
    }
  }
}

export default new TableOfContentsApi(localForage)
