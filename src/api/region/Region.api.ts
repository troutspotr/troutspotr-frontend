import BaseApi, { IBaseApi } from 'api/BaseApi'
import { transformGeo, IGeoPackageOrWhatver } from './Region.transform'
import StateApi from 'api/usState/StateApi'
const topojson = require('topojson-client')

export const buildRegionEndpoint = (stateName: string, regionName: string): string =>
  `/data/v5/${stateName}/${regionName}.topojson`

export const buildRegionPalEndpoint = (stateName: string, regionName: string): string =>
  `/data/v5/${stateName}/${regionName}.pal.topojson`

export interface IRegionApi extends IBaseApi {
  getRegionData(stateName: string, regionName: string, now: Date): Promise<IGeoPackageOrWhatver>
}

export class RegionApi extends BaseApi implements IRegionApi {
  public async getRegionData(stateName: string, regionName: string, now: Date): Promise<IGeoPackageOrWhatver> {
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
        const [endpointRegion, endpointPal, endpointStateData] = await Promise.all([
          this.get(endpoint),
          this.get(palEndpoint),
          StateApi.getStateData(stateName),
        ])
        regionGeoData = {
          region: endpointRegion,
          pal: endpointPal,
          stateData: endpointStateData,
        }
        // Sometimes the cache may send us bad data.
        // See if it's valid.
      } catch (exception) {
        throw new Error(`Could not retrieve region ${regionName}`)
      }

      const { region, pal, stateData } = regionGeoData

      // tslint:disable-next-line:no-let
      try {
        const transformedGeography = await transformGeo(region, stateData, now)
        const palGeoJson = topojson.feature(pal, pal.objects.pal)
        const restrictedLand = topojson.feature(pal, pal.objects['restricted-land'])
        return {
          ...transformedGeography,
          pal: palGeoJson,
          restricted_land: restrictedLand,
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
