const getImage = function (route, root) {
  var path = route.path
  if (route.streamData != null) {
    return `${root}/images${path}.png`
  }
  return `/apple-touch-icon-180x180.png`
}

module.exports = getImage
