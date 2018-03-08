import * as lf from 'localforage'
import * as topojson from 'topojson-client'
import BaseApi from './BaseApi'
export const buildTableOfContentsEndpoint = () => `/data/v3/TableOfContents.topo.json`
export const decompress = tocTopojson => {
  const states = topojson.feature(tocTopojson, tocTopojson.objects.minnesota)
  const counties = topojson.feature(tocTopojson, tocTopojson.objects.minnesota_county)
  const regions = topojson.feature(tocTopojson, tocTopojson.objects.region_stats)
  return {
    states,
    counties,
    regions,
  }
}
export class TableOfContentsApi extends BaseApi {
  public async getTableOfContents() {
    const endpoint = buildTableOfContentsEndpoint()
    const tocTopojson = await this.get(endpoint)
    return decompress(tocTopojson)
  }
}

export default new TableOfContentsApi(lf)
