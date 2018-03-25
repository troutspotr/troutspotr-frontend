import has from 'lodash-es/has'
import BaseApi, { IBaseApi } from 'api/BaseApi'
export const buildStateEndpoint = (stateName: string): string =>
  `/data/v3/${stateName}/${stateName}.data.json`
import { formatStateData } from './FormatStateData'
import { IStateData } from 'api/usState/IStateData'
const stateCache = {}

export interface IStateApi extends IBaseApi {
  getStateData(stateName: string): Promise<IStateData>
}

export class StateApi extends BaseApi implements IStateApi {
  public async getStateData(stateName: string): Promise<IStateData> {
    if (stateName == null) {
      return Promise.reject('state name was not specificed')
    }

    const endpoint = buildStateEndpoint(stateName)
    if (has(stateCache, endpoint)) {
      return stateCache[endpoint]
    }

    const gettingState = this.get(endpoint).then(formatStateData)

    stateCache[endpoint] = gettingState
    return stateCache[endpoint]
  }
}

export default new StateApi()