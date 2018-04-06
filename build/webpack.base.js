const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractTranslatorCSS = new ExtractTextPlugin('../dist/styles/translator.css')
const extractVocabularyCSS = new ExtractTextPlugin('../dist/styles/vocabulary.css')
const extractPopupCSS = new ExtractTextPlugin('../dist/styles/popup.css')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: resolve('src'),
  entry: {
    background: './chrome/background/background',
    content: './chrome/content/content',
    options: './chrome/options/options',
    popup: './chrome/popup/popup'
  },
  output: {
    path: resolve('dist'),
    filename: '[name]/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /translator\.scss$/,
        use: extractTranslatorCSS.extract({
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /vocabulary\.scss$/,
        use: extractVocabularyCSS.extract({
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /popup\.scss$/,
        use: extractPopupCSS.extract({
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cacheBusting: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
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
    extractTranslatorCSS,
    extractPopupCSS,
    extractVocabularyCSS,

    new HtmlWebpackPlugin({
      filename: resolve('dist/popup/popup.html'),
      chunks: ['popup'],
      template: 'chrome/popup/popup.html',
      inject: false
    }),

    new HtmlWebpackPlugin({
      filename: resolve('dist/options/options.html'),
      chunks: ['options'],
      template: 'chrome/options/options.html',
      inject: false
    }),

    new CopyWebpackPlugin([
      {
        from: 'manifest.json',
        to: resolve('dist')
      },
      {
        from: 'logo.png',
        to: resolve('dist')
      },
      {
        from: 'fonts',
        to: resolve('dist/fonts')
      },
      {
        from: 'assets',
        ignore: ['toast.jpg', 'vocabulary.jpg', 'presentation.gif'],
        to: resolve('dist/assets')
      }
    ])
  ]
}
