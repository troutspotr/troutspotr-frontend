import StateData from 'static/data/v3/wi/wi.data.json'
import RegionData from 'static/data/v3/wi/highland-headwaters.topo.json'
import * as GeoApiTransform from 'api/GeoApi.transform'
import {updateStateObject} from 'api/StateApi'
import _ from 'lodash'

describe('api/GeoApi.transform', () => {
  let stateData = null
  let regionData = null
  beforeEach(() => {
    stateData = updateStateObject(_.cloneDeep(StateData))
    regionData = updateStateObject(_.cloneDeep(RegionData))
  })

  after(() => {

  })

  describe('decompress', () => {
    it('works', async () => {
      const results = await GeoApiTransform.decompress(regionData, stateData)
      expect(results).to.be.an('object').that.has.all.keys('boundingCircle',
        'pal',
        'pal_routes',
        'restriction_section',
        'streamProperties',
        'stream_access_point',
        'tributary',
        'trout_stream_section')
    })
  })
})
