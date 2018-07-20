const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      asset: '[path].gz[query]',
      exclude: /node_modules/,
      algortithm: 'gzip',
      threshhold: 10240,
      minRatio: 0.8
    }),
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
