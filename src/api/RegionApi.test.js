import StateData from 'static/data/v3/wi/wi.data.json'
import RegionData from 'static/data/v3/wi/highland-headwaters.topo.json'
import { transformGeo } from './GeoApi.transform'
import regionApi, {buildRegionEndpoint, updateStateObject} from './RegionApi'
import {buildStateEndpoint} from './StateApi'
const WISCONSIN_STATE_ID = 'wi'
const HIGHLAND_REGION = 'highland-headwaters'

describe('api/RegionApi', () => {
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

  it('calls region with state and region id', async () => {
    const regionEndpiont = buildRegionEndpoint(WISCONSIN_STATE_ID, HIGHLAND_REGION)
    const stateEndpoint = buildStateEndpoint(WISCONSIN_STATE_ID)

    // set up region endpoint
    server.respondWith('GET', regionEndpiont,
      [200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(RegionData)])

    // set up state endpoint
    server.respondWith('GET', stateEndpoint,
      [200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(StateData)])


    return regionApi.getRegionData(WISCONSIN_STATE_ID, HIGHLAND_REGION)
  })

  it('has correct properties when called', async () => {
    const regionEndpiont = buildRegionEndpoint(WISCONSIN_STATE_ID, HIGHLAND_REGION)
    const stateEndpoint = buildStateEndpoint(WISCONSIN_STATE_ID)

    // set up region endpoint
    server.respondWith('GET', regionEndpiont,
      [200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(RegionData)])

    // set up state endpoint
    server.respondWith('GET', stateEndpoint,
      [200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(StateData)])


    const results = await regionApi.getRegionData(WISCONSIN_STATE_ID, HIGHLAND_REGION)
    expect(results).to.be.an('object').that.has.keys('streamDictionary',
      'boundingCircle',
      'pal',
      'pal_routes',
      'restriction_section',
      'stream_access_point',
      'tributary',
      'streamProperties',
      'trout_stream_section')
    const firstKey = Object.keys(results.streamDictionary)[0]
    const firstItem = results.streamDictionary[firstKey]
    expect(firstItem).to.be.an('object').that.has.all.keys('stream',
      'sections',
      'restrictions',
      'palSections',
      'accessPoints',
      'tributaries',
      'circle')
  })
})
