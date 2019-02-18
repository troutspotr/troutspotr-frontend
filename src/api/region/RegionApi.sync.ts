import { transformGeo } from './Region.transform.sync'
import StateApi from 'api/usState/StateApi.sync'
import { VERSION } from 'api/BaseApi.config'
const mnBwca = require('static/data/v5/mn/upper-superior.topojson')
const mnDriftless = require('static/data/v5/mn/driftless.topojson')
const mnLowerSuperior = require('static/data/v5/mn/lower-superior.topojson')
const mnMetro = require('static/data/v5/mn/metro.topojson')

const wiDriftlessCentral = require('static/data/v5/wi/driftless-central.topojson')
const wiDriftlessLower = require('static/data/v5/wi/driftless-lower.topojson')
const wiDriftlessUpper = require('static/data/v5/wi/driftless-upper.topojson')
const wiHighlandHeadwaters = require('static/data/v5/wi/highland-headwaters.topojson')
const wiHighlandFreestone = require('static/data/v5/wi/highland-freestone.topojson')

const dictionary = {
  mn: {
    bwca: mnBwca,
    driftless: mnDriftless,
    'lower-superior': mnLowerSuperior,
    metro: mnMetro,
  },
  wi: {
    'driftless-central': wiDriftlessCentral,
    'driftless-lower': wiDriftlessLower,
    'driftless-upper': wiDriftlessUpper,
    'highland-headwaters': wiHighlandHeadwaters,
    'highland-freestone': wiHighlandFreestone,
  },
}

export class RegionApiSync {
  public getRegionData(stateName: string, regionName: string) {
    if (stateName == null) {
      throw new Error('state name was not specificed')
    }

    if (regionName == null) {
      throw new Error('region name was not specificed')
    }

    const regionGeoData = dictionary[stateName][regionName]
    const stateData = StateApi.getStateData(stateName)
    const transformedData = transformGeo(regionGeoData, stateData)
    return transformedData
  }
}

export default new RegionApiSync()
