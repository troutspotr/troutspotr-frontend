var async = require('async')
import saveStreamAsSvg from './StreamToSvg'
import saveStreamAsPng from './StreamToPng'
import _ from 'lodash'
var Promise = require('bluebird')
// var fs = Promise.promisifyAll(require('fs'))
var mkdirp = Promise.promisifyAll(require('mkdirp'))

import { getSiteDictionary } from './getSiteDictionary'

const saveRegionImages = (path, region, imageGenerator) => {
  let streams = _.values(region.streamDictionary)
  let svgs = async.map(
    streams,
    (s, cb) => {
      imageGenerator(s, path)
      cb(null, null)
    },
    (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log('finished', path)
      }
    })
  return svgs
}

const renderStreamAsSvg = async (streamData, directory = './images') => {
  return saveStreamAsSvg(streamData, directory)
}

const renderStreamAsPng = async (streamData, directory = './images') => {
  return saveStreamAsPng(streamData, directory)
}

const saveImages = async (stateData, region, regionName, statePath) => {
  // let statePath = `./images/${stateName}`
  let path = `${statePath}/${regionName}`
  await mkdirp.mkdirpAsync(path)

  // saveRegionImages(path, region, renderStreamAsSvg)
  saveRegionImages(path, region, renderStreamAsPng)
}
let rootImageDirectory = `./src/static/images/`

const SaveThemAll = async (root) => {
  await mkdirp.mkdirpAsync(root)
  let siteDictionary = await getSiteDictionary()
  _.forEach(siteDictionary, async (state, stateName) => {
    let { data, regions } = state
    let statePath = `${root}/${stateName}`
    await mkdirp.mkdirpAsync(statePath)
    _.forEach(regions, (region, regionName) => {
      saveImages(data, region.data, regionName, statePath)
    })
  })
}

SaveThemAll(rootImageDirectory)
