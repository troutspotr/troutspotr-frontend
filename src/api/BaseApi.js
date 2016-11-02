import axios from 'axios'
import { config as defaultConfig } from './BaseApi.config'
// const apiRoot = '/'
export default class BaseApi {
  constructor (cache, config = defaultConfig()) {
    this.cache = cache
    this.httpClient = axios.create()
  }

  handleFailure (response) {
    return Promise.reject(response)
  }

  get (endpoint, config) {
    console.log('endpoint', endpoint)
    return this.httpClient.get(endpoint)
      .then((response) => {
        return response.data
      }).catch((response) => {
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
