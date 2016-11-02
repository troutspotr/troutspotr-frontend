import GeoMnData from 'static/data/mn/mn.topo.json'
import * as GeoApiTransform from 'api/GeoApi.transform'
import _ from 'lodash'

describe('api/GeoApi.transform', () => {
  let response = null

  before(() => {
    response = _.cloneDeep(GeoMnData)
  })

  after(() => {

  })

  it('decompress topojson works', () => {
    let results = GeoApiTransform.decompress(response)
    expect(results).to.not.be.null
  })

  it('createStreamDictionaries works', () => {
    let decompressed = GeoApiTransform.decompress(response)
    let results = GeoApiTransform.createStreamDictionaries(decompressed)
    expect(results).to.not.be.null
  })

  it('createStreamDictionary works', () => {
    let decompressed = GeoApiTransform.decompress(response)
    let dictionaries = GeoApiTransform.createStreamDictionaries(decompressed)
    let results = GeoApiTransform.createStreamDictionary(decompressed, dictionaries)
    expect(results).to.not.be.null
  })

  it('transformGeo works', () => {
    let decompressed = GeoApiTransform.transformGeo(response)
    expect(decompressed).to.not.be.null
  })
})
