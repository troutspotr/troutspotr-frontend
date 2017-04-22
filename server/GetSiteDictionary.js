var formatStateData = require('../src/api/FormatStateData')
var transform = require('../src/api/GeoApi.transform')
var transformGeo = transform.transformGeo
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
var _ = require('lodash')
const path = require('path')

const buildRegionEndpoint = (stateName, regionName) => {
  return `src/static/data/v2/${stateName}/${regionName}.topo.json`
}

const buildStateEndpoint = (stateName) => {
  return `src/static/data/v2/${stateName}/${stateName}.data.json`
}

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

const makeRegionDictionary = (stateName, regionName, formattedStateData) => {
  var endpoint = buildRegionEndpoint(stateName, regionName)
  var bin = fs.readFileSync(endpoint)
  var json = JSON.parse(bin)
  var regionDictionary = transformGeo(json, formattedStateData)
  var streamObjects = _.values(regionDictionary.streamDictionary)
  var slugDictionary = _.keyBy(streamObjects, 'stream.properties.slug')
  return {
    id: regionName,
    data: slugDictionary
  }
}

console.log('getting directories of all states')
const stateNames = getDirectories('src/static/data/v2/')
console.log('state names: ', stateNames)

var dictionary = stateNames.reduce((dictionary, stateName) => {
  console.log('doin thangs', stateName)
  var stateEndpoint = buildStateEndpoint(stateName)
  var stateJson = JSON.parse(fs.readFileSync(stateEndpoint, 'utf8'))
  console.log('did some more thangs', stateJson == null)
  var formattedData = formatStateData(stateJson)

  var regionNames = _.keys(stateJson.regionIndex)
  console.log('got yo regions ', regionNames)

  var regions = regionNames.map(regionName => {
    return makeRegionDictionary(stateName, regionName, formattedData)
  })

  console.log('almost done')
  var keyedRegions = _.keyBy(regions, 'id')
  dictionary[stateName] = {
    data: formattedData,
    regions: keyedRegions
  }

  return dictionary
}, {})

const getSiteDictionary = () => {
  console.log('getting site dictionary')
  return dictionary
}

module.exports = getSiteDictionary
