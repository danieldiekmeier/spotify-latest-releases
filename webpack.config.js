// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  entry: {
    'client': './src/client.js',
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },

  resolve: {
    alias: {
      views: path.resolve(__dirname, './src/views'),
      components: path.resolve(__dirname, './src/components'),
      images: path.resolve(__dirname, './src/images')
    },
    extensions: ['.js', '.json', '.vue', '*']
  },

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/': 'http://localhost:5000'
    },
    contentBase: path.join(__dirname, './dist'), // boolean | string | array, static file location
    publicPath: '/',
    compress: false, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    inline: true,
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
    // ...
  },

  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg|gif|eot|woff2|woff|otf|ttf)/,
      loader: 'file-loader'
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'file-loader'
      }, {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { removeTitle: true },
            { convertColors: { shorthex: true } },
            { convertPathData: true }
          ]
        }
      }]
    }]
  }
}

const plugins = [
  new webpack.LoaderOptionsPlugin({
    test: /\.(vue|styl)$/,
    stylus: {
      default: {
        use: [require('rupture')()],
        paths: path.join(__dirname, './src/stylus'),
        import: [path.join(__dirname, './src/stylus/import.styl')]
      }
    }
  }),

  new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/templates/template.ejs'),
    // inject: 'head',
    chunksSortMode: 'dependency'
  }),

  // new BundleAnalyzerPlugin()
]

const moreConfig = {
  development: {
    devtool: 'cheap-source-map',
    plugins: [].concat(plugins)
  },

  production: {
    plugins: [].concat(plugins, [
      new CompressionPlugin()
    ])
  }
}

module.exports = Object.assign(
  baseConfig,
  moreConfig[env]
)
