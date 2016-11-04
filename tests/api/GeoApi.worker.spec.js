import { default as geoWorker } from 'api/GeoApi.worker'
import { GeoApi, buildGeoEndpoint } from 'api/GeoApi'
import GeoMnData from 'static/data/mn/mn.topo.json'
import { config } from 'api/BaseApi.config'
import work from 'webworkify-webpack'

describe('api/GeoApi.worker', () => {
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

  it('Webworker works correctly', (done) => {
    const STATE_NAME = 'mn'
    const ENDPOINT_TEST = buildGeoEndpoint(STATE_NAME)
    let { apiRoot } = config()
    server.respondWith('GET', apiRoot + ENDPOINT_TEST,
      [200,
       { 'Content-Type': 'application/json' },
       JSON.stringify(GeoMnData)])

    var w2 = work(geoWorker)
    w2.addEventListener('message', function (ev) {
      done()
    })

    w2.postMessage(123)
  })

  it('Webworker detects failure', (done) => {
    const STATE_NAME = 'mn'
    const ENDPOINT_TEST = buildGeoEndpoint(STATE_NAME)
    let { apiRoot } = config()
    server.respondWith('GET', apiRoot + ENDPOINT_TEST,
      [200,
       { 'Content-Type': 'application/json' },
       JSON.stringify(GeoMnData)])

    var w2 = work(geoWorker)

    w2.addEventListener('error', () => {
      done()
    }, false)

    w2.postMessage(null)
  })
})
