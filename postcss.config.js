const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssWebpackConfig = {
  test: /\.css$/,
  use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
}

const scssWebpackConfig = {
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
}

module.exports = env => ({
  module: {
    rules: [scssWebpackConfig],
  },
})
