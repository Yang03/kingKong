const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
            {loader:'style-loader'},
            {loader:'css-loader'},
            {loader: 'postcss-loader', options:{path:'./client/postcss.config.js'}}
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }  
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: { 'vue': 'vue/dist/vue.js' }
  },
  plugins: [
    new ExtractTextPlugin({
            filename: 'style.css',
            publicPath: path.resolve(__dirname, 'dist')
        }
    ),
    new NpmInstallPlugin()
  ],
  devServer: {
    // historyApiFallback: true,
    // disableHostCheck: true,
    // noInfo: true,
    historyApiFallback: true,
    stats: "minimal",
    proxy: {
      "/api/**": {
        target: "http://127.0.0.1:7001",
        secure: true
        // pathRewrite: {
        //   '^/api': ''
        //   }
      }
    }
  },
  devtool: '#eval-source-map'
}
