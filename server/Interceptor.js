const _ = require('lodash')
const interceptor = require('express-interceptor')
const cheerio = require('cheerio')
const TwitterSeo = require('./TwitterSeo')
const OpenGraphSeo = require('./OpenGraphSeo')

var createSeoInterceptor = function (siteMapDictionary) {
  return interceptor(function (req, res) {
    return {
      // Only HTML responses will be intercepted
      isInterceptable: function () {
        return /text\/html/.test(res.get('Content-Type'))
      },
      // Appends a paragraph at the end of the response body
      intercept: asdfasdf.bind(null, siteMapDictionary, req)
    }
  })
}

var asdfasdf = function (siteMapDictionary, req, body, send) {
  try {
    var originalUrl = req.originalUrl

    var twitterSeoTags = TwitterSeo(originalUrl)
    var openGraph = OpenGraphSeo(originalUrl)

    var $document = cheerio.load(body)
    updateDocument($document, twitterSeoTags)
    updateDocument($document, openGraph)

    send($document.html())
  } catch (e) {
    console.log(e)
    send(body)
  }
}

// var seoInterceptor = interceptor(function (req, res) {
//   return {
//     // Only HTML responses will be intercepted
//     isInterceptable: function () {
//       return /text\/html/.test(res.get('Content-Type'))
//     },
//     // Appends a paragraph at the end of the response body
//     intercept: function (body, send) {
//       try {
//         var originalUrl = req.originalUrl

//         var twitterSeoTags = TwitterSeo(originalUrl)
//         var openGraph = OpenGraphSeo(originalUrl)

//         var $document = cheerio.load(body)
//         updateDocument($document, twitterSeoTags)
//         updateDocument($document, openGraph)

//         send($document.html())
//       } catch (e) {
//         console.log(e)
//         send(body)
//       }
//     }
//   }
// })

const updateDocument = function ($document, metatags) {
  _.forEach(metatags, function (value, key) {
    $document('#' + key).attr(key, value)
  })
  return $document
}

module.exports = createSeoInterceptor
