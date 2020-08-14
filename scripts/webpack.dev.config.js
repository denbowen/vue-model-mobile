const merge = require('webpack-merge')
const path = require('path')
const os = require('os')

const baseConfig = require('./webpack.base.config')
const proxyConfig = require('./config/proxy')

/**
 * 获取本机的ip地址
 * @returns {string}
 */
const getIPAddress = () => {
  let interfaces = os.networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
const myHost = getIPAddress()

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map', // 调试源码
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    host: myHost,
    port: 8222,
    open: true,
    hot: true,
    overlay: true,
    proxy: proxyConfig,
    historyApiFallback: true
  }
})
