const merge = require('webpack-merge')
const baseWebpackConfig = require('./base')

const devConfig = merge(baseWebpackConfig, {
  mode: 'development',
  
  watch: true,

  devtool: 'cheap-module-eval-source-map'
})

module.exports = devConfig
