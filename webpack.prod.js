const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.s?[ac]ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CompressionPlugin({
      test: /\.js$|\.css$/,
      asset: '[path].gz[query]',
      exclude: /node_modules/,
      algortithm: 'gzip',
      threshhold: 10240,
      minRatio: 0.8
    }),
    new MiniCssExtractPlugin({
      fileName: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ],
    // rules: [
    //   {
    //     test: /\.s?[ac]ss$/,
    //     loader: 'style-loader!css-loader!sass-loader'
    //   }
    // ]
  }
})
