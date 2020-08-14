const path = require('path');

const webpackPath = path.join(__dirname, './scripts/webpack.base.config');

module.exports = {
  // 根目录往上不再查找
  root: true,
  env: {
    // 添加browser和es6的环境
    browser: true,
    es6: true,
    node: true,
  },
  // eslint解析器
  parser: 'vue-eslint-parser',
  // 使用语言及版本
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  // 关键：启用 airbnb 规则
  extends: [
    'eslint:recommended',
    'plugin:vue/base',
    'airbnb-base',
  ],
  // 插件
  plugins: [
    'vue',
    'import',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: webpackPath,
      },
    },
  },
  // 个人自定义规则
  rules: {
    'no-new': 0,
    'max-len': 0,
    'quote-props': 0,
    'prefer-promise-reject-errors': 0,
    'import/extensions': 0,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': [
      2,
      {
        commonjs: true,
        amd: true,
        ignore: ['^@/'],
      }
    ],
  },
};
