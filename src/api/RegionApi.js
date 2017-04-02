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
    let endpoint = buildRegionEndpoint(stateName, regionName)
    let regionGeoData = await this.get(endpoint)
    let stateData = await StateApi.getStateData(stateName)
    let transformedData = transformGeo(regionGeoData, stateData)
    return transformedData
  }
}

export default new RegionApi()
