import getSiteDictionary from '../server/GetSiteDictionary'
import saveStreamAsPng from './StreamToPng'
import _ from 'lodash'
const async = require('async')
const Promise = require('bluebird')
const mkdirp = Promise.promisifyAll(require('mkdirp'))

const saveRegionImages = (path, region, imageGenerator) => {
  const streams = _.values(region)
  const svgs = async.map(
    streams,
    (s, cb) => {
      imageGenerator(s, path)
      cb(null, null)
    },
    (err, results) => {
      if (err) {
        console.log(err) // eslint-disable-line
      } else {
        console.log('finished', path) // eslint-disable-line
      }
    })
  return svgs
}

const renderStreamAsPng = async (streamData, directory = './images') => {
  return saveStreamAsPng(streamData, directory)
}

const saveImages = async (stateData, region, regionName, statePath) => {
  const path = `${statePath}/${regionName}`
  await mkdirp.mkdirpAsync(path)
  saveRegionImages(path, region, renderStreamAsPng)
}
const rootImageDirectory = `./src/static/images`

const SaveThemAll = async (root) => {
  await mkdirp.mkdirpAsync(root)
  const siteDictionary = await getSiteDictionary()
  _.forEach(siteDictionary, async (state, stateName) => {
    const {data, regions} = state
    const statePath = `${root}/${stateName}`
    await mkdirp.mkdirpAsync(statePath)
    _.forEach(regions, (region, regionName) => {
      saveImages(data, region.data, regionName, statePath)
    })
  })
}

SaveThemAll(rootImageDirectory)
