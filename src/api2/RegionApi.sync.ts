import { transformGeo } from './GeoApi.transform.sync'
import StateApi from './StateApi.sync'

const mnBwca = require('static/data/v3/mn/upper-superior.topo.json')
const mnDriftless = require('static/data/v3/mn/driftless.topo.json')
const mnLowerSuperior = require('static/data/v3/mn/lower-superior.topo.json')
const mnMetro = require('static/data/v3/mn/metro.topo.json')

const wiDriftlessCentral = require('static/data/v3/wi/driftless-central.topo.json')
const wiDriftlessLower = require('static/data/v3/wi/driftless-lower.topo.json')
const wiDriftlessUpper = require('static/data/v3/wi/driftless-upper.topo.json')
const wiHighlandHeadwaters = require('static/data/v3/wi/highland-headwaters.topo.json')
const wiHighlandFreestone = require('static/data/v3/wi/highland-freestone.topo.json')

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
  public getRegionData(stateName, regionName) {
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
