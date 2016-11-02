import BaseApi from './BaseApi'
export const buildGeoEndpoint = (stateName) => {
  return `data/${stateName}/${stateName}.topo.json`
}
export class GeoApi extends BaseApi {
  getStateStreamData (stateName) {
    if (stateName == null) {
      return Promise.reject(new Error('stateName cannot be null'))
    }
    console.log('calling endpoint')
    let endpoint = buildGeoEndpoint(stateName)
    return this.get(endpoint)
  }
}

export default new GeoApi()
