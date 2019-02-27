import merge from 'webpack-merge';
import common from './webpack.common.babel';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const config = {
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      terserOptions: {
        output: {
          comments: /@license/i,
        },
      },
      extractComments: true,
    })],
  },
  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      {
        loader: 'css-loader',
        options: {
          url: true,
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')
          ]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name]-[hash:4].[ext]',
          fallback: 'file-loader'
        }
      }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 50
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 2
            },
            pngquant: {
              quality: '75-90',
              speed: 4
            },
            webp: {
              quality: 75
            }
          }
        }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
    }),
  ],
}

export default merge(common, config);