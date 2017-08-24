import BaseApi from './BaseApi'
import {has, keyBy} from 'lodash'

export const buildStateEndpoint = (stateName) => `/data/v2/${stateName}/${stateName}.data.json`

const stateCache = {}

export const updateStateObject = (stateMetadata) => {
  const regsDictionary = keyBy(stateMetadata.regulations, 'id')
  for (const prop in stateMetadata.waterOpeners) {
    stateMetadata.waterOpeners[prop].openers.forEach((opener) => {
      opener.end_time = new Date(opener.end_time)
      opener.start_time = new Date(opener.start_time)
      opener.restriction = regsDictionary[opener.restriction_id]
    })
  }

  const result = {
    ...stateMetadata,
    'regulationsDictionary': regsDictionary,
    'roadTypesDictionary': keyBy(stateMetadata.roadTypes, 'id'),
    'palTypesDictionary': keyBy(stateMetadata.palTypes, 'id'),
  }
  return result
}

export class StateApi extends BaseApi {
  async getStateData (stateName) {
    if (stateName == null) {
      return Promise.reject('state name was not specificed')
    }

    const endpoint = buildStateEndpoint(stateName)
    if (has(stateCache, endpoint)) {
      return stateCache[endpoint]
    }

    const gettingState = this.get(endpoint)
      .then(updateStateObject)

    stateCache[endpoint] = gettingState
    return stateCache[endpoint]
  }
}

export default new StateApi()
