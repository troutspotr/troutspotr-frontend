import axios from 'axios'
import { config as defaultConfig } from './BaseApi.config'
import localForage from 'localforage'
export default class BaseApi {
  constructor (cache = localForage, config = defaultConfig()) {
    this.cache = cache
    this.httpClient = axios.create()
  }

  handleFailure (response) {
    return Promise.reject(response)
  }

  async get (endpoint, config) {
    if (this.cache != null) {
      console.log(`attempting to retrieve ${endpoint} from cache`)
      let values = await this.cache.getItem(endpoint)
      if (values != null) {
        console.log(`found ${endpoint} in cache - returning cache`)
        return Promise.resolve(values)
      }
    }

    console.log(`${endpoint} not found in cache, retrieving`)
    return this.httpClient.get(endpoint)
      .then(async (response) => {
        console.log(`${endpoint} found.`)
        if (this.cache != null) {
          console.log(`placing ${endpoint} in cache.`)
          await this.cache.setItem(endpoint, response.data)
        }

        return response.data
      }).catch(async (response) => {
        if (this.cache != null) {
          await this.cache.removeItem(endpoint)
        }

        return this.handleFailure(response)
      })
  }

  put (endpoint, data) {
    return this.httpClient.put(endpoint, data)
      .catch((response) => {
        return this.handleFailure(response)
      })
  }

  delete (endpoint) {
    return this.httpClient['delete'](endpoint)
      .catch((response) => {
        return this.handleFailure(response)
      })
  }

  patch (endpoint, data) {
    return this.httpClient.patch(endpoint, data)
      .catch((response) => {
        return this.handleFailure(response)
      })
  }

  post (endpoint, data) {
    return this.httpClient.post(endpoint, data)
      .catch((response) => {
        return this.handleFailure(response)
      })
  }
}
