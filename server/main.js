const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const history = require('connect-history-api-fallback')
const app = express()
const paths = config.utils_paths
const compress = require('compression')
const createSeoInterceptor = require('./Interceptor')
const GetSiteDictionary = require('./GetSiteDictionary')
const _ = require('lodash')
app.use(compress())
const env = process.env.NODE_ENV || 'development'
const forceSsl = function (req, res, next) {
  if (env !== 'production') {
    return next()
  }

  if (req.headers['x-forwarded-proto'] !== 'https') {
    const newAddress = [
      'https://',
      req.get('Host'),
      req.url,
    ].join('')
    return res.redirect(newAddress)
  }
  return next()
}

const createServer = function (dictionary, app) {
  app.use(forceSsl)
  const seoInterceptor = createSeoInterceptor(dictionary)
  app.use(seoInterceptor)

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // Rendering, you'll want to remove this middleware.
  app.use(history({
    // DisableDotRule: true,
    'verbose': true,
    'rewrites': [
      {
        'from': /@/,
        'to' (context) {
          const containsImage = context.parsedUrl.pathname.indexOf('.jpg') >= 10
          if (containsImage) {
            return context.parsedUrl.pathname
          }

          return '/index.html'
        },
      },
    ],
  }))

  // ------------------------------------
  // Apply Webpack HMR Middleware
  // ------------------------------------
  if (config.env === 'development') {
    const compiler = webpack(webpackConfig)

    debug('Enable webpack dev and HMR middleware')
    app.use(require('webpack-dev-middleware')(compiler, {
      'publicPath': webpackConfig.output.publicPath,
      'contentBase': paths.client(),
      'hot': true,
      'quiet': config.compiler_quiet,
      'noInfo': config.compiler_quiet,
      'lazy': false,
      'stats': config.compiler_stats,
    }))

    app.use(require('webpack-hot-middleware')(compiler))
    // Serve static assets from ~/src/static since Webpack is unaware of
    // These files. This middleware doesn't need to be enabled outside
    // Of development since this directory will be copied into ~/dist
    // When the application is compiled.

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
    // The web server and not the app server, but this helps to demo the
    // Server in production.
    app.use(express.static(paths.dist()))
  }
}

const startTheMusic = async () => {
  const siteDictionary = await GetSiteDictionary()
  const states = _.keys(siteDictionary)
  if (states.length !== 2) {
    return Promise.reject(`something bad happened - not enough states. Found ${states.length}`)
  }

  createServer(siteDictionary, app)
}

startTheMusic()

module.exports = app
