const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 8001,
    compress: true,
    publicPath: '/',
    historyApiFallback: {
      index: "/"
    }
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
})
