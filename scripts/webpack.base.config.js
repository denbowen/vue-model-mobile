const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { DllReferencePlugin } = require('webpack');
const os = require('os');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 线程数量

const JS_LOADER_ID = 'js'; // happyPack打包js的配置id

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
const plugins = files.map((file) => {
  if (/.*\.dll.js/.test(file)) {
    return new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file),
    });
  }
  if (/.*\.manifest.json/.test(file)) {
    return new DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file),
    });
  }
});

/**
 * 基本配置
 * @type {{output: {chunkFilename: string, path: string, filename: string}, entry: {app: string}, plugins: *[], module: {rules: *[]}}}
 */
module.exports = {
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@src': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader',
            options: {
              id: JS_LOADER_ID,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // 小于 10kB(10240字节）的内联文件
          limit: 10 * 1024,
          // 移除 url 中的引号
          // (在大多数情况下它们都不是必要的)
          noquotes: true,
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 10000, // size <= 10KB
              outputPath: 'images/',
            },
          },
          // 图片压缩
          {
            loader: 'image-webpack-loader',
            options: {
              // 压缩 jpg/jpeg 图片
              mozjpeg: {
                progressive: true,
                quality: 50, // 压缩率
              },
              // 压缩 png 图片
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack',
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'index.html'),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(),
    new HappyPack({
      id: JS_LOADER_ID,
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
    }),
    ...plugins,
  ],
};
