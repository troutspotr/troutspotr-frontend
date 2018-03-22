import BaseApi from 'api/BaseApi'
export const buildGeoEndpoint = (stateName: string): string =>
  `data/${stateName}/${stateName}.topo.json`
export class GeoApi extends BaseApi {
  public getStateStreamData(stateName: string) {
    if (stateName == null) {
      return Promise.reject(new Error('stateName cannot be null'))
    }
    const endpoint = buildGeoEndpoint(stateName)
    return this.get(endpoint)
  }
}

export default new GeoApi()
