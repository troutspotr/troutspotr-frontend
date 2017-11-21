import StateData from 'static/data/v4/wi/wi.data.json'
import stateApi, {buildStateEndpoint, updateStateObject} from 'api/StateApi'

const WISCONSIN_STATE_ID = 'wi'
describe('api/StateApi', () => {
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

  it('calls state endpoint with state id', async () => {
    const endpoint = buildStateEndpoint(WISCONSIN_STATE_ID)

    server.respondWith('GET', endpoint,
      [200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(StateData)])
    return stateApi.getStateData(WISCONSIN_STATE_ID)
      .then((result) => {
        expect(result).to.deep.equal(updateStateObject(StateData))
      })
  })

  it('throws if stateId is null', async () => {
    const endpoint = buildStateEndpoint(null)
    server.respondWith('GET', endpoint,
      [200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(StateData)])
    const promise = stateApi.getStateData(WISCONSIN_STATE_ID)
    promise.should.eventually.be.rejected
  })
})

