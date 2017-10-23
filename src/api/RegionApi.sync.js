import StateApi from './StateApi.sync'
import {transformGeo} from './GeoApi.transform.sync'

import mnBwca from 'static/data/v2/mn/bwca.topo.json'
import mnDriftless from 'static/data/v2/mn/driftless.topo.json'
import mnLowerSuperior from 'static/data/v2/mn/lower-superior.topo.json'
import mnMetro from 'static/data/v2/mn/metro.topo.json'

import wiDriftlessCentral from 'static/data/v2/wi/driftless-central.topo.json'
import wiDriftlessLower from 'static/data/v2/wi/driftless-lower.topo.json'
import wiDriftlessUpper from 'static/data/v2/wi/driftless-upper.topo.json'
import wiHighlandHeadwaters from 'static/data/v2/wi/highland-headwaters.topo.json'
import wiHighlandFreestone from 'static/data/v2/wi/highland-freestone.topo.json'

const dictionary = {
  mn: {
    'bwca': mnBwca,
    'driftless': mnDriftless,
    'lower-superior': mnLowerSuperior,
    'metro': mnMetro,
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
  getRegionData (stateName, regionName) {
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
