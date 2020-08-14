const path = require('path')
const {DllPlugin} = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue', 'vue-router', 'vuex'],
  },
  output: {
    filename: '[name].[contenthash].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json') // 用这个插件来分析打包后的这个库，把库里的第三方映射关系放在了这个 json 的文件下，这个文件在 dll 目录下
    })
  ]
}
