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

const makeRegionDictionary = async (stateName, regionName, formattedStateData) => {
  var endpoint = buildRegionEndpoint(stateName, regionName)
  var bin = fs.readFileSync(endpoint)
  var json = JSON.parse(bin)
  var regionDictionary = await transformGeo(json, formattedStateData)
  var streamObjects = _.values(regionDictionary.streamDictionary)
  var slugDictionary = _.keyBy(streamObjects, 'stream.properties.slug')
  return {
    id: regionName,
    data: slugDictionary
  }
}

const stateNames = getDirectories('src/static/data/v2/')
var dictionary = {}
var putStuffIntoTheDictionary = async () => {
  for (var i = 0; i < stateNames.length; i++) {
    let stateName = stateNames[i]
    console.log(`CONSTRUCTING DATA FOR STATE NAMED ${stateName}`)
    var stateEndpoint = buildStateEndpoint(stateName)
    var stateJson = JSON.parse(fs.readFileSync(stateEndpoint, 'utf8'))
    var formattedData = formatStateData(stateJson)

    var regionNames = _.keys(stateJson.regionIndex)

    var regions = await Promise.all(regionNames.map(regionName => {
      return makeRegionDictionary(stateName, regionName, formattedData)
    }))

    console.log('done.')

    var keyedRegions = _.keyBy(regions, 'id')
    dictionary[stateName] = {
      data: formattedData,
      regions: keyedRegions
    }
  }

  return dictionary
}

const getSiteDictionary = async () => {
  return await putStuffIntoTheDictionary()
  // return new Promise((resolve, reject) => {
  //   resolve(dictionary)
  // })
}

module.exports = getSiteDictionary
