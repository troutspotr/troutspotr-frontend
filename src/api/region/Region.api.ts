import BaseApi, { IBaseApi } from 'api/BaseApi'
import { transformGeo, IGeoPackageOrWhatver } from './Region.transform'
import StateApi from 'api/usState/StateApi'

export const buildRegionEndpoint = (stateName: string, regionName: string): string =>
  `/data/v3/${stateName}/${regionName}.topo.json`

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
      let regionGeoData = {}
      const endpoint = buildRegionEndpoint(stateName, regionName)
      try {
        regionGeoData = await this.get(endpoint)
        // Sometimes the cache may send us bad data.
        // See if it's valid.
      } catch (exception) {
        throw new Error(`Could not retrieve region ${regionName}`)
      }

      const stateData = await StateApi.getStateData(stateName)

      // tslint:disable-next-line:no-let
      try {
        const asdf = await transformGeo(regionGeoData, stateData)
        return asdf
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
