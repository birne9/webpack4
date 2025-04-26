// 合并基础配置
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

// 生产环境配置
const prodConfig = {
  mode: 'development',
}
// 合并配置
module.exports = merge(baseConfig, prodConfig)