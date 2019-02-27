import path from 'path';
import merge from 'webpack-merge';
import common from './webpack.common.babel';
import webpack from 'webpack';

const config = {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: 'src',
    watchContentBase: true,
    stats: 'errors-only',
    historyApiFallback: true,
    hotOnly: true,
    open: true,
    port: process.env.PORT || 9000,
    host: process.env.HOST || 'localhost',
  },
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name]-[hash:4].[ext]',
          fallback: 'file-loader'
        }
      }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}

export default merge(common, config);