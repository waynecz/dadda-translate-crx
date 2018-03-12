const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')

const devConfig = merge(baseWebpackConfig, {
  mode: 'development',
  watch: true
})

module.exports = devConfig
