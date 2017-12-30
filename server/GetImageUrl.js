const getImage = function (route, root) {
  const path = route.path
  if (route.streamData != null) {
    return `${root}/images${path}.jpg`
  }
  return `/apple-touch-icon-180x180.png`
}

module.exports = getImage
