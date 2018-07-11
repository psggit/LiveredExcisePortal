const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].[hash].css',
    //   chunkFilename: '[id].[hash].css',
    // })
  ],
  module: {
    // rules: [
    //   {
    //     test: /\.s?[ac]ss$/,
    //     use: [
    //       MiniCssExtractPlugin.loader,
    //       'css-loader',
    //       'sass-loader'
    //     ]
    //   }
    // ],
    rules: [
      {
        test: /\.s?[ac]ss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
})
