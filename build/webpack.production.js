const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')

const productionConfig = merge(baseWebpackConfig, {
  mode: 'production'
})

module.exports = productionConfig
