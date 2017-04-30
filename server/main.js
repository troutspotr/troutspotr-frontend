const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const history = require('connect-history-api-fallback')
const app = express()
const paths = config.utils_paths
var compress = require('compression')
const createSeoInterceptor = require('./Interceptor')
const GetSiteDictionary = require('./GetSiteDictionary')
const _ = require('lodash')
app.use(compress())
var env = process.env.NODE_ENV || 'development'
var forceSsl = function (req, res, next) {
  if (env !== 'production') {
    return
  }

  if (req.headers['x-forwarded-proto'] !== 'https') {
    let newAddress = ['https://', req.get('Host'), req.url].join('')
    return res.redirect(newAddress)
  }
  return next()
}

const createServer = function (dictionary, app) {
  app.use(forceSsl)
  var seoInterceptor = createSeoInterceptor(dictionary)
  app.use(seoInterceptor)

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use(history({
    // disableDotRule: true,
    verbose: true,
    rewrites: [
      {
        from: /@/,
        to: function (context) {
          let containsImage = context.parsedUrl.pathname.indexOf('.jpg') >= 10
          if (containsImage) {
            return context.parsedUrl.pathname
          }

          return '/index.html'
        }
        // to: '/index.html'
      }
    ]
  }))

  // ------------------------------------
  // Apply Webpack HMR Middleware
  // ------------------------------------
  if (config.env === 'development') {
    const compiler = webpack(webpackConfig)

    debug('Enable webpack dev and HMR middleware')
    console.log('public path at ', webpackConfig.output.publicPath)
    console.log('listening at ', paths.client())
    app.use(require('webpack-dev-middleware')(compiler, {
      publicPath  : webpackConfig.output.publicPath,
      contentBase : paths.client(),
      hot         : true,
      quiet       : config.compiler_quiet,
      noInfo      : config.compiler_quiet,
      lazy        : false,
      stats       : config.compiler_stats
    }))

    app.use(require('webpack-hot-middleware')(compiler))
    // Serve static assets from ~/src/static since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.

    app.use(express.static(paths.client('static')))
  } else {
    debug(
      'Server is being run outside of live development mode, meaning it will ' +
      'only serve the compiled application bundle in ~/dist. Generally you ' +
      'do not need an application server for this and can instead use a web ' +
      'server such as nginx to serve your static files. See the "deployment" ' +
      'section in the README for more information on deployment strategies.'
    )

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
    app.use(express.static(paths.dist()))
  }
}

var startTheMusic = async () => {
  var siteDictionary = await GetSiteDictionary()
  console.log('starting this dance')
  console.log(siteDictionary)
  let states = _.keys(siteDictionary)
  if (states.length !== 2) {
    return Promise.reject('something bad happened - not enough states. Found ' + states.length)
  }

  console.log('states: ', _.keys(siteDictionary))
  createServer(siteDictionary, app)
}

startTheMusic()

module.exports = app
