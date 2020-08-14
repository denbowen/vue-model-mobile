// devServer的代理配置
module.exports = {
  '/test': {
    target: 'https://www.baidu.com',
    changeOrigin: true,
  },
}