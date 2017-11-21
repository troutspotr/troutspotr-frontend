import StateData from 'static/data/v4/wi/wi.data.json'
import stateApi, {buildStateEndpoint} from 'api/StateApi'
import stateApiSync from 'api/StateApi.sync'

const WISCONSIN_STATE_ID = 'wi'
describe('api/StateApi.sync', () => {
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

  it('does exactly what async state api does', async () => {
    const endpoint = buildStateEndpoint(WISCONSIN_STATE_ID)

    server.respondWith('GET', endpoint,
      [200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(StateData)])
    return stateApi.getStateData(WISCONSIN_STATE_ID)
      .then((asyncResults) => {
        const syncResults = stateApiSync.getStateData(WISCONSIN_STATE_ID)
        expect(asyncResults).to.deep.equal(syncResults)
      })
  })
})

