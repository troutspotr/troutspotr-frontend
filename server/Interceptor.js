const _ = require('lodash')
const interceptor = require('express-interceptor')
const cheerio = require('cheerio')
const TwitterSeo = require('./TwitterSeo')
const OpenGraphSeo = require('./OpenGraphSeo')
const parseUrl = require('./ParseUrl')
const fs = require('fs')
var createSeoInterceptor = function (siteMapDictionary) {
  return interceptor(function (req, res) {
    return {
      // Only HTML responses will be intercepted
      isInterceptable: function () {
        var contentType = res
        console.log('response', contentType.req.originalUrl)
        if (contentType == null || contentType.req == null || contentType.req.originalUrl.indexOf('.json') >= 0) {
          return false
        }

        return /text\/html/.test(res.get('Content-Type'))
      },
      // Appends a paragraph at the end of the response body
      intercept: interceptIndex.bind(null, siteMapDictionary, req)
    }
  })
}

var interceptIndex = function (siteMapDictionary, req, body, send) {
  try {
    var originalUrl = req.originalUrl
    var urlRoute = parseUrl(originalUrl, siteMapDictionary)

    var twitterSeoTags = TwitterSeo(urlRoute)
    var openGraph = OpenGraphSeo(urlRoute)

    var $document = cheerio.load(body)
    updateDocument($document, twitterSeoTags)
    updateDocument($document, openGraph)

    send($document.html())
  } catch (e) {
    console.log(e)
    send(body)
  }
}

const updateDocument = function ($document, metatags) {
  _.forEach(metatags, function (value, key) {
    var id = '#' + key
    console.log(id)
    $document(id).attr('content', value)
  })
  return $document
}

module.exports = createSeoInterceptor
