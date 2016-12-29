var async = require('async')
// import saveStreamAsSvg from './StreamToSvg'
import saveStreamAsPng from './StreamToPng'
import _ from 'lodash'
var Promise = require('bluebird')
var mkdirp = Promise.promisifyAll(require('mkdirp'))

import getSiteDictionary from '../server/GetSiteDictionary'

const saveRegionImages = (path, region, imageGenerator) => {
  let streams = _.values(region)
  console.log('got the streams', streams.length)
  let svgs = async.map(
    streams,
    (s, cb) => {
      console.log('generating image')
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

// const renderStreamAsSvg = async (streamData, directory = './images') => {
//   return saveStreamAsSvg(streamData, directory)
// }

const renderStreamAsPng = async (streamData, directory = './images') => {
  console.log('trying to save as png')
  return saveStreamAsPng(streamData, directory)
}

const saveImages = async (stateData, region, regionName, statePath) => {
  let path = `${statePath}/${regionName}`
  await mkdirp.mkdirpAsync(path)
  // saveRegionImages(path, region, renderStreamAsSvg)
  console.log('saving images')
  saveRegionImages(path, region, renderStreamAsPng)
}
let rootImageDirectory = `./src/static/images`

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
