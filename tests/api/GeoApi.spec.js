import { GeoApi, buildGeoEndpoint } from 'api/GeoApi'
import GeoMnData from 'static/data/mn/mn.topo.json'
import { config } from 'api/BaseApi.config'

describe('api/GeoApi', () => {
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

  it('Calls mn endpoints correctly', (done) => {
    const STATE_NAME = 'mn'
    const ENDPOINT_TEST = buildGeoEndpoint(STATE_NAME)
    let { apiRoot } = config()
    server.respondWith('GET', apiRoot + ENDPOINT_TEST,
      [200,
       { 'Content-Type': 'application/json' },
        JSON.stringify(GeoMnData)])

    let geoApi = new GeoApi()
    geoApi.getStateStreamData(STATE_NAME)
      .then((result) => {
        done()
      }).catch(error => {
        console.log(error)
      })
  })
})
