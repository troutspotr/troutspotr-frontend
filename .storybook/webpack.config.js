const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const developmentWebpackConfig = require('../config/webpack.config.dev')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { preactAliases } = require('../config/preactAliases')

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)
  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
  })

  // in this house we respect and appreciate preact
  config.resolve.alias = {
    ...preactAliases,
  }
  config.module.rules.push({
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
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
        },
      },
    ],
  })
  config.module.rules.push({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 2,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
        'sass-loader',
      ],
    }),
  })

  config.resolve.extensions.push('.ts', '.tsx')
  // config.plugins.unshift(new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }))
  return config
}
