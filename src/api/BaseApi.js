import axios from 'axios'
import { config as defaultConfig } from './BaseApi.config'
import localForage from 'localforage'
import { isEmpty, isString } from 'lodash'

export default class BaseApi {
  constructor (cache = localForage, config = defaultConfig()) {
    this.cache = cache
    this.httpClient = axios.create()
  }

  handleFailure (response) {
    return Promise.reject(response)
  }

  // This super-murders the cache.
  async clearCache () {
    if (this.cache) {
      await this.cache.clear()
    }
  }

  tryGetFromCache (endpoint) {
    console.log(`trying to get ${endpoint} from the cache...`)
    if (this.cache == null) {
      return Promise.reject('Caching not available')
    }
    return this.cache.getItem(endpoint).then(values => {
      if (values != null &&
          isEmpty(values) === false &&
          isString(values) === false) {
        console.log(`found ${endpoint} in cache - returning it`)
        return values
      }
      return Promise.reject('No values found in cache!')
    }).catch(async x => {
      await this.cache.removeItem(endpoint)
      return Promise.reject('stuff')
    })
  }

  tryGetFromInternet (endpoint) {
    console.log(`trying to get ${endpoint} from the internet...`)
    return this.httpClient.get(endpoint)
      .then(async (response) => {
        console.log(`${endpoint} found!`)
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

  async get (endpoint, config) {
    return this.tryGetFromCache(endpoint)
      .catch(() => {
        console.log(`${endpoint} not found in cache, moving to internet...`)
        return this.tryGetFromInternet(endpoint)
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
