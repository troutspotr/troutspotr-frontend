const StateData = require('static/data/v3/wi/wi.data.json')
const wiHighlandFreestone = require('static/data/v3/wi/highland-freestone.topo.json')
import { buildStateEndpoint } from 'api/StateApi'

import regionApi, { buildRegionEndpoint } from './RegionApi'
import regionApiSync from './RegionApi.sync'

const WISCONSIN_STATE_ID = 'wi'
const REGION_ID = 'highland-freestone'

describe('api/RegionApi.sync', () => {
  let server = null
  beforeAll(() => {
    // make an autoresponding server.
    server = sinon.fakeServer.create()
    server.autoRespond = true
    const DELAY_MILLISECONDS = 5
    server.autoResponseAfter = DELAY_MILLISECONDS
  })

  after(() => {
    server.restore()
  })

  it('does exactly what async region api does', async () => {
    const regionEndpiont = buildRegionEndpoint(WISCONSIN_STATE_ID, REGION_ID)
    const stateEndpoint = buildStateEndpoint(WISCONSIN_STATE_ID)

    // set up region endpoint
    server.respondWith('GET', regionEndpiont, [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(wiHighlandFreestone),
    ])

    // set up state endpoint
    server.respondWith('GET', stateEndpoint, [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(StateData),
    ])
    const asyncResults = await regionApi.getRegionData(WISCONSIN_STATE_ID, REGION_ID)
    const asyncResultsKeys = Object.keys(asyncResults)
    const syncResults = regionApiSync.getRegionData(WISCONSIN_STATE_ID, REGION_ID)
    expect(syncResults)
      .to.be.an('object')
      .that.has.keys(asyncResultsKeys)
  })
})
