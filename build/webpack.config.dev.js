// 合并基础配置
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

// 生产环境配置
const devConfig = {
  mode: 'development',
}
// 合并配置
module.exports = merge(baseConfig, devConfig)