const path = require('path')
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: resolve('src'),

  entry: {
    background: './@BrowserEntries/Background',
    content: './@BrowserEntries/Content',
    // vocabulary: './@BrowserEntries/NewVocabularyBook',
    // popup: './@BrowserEntries/Popup'
  },

  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    plugins: [new TsConfigPathsPlugin()],
    alias: {
      '@styles': resolve('src/styles/')
  },
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../dist/[name].css'),

    new CheckerPlugin(),

    // new HtmlWebpackPlugin({
    //   filename: resolve('dist/Popup.html'),
    //   chunks: ['popup'],
    //   template: '@BrowserEntries/Popup.html',
    //   inject: false
    // }),

    // new HtmlWebpackPlugin({
    //   filename: resolve('dist/NewVocabularyBook.html'),
    //   chunks: ['vocabulary'],
    //   template: '@BrowserEntries/NewVocabularyBook.html',
    //   inject: false
    // }),

    new CopyWebpackPlugin([
      {
        from: 'manifest.json',
        to: resolve('dist')
      },
      {
        from: 'fonts',
        to: resolve('dist/fonts')
      },
      {
        from: 'assets',
        ignore: ['toast.jpg', 'new-vocabulary-book.jpg', 'presentation.gif', 'dadda.jpg'],
        to: resolve('dist/assets')
      },
      {
        from: 'assets/logo.png',
        to: resolve('dist')
      }
    ])
  ],

  performance: {
    hints: false
  }
}
