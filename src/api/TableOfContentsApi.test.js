import TableOfContents from 'static/data/v2/TableOfContents.topo.json'
import tableOfContentsApi, {buildTableOfContentsEndpoint, decompress} from './TableOfContentsApi'

describe('api/TableOfContentsApi', () => {
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

  it('calls tableOfContents endpoint', async () => {
    const endpoint = buildTableOfContentsEndpoint()

    server.respondWith('GET', endpoint,
      [200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(TableOfContents)])
    return tableOfContentsApi.getTableOfContents()
      .then((result) => {
        expect(result).to.deep.equal(decompress(TableOfContents))
      })
  })
})

