const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const webpack = require('webpack')

const productionConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})

module.exports = productionConfig
