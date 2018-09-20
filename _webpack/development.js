const merge = require('webpack-merge')
const baseWebpackConfig = require('./base')
const webpack = require('webpack')

const devConfig = merge(baseWebpackConfig, {
  mode: 'development',
  
  watch: true,

  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: false
    })
  ],  

  devtool: 'cheap-module-eval-source-map'
})

module.exports = devConfig
