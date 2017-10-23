const formatStateData = require('../src/api/FormatStateData')
const transform = require('../src/api/GeoApi.transform')
const transformGeo = transform.transformGeo
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const _ = require('lodash')
const path = require('path')

const buildRegionEndpoint = (stateName, regionName) => `src/static/data/v2/${stateName}/${regionName}.topo.json`

const buildStateEndpoint = (stateName) => `src/static/data/v2/${stateName}/${stateName}.data.json`

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter((file) => fs.statSync(path.join(srcpath, file)).isDirectory())
}

const makeRegionDictionary = async (stateName, regionName, formattedStateData) => {
  const endpoint = buildRegionEndpoint(stateName, regionName)
  const bin = fs.readFileSync(endpoint)
  const json = JSON.parse(bin)
  const regionDictionary = await transformGeo(json, formattedStateData)
  const streamObjects = _.values(regionDictionary.streamDictionary)
  const slugDictionary = _.keyBy(streamObjects, 'stream.properties.slug')
  return {
    'id': regionName,
    'data': slugDictionary,
  }
}

const stateNames = getDirectories('src/static/data/v2/')
const dictionary = {}
const putStuffIntoTheDictionary = async () => {
  for (let i = 0; i < stateNames.length; i++) {
    const stateName = stateNames[i]
    const stateEndpoint = buildStateEndpoint(stateName)
    const stateJson = JSON.parse(fs.readFileSync(stateEndpoint, 'utf8'))
    const formattedData = formatStateData(stateJson)

    const regionNames = _.keys(stateJson.regionIndex)

    const regions = await Promise.all(regionNames.map((regionName) => makeRegionDictionary(stateName, regionName, formattedData)))

    const keyedRegions = _.keyBy(regions, 'id')
    dictionary[stateName] = {
      'data': formattedData,
      'regions': keyedRegions,
    }
  }

  return dictionary
}

const getSiteDictionary = async () =>
  await putStuffIntoTheDictionary()
module.exports = getSiteDictionary
