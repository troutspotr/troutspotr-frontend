import BaseApi from './BaseApi'
import StateApi from './StateApi'
import { transformGeo } from './GeoApi.transform'
export const buildRegionEndpoint = (stateName, regionName) => {
  return `/data/v2/${stateName}/${regionName}.topo.json`
}
export class RegionApi extends BaseApi {
  async getRegionData (stateName, regionName) {
    if (stateName == null) {
      return Promise.reject('state name was not specificed')
    }

    if (regionName == null) {
      return Promise.reject('region name was not specificed')
    }
    try {
      let regionGeoData = {}
      let endpoint = buildRegionEndpoint(stateName, regionName)
      try {
        regionGeoData = await this.get(endpoint)
        // sometimes the cache may send us bad data.
        // see if it's valid.
      } catch (exception) {
        throw new Error('Could not retrieve region ', regionName)
      }

      let stateData = await StateApi.getStateData(stateName)

      let transformedData = {}
      try {
        transformedData = transformGeo(regionGeoData, stateData)
      } catch (error) {
        // Yes, we're going to super-murder their cache.
        this.clearCache()
      }
      return transformedData
    } catch (error) {
      console.log(error)
      throw new Error('Could not load region.')
    }
  }
}

export default new RegionApi()
