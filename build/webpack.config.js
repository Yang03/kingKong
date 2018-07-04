const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
    entry: {
        home: './app/resource/asset/home.js'
    },
    output: {
      path: path.resolve(__dirname, '../app/public/asset'),
      publicPath: '/asset/',
      filename: '[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new ManifestPlugin()
    ],
    devtool: '#eval-source-map'
  }
