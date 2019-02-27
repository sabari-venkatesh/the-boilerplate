import path from 'path';
import glob from 'glob';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Reads `views` directory for `pug` files and inputs them to HTMLWebpackPlugin to generate corresponding `html` files
const generateHTMLPlugins = () => glob.sync('./src/*.pug').map(dir => {
  const fileName = path.basename(dir).split('.')[0];
  return new HtmlWebpackPlugin({
    filename: `${fileName}.html`,
    title: `Hello ${fileName}`,
    template: path.resolve(__dirname, dir),
  });
});

const config = {
  context: path.resolve(__dirname, 'src'),
  node: {
    fs: 'empty',
  },
  entry: {
    app: ['./scripts/app.js', './styles/app.scss']
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: ['/node_modules/'],
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      }]
    }, {
      test: /\.pug$/,
      exclude: ['/node_modules/'],
      use: ['pug-loader?pretty=true']
    }]
  },
  output: {
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    ...generateHTMLPlugins(),
  ],
  stats: {
    colors: true,
  },
}

export default config;