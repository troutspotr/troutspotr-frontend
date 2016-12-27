var toc = require('../src/static/data/v1/TableOfContents.topo.json')
var minnesota = require('../src/static/data/v1/mn/mn.data.json')
// var StateApi = require('../src/api/StateApi')
var formatStateData = require('../src/api/FormatStateData')
var transform = require('../src/api/GeoApi.transform')
var transformGeo = transform.transformGeo
// var async = require("async")
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
var _ = require('lodash')

const buildEndpoint = (stateName, regionName) => {
  return `src/static/data/v1/${stateName}/${regionName}.topo.json`
}

var formattedStateData = formatStateData(minnesota)
var regionNames = toc.objects.region.geometries.map(function (g) {
  return g.properties.name.toLocaleLowerCase()
})

console.log(regionNames)

// let endpoints = regionNames.map(r => { buildEndpoint('mn', r) })
var pullRegionsFromRegionNames = regionNames.map(regionName => {
  var endpoint = buildEndpoint('mn', regionName)
  console.log(endpoint)
  return fs.readFileAsync(endpoint)
    .then(bin => {
      var json = JSON.parse(bin)
      var regionDictionary = transformGeo(json, formattedStateData)
      // console.log('region dictionary', regionDictionary)
      return {
        id: regionName,
        data: regionDictionary
      }
    })
})

var gettingAllRegions = Promise.all(pullRegionsFromRegionNames)

const getSiteDictionary = () => {
  var dictionary = {
    'mn': {
      data: formattedStateData,
      regions: {

      }
    }
  }

  return gettingAllRegions.then(allRegions => {
    dictionary.mn.regions = _.keyBy(allRegions, 'id')
    return dictionary
  })
}

module.exports = getSiteDictionary
