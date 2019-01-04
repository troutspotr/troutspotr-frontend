import * as lf from 'localforage'
import * as topojson from 'topojson-client'
import BaseApi, { IBaseApi } from 'api/BaseApi'
import { ITableOfContentsData } from './ITableOfContentsData'
export const buildTableOfContentsEndpoint = (): string => `/data/v3/TableOfContents.topojson`
import keyBy from 'lodash-es/keyBy'
import { RegionFeature } from 'coreTypes/tableOfContents/ITableOfContentsGeoJSON'
export const updateRegionCachedStatus = (
  region: RegionFeature,
  dictionary: { [key: string]: string }
): RegionFeature => {
  const key = `/data/v3/${region.properties.path}.topojson`
  const isCached = dictionary != null && dictionary[key] != null
  region.properties = {
    ...region.properties,
    isCached,
  }

  return region
}

export const updateCacheStatusForItems = (
  tableOfContents: ITableOfContentsData,
  items: string[]
): ITableOfContentsData => {
  try {
    const itemsDictionary = keyBy(items, x => x)

    tableOfContents.states.features.forEach(state => {
      const key = `/data/v3/${state.properties.short_name}/${state.properties.short_name}.data.json`
      state.properties = {
        ...state.properties,
        isCached: itemsDictionary[key] != null,
      }
    })

    tableOfContents.regions.features.forEach(region => {
      updateRegionCachedStatus(region, itemsDictionary)
    })
  } catch (e) {
    console.error(e)
  }

  return tableOfContents
}

export const decompress = (tocTopojson: any): ITableOfContentsData => {
  const states = topojson.feature(tocTopojson, tocTopojson.objects.states) as any
  states.features.forEach((s: any) => (s.properties.short_name = s.properties.short_name.toLowerCase()))
  const counties = topojson.feature(tocTopojson, tocTopojson.objects.counties) as any
  const regions = topojson.feature(tocTopojson, tocTopojson.objects.region_stats) as any
  regions.features.forEach(
    (s: any) => (s.properties.state_short_name = s.properties.state_short_name.toLowerCase())
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
    const cachedEndpoints = (await this.getAllCachedEndpoints()) || []
    const data = decompress(tocTopojson)
    return updateCacheStatusForItems(data, cachedEndpoints)
  }
}

export default new TableOfContentsApi(lf)
