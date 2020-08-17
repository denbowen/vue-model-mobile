const autoprefixer = require('autoprefixer');

// postcss配置文件
module.exports = {
  plugins: [
    autoprefixer(),
  ],
  'postcss-pxtorem': {
    rootValue: 37.5,
    propList: ['*'],
  },
};
