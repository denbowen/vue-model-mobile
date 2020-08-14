const os = require('os');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 线程数
const THREAD_COUNT = os.cpus().length;

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunckhash].js',
    publicPath: './',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启缓存
        parallel: THREAD_COUNT, // 多线程
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[contenthash:8].css',
    }),
  ],
});
