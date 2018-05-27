const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { preactAliases } = require('../config/preactAliases')
const paths = require('../config/paths')
// TODO: this was a giant pain in the ass, and this should be moved to /config tbh
const postCSSLoaderOptions = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  sourceMap: true,
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ],
}

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend it as you need.
  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: paths.appSrc,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
      },
    ],
  })

  defaultConfig.module.rules.push({
    test: /\.scss$/,
    exclude: /\.global\.scss$/,
    use: [
      require.resolve('css-hot-loader'),
      require.resolve('style-loader'),
      {
        // hail mary full of grace
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          importLoaders: 2,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: postCSSLoaderOptions,
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          sourceMap: true,
        },
      },
    ],
  })

  defaultConfig.resolve.extensions.push('.ts', '.tsx')
  // config.plugins.unshift(new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }))
  return defaultConfig
}
