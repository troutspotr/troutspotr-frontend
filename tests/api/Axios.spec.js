import axios from 'axios'

describe('api (axios)', () => {
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

  it('will work with unit tests', (done) => {
    const ENDPOINT_TEST = '/someEndpoint'
    server.respondWith('GET', ENDPOINT_TEST,
      [200,
       { 'Content-Type': 'application/json' },
        '{ "response": "1"}'])

    // let baseApiTestInstance = new BaseApi(null, null, configFunc)
    axios.get(ENDPOINT_TEST, null)
      .then((result) => {
        if (result.data == null || result.data.response !== '1') {
          throw new Error('response was not expected')
        }
        done()
      })
  })

  it('will use custom base url with relative path requests', (done) => {
    const BASE_ENDPOINT = 'http://someWebsite.com'
    const ENDPOINT = '/someEndpoint'
    const FULL_REQUEST_PATH = BASE_ENDPOINT + ENDPOINT
    server.respondWith('GET', FULL_REQUEST_PATH,
      [200,
       { 'Content-Type': 'application/json' },
        '{ "response": "1"}'])

    // let baseApiTestInstance = new BaseApi(null, null, configFunc)
    let customAxios = axios.create({ baseURL: BASE_ENDPOINT + '/' })
    customAxios.get(ENDPOINT, null)
      .then((result) => {
        if (result.data == null || result.data.response !== '1') {
          throw new Error('response was not expected')
        }
        done()
      })
  })
})
