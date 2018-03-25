import * as lf from 'localforage'
import * as topojson from 'topojson-client'
import BaseApi, { IBaseApi } from 'api/BaseApi'
import { ITableOfContentsData } from './ITableOfContentsData'
export const buildTableOfContentsEndpoint = (): string => `/data/v3/TableOfContents.topo.json`
// tslint:disable-next-line:no-any
export const decompress = (tocTopojson: any): ITableOfContentsData => {
  const states = topojson.feature(tocTopojson, tocTopojson.objects.minnesota)
  states.features.forEach(s => (s.properties.short_name = s.properties.short_name.toLowerCase()))
  const counties = topojson.feature(tocTopojson, tocTopojson.objects.minnesota_county)
  const regions = topojson.feature(tocTopojson, tocTopojson.objects.region_stats)
  regions.features.forEach(
    s => (s.properties.state_short_name = s.properties.state_short_name.toLowerCase())
  )
  return {
    states,
    counties,
    regions,
  }
}

export interface ITableOfContentsApi extends IBaseApi {
  getTableOfContents(): Promise<ITableOfContentsData>
}
export class TableOfContentsApi extends BaseApi implements ITableOfContentsApi {
  public async getTableOfContents() {
    const endpoint = buildTableOfContentsEndpoint()
    const tocTopojson = await this.get(endpoint)
    return decompress(tocTopojson)
  }
}

export default new TableOfContentsApi(lf)
