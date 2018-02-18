import axios, { AxiosInstance } from 'axios'
import { config as defaultConfig } from './BaseApi.config'
import * as lf from 'localforage'
import { isEmpty, isString } from 'lodash'

export default class BaseApi {
  protected cache?: LocalForage
  protected httpClient: AxiosInstance
  constructor(cache: LocalForage = lf, config = defaultConfig()) {
    this.cache = cache
    this.httpClient = axios.create()
    this.handleFailure = this.handleFailure.bind(this)
    this.tryGetFromCache = this.tryGetFromCache.bind(this)
    this.tryGetFromInternet = this.tryGetFromInternet.bind(this)
  }

  handleFailure(response) {
    return Promise.reject(response)
  }

  // This super-murders the cache.
  async clearCache() {
    if (this.cache) {
      await this.cache.clear()
    }
  }

  async getAllCachedEndpoints() {
    if (this.cache == null) {
      return []
    }

    const keys = await this.cache.keys()
    return keys
  }

  tryGetFromCache(endpoint) {
    if (this.cache == null) {
      return Promise.reject('Caching not available')
    }
    return this.cache
      .getItem(endpoint)
      .then(values => {
        if (values != null && isEmpty(values) === false && isString(values) === false) {
          return values
        }
        return Promise.reject('No values found in cache!')
      })
      .catch(async x => {
        await this.cache.removeItem(endpoint)
        return Promise.reject('stuff')
      })
  }

  tryGetFromInternet(endpoint) {
    return this.httpClient
      .get(endpoint)
      .then(async response => {
        if (this.cache != null) {
          await this.cache.setItem(endpoint, response.data)
        }

        return response.data
      })
      .catch(async response => {
        if (this.cache != null) {
          await this.cache.removeItem(endpoint)
        }

        return this.handleFailure(response)
      })
  }

  async get(endpoint, config = null) {
    return this.tryGetFromCache(endpoint).catch(() => {
      return this.tryGetFromInternet(endpoint)
    })
  }

  put(endpoint, data) {
    return this.httpClient.put(endpoint, data).catch(response => this.handleFailure(response))
  }

  delete(endpoint) {
    return this.httpClient.delete(endpoint).catch(response => this.handleFailure(response))
  }

  patch(endpoint, data) {
    return this.httpClient.patch(endpoint, data).catch(response => this.handleFailure(response))
  }

  post(endpoint, data) {
    return this.httpClient.post(endpoint, data).catch(response => this.handleFailure(response))
  }
}
