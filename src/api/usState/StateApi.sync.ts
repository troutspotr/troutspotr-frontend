const mnStateData = require('static/data/v3/mn/mn.data.json')
const wiStateData = require('static/data/v3/wi/wi.data.json')
import { IStateApi } from './StateApi'
import { formatStateData } from './FormatStateData'
import { IApiConfig } from '../BaseApi.config'

const stateDictionary = {
  wi: formatStateData(wiStateData),
  mn: formatStateData(mnStateData),
}

export class StateApiSync implements IStateApi {
  get<T>(endpoint: string, config: IApiConfig): Promise<T> {
    throw new Error('Method not implemented.')
  }
  getAllCachedEndpoints(): Promise<string[]> {
    throw new Error('Method not implemented.')
  }
  public getStateData(stateName: string) {
    if (stateName == null) {
      throw new Error('stateName cannot be null')
    }

    const lowerStateName = stateName.toLowerCase()
    return stateDictionary[lowerStateName]
  }
}

export default new StateApiSync()
