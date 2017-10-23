const _ = require('lodash')
const url = require('url')

const parseUrl = function (path, dictionary) {
  const route = getRoute(path)
  if (_.isEmpty(route.state) === false && _.has(dictionary, route.state)) {
    route.stateData = dictionary[route.state].data
  } else {
    // BAIL!
    return route
  }

  if (_.isEmpty(route.stateData) === false &&
      _.isEmpty(route.region) === false &&
      _.has(dictionary[route.state].regions, route.region)) {
    route.regionData = dictionary[route.state].regions[route.region].data
  } else {
    return route
  }

  if (_.isEmpty(route.regionData) === false &&
      _.isEmpty(route.stream) === false &&
      _.has(route.regionData, route.stream)) {
    route.streamData = route.regionData[route.stream]
  }

  return route
}

const getRoute = function (path) {
  const result = {
    'state': '',
    'region': '',
    'stream': '',
    path,
  }

  const parsedUrl = url.parse(path)
  const pathname = parsedUrl.pathname

  const items = pathname.split('/')
    .filter((x) => x.length > 0)

  if (items.length >= 3) {
    result.stream = items[2]
  }

  if (items.length >= 2) {
    result.region = items[1]
  }

  if (items.length >= 1) {
    result.state = items[0]
  }

  return result
}

module.exports = parseUrl
