// tslint:disable:no-any
import axios, { AxiosInstance } from 'axios'
import * as lf from 'localforage'
import isEmpty from 'lodash-es/isEmpty'
import isString from 'lodash-es/isString'
import { config as defaultConfig, IApiConfig } from './BaseApi.config'

export interface IBaseApi {
  get<T>(endpoint: string, config: IApiConfig): Promise<T>
  getAllCachedEndpoints(): Promise<string[]>
}
export default class BaseApi implements IBaseApi {
  protected cache?: LocalForage
  protected httpClient: AxiosInstance
  constructor(cache: LocalForage = lf, config: IApiConfig = defaultConfig()) {
    this.cache = cache
    this.httpClient = axios.create()
    this.handleFailure = this.handleFailure.bind(this)
    this.tryGetFromCache = this.tryGetFromCache.bind(this)
    this.tryGetFromInternet = this.tryGetFromInternet.bind(this)
  }

  public handleFailure(response: any) {
    return Promise.reject(response)
  }

  // This super-murders the cache.
  public async clearCache() {
    if (this.cache) {
      await this.cache.clear()
    }
  }

  public async getAllCachedEndpoints(): Promise<string[]> {
    if (this.cache == null) {
      return []
    }

    const keys = await this.cache.keys()
    return keys
  }

  public tryGetFromCache(endpoint: string) {
    if (this.cache == null) {
      return Promise.reject('Caching not available')
    }
    return this.cache
      .getItem(endpoint)
      .then((values: any) => {
        if (values != null && isEmpty(values) === false && isString(values) === false) {
          return values
        }
        return Promise.reject('No values found in cache!')
      })
      .catch(async (x: any) => {
        await this.cache.removeItem(endpoint)
        return Promise.reject('stuff')
      })
  }

  public tryGetFromInternet(endpoint: string) {
    return this.httpClient
      .get(endpoint)
      .then(async (response: any) => {
        if (this.cache != null) {
          await this.cache.setItem(endpoint, response.data)
        }

        return response.data
      })
      .catch(async (response: any) => {
        if (this.cache != null) {
          await this.cache.removeItem(endpoint)
        }

        return this.handleFailure(response)
      })
  }

  public async get<T>(endpoint: string, config: IApiConfig = null): Promise<T> {
    return this.tryGetFromCache(endpoint).catch(() => {
      return this.tryGetFromInternet(endpoint)
    })
  }

  public put(endpoint: string, data: any) {
    return this.httpClient
      .put(endpoint, data)
      .catch((response: any) => this.handleFailure(response))
  }

  public delete(endpoint: string) {
    return this.httpClient.delete(endpoint).catch((response: any) => this.handleFailure(response))
  }

  public patch(endpoint: string, data: any) {
    return this.httpClient
      .patch(endpoint, data)
      .catch((response: any) => this.handleFailure(response))
  }

  public post(endpoint: string, data: any) {
    return this.httpClient
      .post(endpoint, data)
      .catch((response: any) => this.handleFailure(response))
  }
}
