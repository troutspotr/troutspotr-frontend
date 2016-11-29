import BaseApi from './BaseApi'
import { has, keyBy } from 'lodash'

export const buildStateEndpoint = (stateName) => {
  return `/data/v1/${stateName}/${stateName}.data.json`
}

let stateCache = {}

export class StateApi extends BaseApi {
  async getStateData (stateName) {
    if (stateName == null) {
      return Promise.reject('state name was not specificed')
    }

    let endpoint = buildStateEndpoint(stateName)
    if (has(stateCache, endpoint)) {
      console.log('RETURNING FROM CACHE')
      return stateCache[endpoint]
    }

    console.log('trying to retrieve')

    let gettingState = this.get(endpoint)
      .then(stateMetadata => {
        console.log('downloaded state metadata for ' + stateName)
        console.log('version: ' + stateMetadata.version)
        let regsDictionary = keyBy(stateMetadata.regulations, 'id')
        for (var prop in stateMetadata.waterOpeners) {
          stateMetadata.waterOpeners[prop].openers.forEach(opener => {
            opener.end_time = new Date(opener.end_time)
            opener.start_time = new Date(opener.start_time)
            opener.restriction = regsDictionary[opener.restriction_id]
          })
        }

        var result = {
          ...stateMetadata,
          regulationsDictionary: regsDictionary,
          roadTypesDictionary: keyBy(stateMetadata.roadTypes, 'id'),
          palTypesDictionary: keyBy(stateMetadata.palTypes, 'id')
        }

        return result
      })

    stateCache[endpoint] = gettingState
    return stateCache[endpoint]
  }
}

export default new StateApi()
