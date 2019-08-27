const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const webpack = require('webpack')

const devConfig = merge(baseWebpackConfig, {
  mode: 'development',
  watch: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})

module.exports = devConfig
