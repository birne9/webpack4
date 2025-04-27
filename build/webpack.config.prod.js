// 合并基础配置
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

// 生产环境配置
const prodConfig = {
    // 生产环境 会自动压缩js代码
  mode: 'production',
  performance: {
    hints: 'warning', // 或 'error'
    maxAssetSize: 500000, // 阈值（单位：字节）
    maxEntrypointSize: 500000
  },
  stats: {
    // 核心配置
    assets: true,          // 显示资源文件名和大小
    entrypoints: false,     // 显示入口文件信息
    chunks: false,          // 显示代码块（Chunks）信息
    chunkGroups: false,     // 显示代码块分组（如异步加载的 Chunk）
    chunkModules: true,    // 显示 Chunk 中的模块信息
    modules: false,        // 关闭模块列表（避免信息过多）
    children: true,       // 关闭子编译信息（如使用其他语言时的子进程）

    // 附加信息
    builtAt: false,         // 显示构建时间
    timings: true,         // 显示耗时
    version: false,         // 显示 Webpack 版本
    hash: true,            // 显示构建哈希值
    warnings: true,        // 显示警告
    errors: true,          // 显示错误

    // 格式化选项
    colors: true,          // 启用颜色输出
  },
}
// 合并配置
module.exports = merge(baseConfig, prodConfig)