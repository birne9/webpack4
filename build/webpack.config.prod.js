// 合并基础配置
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

// 生产环境配置
const prodConfig = {
    // 生产环境 会自动压缩js代码
  mode: 'production',
}
// 合并配置
module.exports = merge(baseConfig, prodConfig)