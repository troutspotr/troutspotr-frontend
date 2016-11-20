import BaseApi from './BaseApi'
export const buildStateEndpoint = (stateName) => {
  return `/data/v1/${stateName}/${stateName}.data.json`
}
export class StateApi extends BaseApi {
  async getStateData (stateName) {
    if (stateName == null) {
      return Promise.reject('state name was not specificed')
    }

    let endpoint = buildStateEndpoint(stateName)
    let stateMetadata = await this.get(endpoint)

    console.log('downloaded state metadata for ' + stateName)
    console.log('version: ' + stateMetadata.version)
    return stateMetadata
  }
}

export default new StateApi()
