import BaseApi from './BaseApi'
export const buildGeoEndpoint = (stateName) => `data/${stateName}/${stateName}.topo.json`
export class GeoApi extends BaseApi {
  public getStateStreamData (stateName) {
    if (stateName == null) {
      return Promise.reject(new Error('stateName cannot be null'))
    }
    const endpoint = buildGeoEndpoint(stateName)
    return this.get(endpoint)
  }
}

export default new GeoApi()
