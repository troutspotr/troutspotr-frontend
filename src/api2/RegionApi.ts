import BaseApi from './BaseApi'
import { transformGeo } from './GeoApi.transform'
import StateApi from './StateApi'
export const buildRegionEndpoint = (stateName, regionName) =>
  `/data/v3/${stateName}/${regionName}.topo.json`
export class RegionApi extends BaseApi {
  public async getRegionData(stateName, regionName) {
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
      let transformedData = {}
      try {
        transformedData = await transformGeo(regionGeoData, stateData)
      } catch (error) {
        // Yes, we're going to super-murder their cache.
        this.clearCache()
      }
      return transformedData
    } catch (error) {
      console.error(error) // eslint-disable-line
      throw new Error('Could not load region.')
    }
  }
}

export default new RegionApi()
