import BaseApi from 'api/BaseApi'
import { config as defaultConfig } from 'api/BaseApi.config'
function configFunc () {
  let configObject = {
    'apiRoot': 'localhost:3001/'
  }

  return configObject
}

describe('api/BaseApi', () => {
  let server = null
  before(() => {
    // make an autoresponding server.
    server = sinon.fakeServer.create()
    server.autoRespond = true
    const DELAY_MILLISECONDS = 5
    server.autoResponseAfter = DELAY_MILLISECONDS
  })

  after(() => {
    server.restore()
  })

  it('uses default config if none provided', (done) => {
    let { apiRoot } = defaultConfig()
    const FAKE_ENDPOINT = 'someEndpoint'
    const ENDPOINT_TEST = apiRoot + FAKE_ENDPOINT
    server.respondWith('GET', ENDPOINT_TEST,
      [200,
       { 'Content-Type': 'application/json' },
        '{ "response": "success"}'])

    let baseApiTestInstance = new BaseApi()
    baseApiTestInstance.get(FAKE_ENDPOINT, null)
      .then((result) => {
        done()
      })
  })

  it('uses config values provied to constructor', (done) => {
    let { apiRoot } = configFunc()
    const FAKE_ENDPOINT = 'someEndpoint'
    const ENDPOINT_TEST = apiRoot + FAKE_ENDPOINT
    server.respondWith('GET', ENDPOINT_TEST,
      [200,
       { 'Content-Type': 'application/json' },
        '{ "response": "success"}'])

    let baseApiTestInstance = new BaseApi(null, configFunc())
    baseApiTestInstance.get(FAKE_ENDPOINT, null)
      .then((result) => {
        done()
      })
  })
})
