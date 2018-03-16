// 打包的webpack 配置
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;

const config = {
  entry: {
    // JS文件入口
    '/js/home.js': './public/javascripts/home/index.js',
    // CSS文件入口
    '/css/home.css': './public/stylesheets/home.css',
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name]',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new ExtractTextPlugin({
      filename: '[name]',
      allChunks: true,
      ignoreOrder: true,
    }),
  ],
  externals: {
    jquery: 'window.$',
  },
  module: {
    loaders: [{
        test: /\.js$/,
        include: __dirname,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['latest'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'css-loader?-importLoaders=1',
          use: 'postcss-loader',
        }),
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
      {
        test: /\.node$/,
        use: ['node-loader'],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

module.exports = config;
// 打包的webpack配置