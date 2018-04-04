import BaseApi, { IBaseApi } from 'api/BaseApi'
import { transformGeo, IGeoPackageOrWhatver } from './Region.transform'
import StateApi from 'api/usState/StateApi'
const topojson = require('topojson-client')

export const buildRegionEndpoint = (stateName: string, regionName: string): string =>
  `/data/v3/${stateName}/${regionName}.topo.json`

export const buildRegionPalEndpoint = (stateName: string, regionName: string): string =>
  `/data/v3/${stateName}/${regionName}.pal.topo.json`

export interface IRegionApi extends IBaseApi {
  getRegionData(stateName: string, regionName: string): Promise<IGeoPackageOrWhatver>
}

export class RegionApi extends BaseApi implements IRegionApi {
  public async getRegionData(stateName: string, regionName: string): Promise<IGeoPackageOrWhatver> {
    if (stateName == null) {
      return Promise.reject('state name was not specificed')
    }

    if (regionName == null) {
      return Promise.reject('region name was not specificed')
    }
    try {
      // tslint:disable-next-line:no-let
      let regionGeoData = null
      const endpoint = buildRegionEndpoint(stateName, regionName)
      const palEndpoint = buildRegionPalEndpoint(stateName, regionName)
      try {
        const [region, pal, stateData] = await Promise.all([
          this.get(endpoint),
          this.get(palEndpoint),
          StateApi.getStateData(stateName),
        ])
        regionGeoData = {
          region,
          pal,
          stateData,
        }
        // Sometimes the cache may send us bad data.
        // See if it's valid.
      } catch (exception) {
        throw new Error(`Could not retrieve region ${regionName}`)
      }

      const { region, pal, stateData } = regionGeoData

      // tslint:disable-next-line:no-let
      try {
        const transformedGeography = await transformGeo(region, stateData)
        const palGeoJson = topojson.feature(pal, pal.objects.pal)
        return {
          ...transformedGeography,
          pal: palGeoJson,
        }
      } catch (error) {
        // Yes, we're going to super-murder their cache.
        this.clearCache()
      }
      return Promise.resolve(null)
    } catch (error) {
      console.error(error) // eslint-disable-line
      throw new Error('Could not load region.')
    }
  }
}

export default new RegionApi()
