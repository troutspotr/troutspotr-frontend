const _ = require('lodash')
const interceptor = require('express-interceptor')
const cheerio = require('cheerio')
const TwitterSeo = require('./TwitterSeo')
const OpenGraphSeo = require('./OpenGraphSeo')
const parseUrl = require('./ParseUrl')
const createSeoInterceptor = function (siteMapDictionary) {
  return interceptor((req, res) => ({
    // Only HTML responses will be intercepted
    'isInterceptable' () {
      const contentType = res
      if (contentType == null || contentType.req == null || contentType.req.originalUrl.indexOf('.json') >= 0) {
        return false
      }

      return (/text\/html/).test(res.get('Content-Type'))
    },
    // Appends a paragraph at the end of the response body
    'intercept': interceptIndex.bind(null, siteMapDictionary, req),
  }))
}

const interceptIndex = function (siteMapDictionary, req, body, send) {
  try {
    const originalUrl = req.originalUrl
    const urlRoute = parseUrl(originalUrl, siteMapDictionary)

    const twitterSeoTags = TwitterSeo(urlRoute)
    const openGraph = OpenGraphSeo(urlRoute)

    const $document = cheerio.load(body)
    updateDocument($document, twitterSeoTags)
    updateDocument($document, openGraph)

    send($document.html())
  } catch (e) {
    console.log(e) // eslint-disable-line
    send(body)
  }
}

const updateDocument = function ($document, metatags) {
  _.forEach(metatags, (value, key) => {
    const id = `#${key}`
    $document(id).attr('content', value)
  })
  return $document
}

module.exports = createSeoInterceptor
