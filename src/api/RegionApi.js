import BaseApi from './BaseApi'
import StateApi from './StateApi'
import {transformGeo} from './GeoApi.transform'
export const buildRegionEndpoint = (stateName, regionName) => `/data/v4/${stateName}/${regionName}.topo.json`
export const buildRegionPalEndpoint = (stateName, regionName) => `/data/v4/${stateName}/${regionName}.pal.topo.json`
export class RegionApi extends BaseApi {
  async getRegionData (stateName, regionName) {
    if (stateName == null) {
      return Promise.reject('state name was not specificed')
    }

    if (regionName == null) {
      return Promise.reject('region name was not specificed')
    }
    try {
      let regionGeoData = {}
      let regionPalData = {}
      let stateData = {}

      const endpoint = buildRegionEndpoint(stateName, regionName)
      const palEndpoint = buildRegionPalEndpoint(stateName, regionName)
      try {
        var results = await Promise.all([
          this.get(endpoint), 
          this.get(palEndpoint),
          StateApi.getStateData(stateName),
        ])
        regionGeoData = results[0]
        regionPalData = results[1]
        stateData = results[2]
        
      } catch (exception) {
        console.log(exception)
        throw new Error('Could not retrieve region ', regionName)
      }

      let transformedData = {}
      try {
        transformedData = await transformGeo(regionGeoData, regionPalData, stateData)
      } catch (error) {
        // Yes, we're going to super-murder their cache.
        this.clearCache()
      }
      return transformedData
    } catch (error) {
      console.log(error) // eslint-disable-line
      debugger
      throw new Error('Could not load region.')
    }
  }
}

export default new RegionApi()
