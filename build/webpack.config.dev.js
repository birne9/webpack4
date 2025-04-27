// 合并基础配置
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const { resolve } = require("path");
// 生产环境配置
const devConfig = {
  mode: 'development',
  // 开发服务器配置
  // 特点：1.自动编译 2.不刷新浏览器 3.实时、双向的通信功能，只会在内存中编译打包，不会输出文件
  // 启动devServe指令为：webpack-dev-server
 devServer: {
   compress: true,// 是否启用gzip压缩
   port: 8080,// 端口号
   host: 'localhost',// 主机
   open: true,// 自动打开浏览器
 }
}
// 合并配置
module.exports = merge(baseConfig, devConfig)