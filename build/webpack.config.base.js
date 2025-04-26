const { resolve } = require("path");

module.exports = {
  // 入口起点
  entry: "./src/main.js",

  // 输出
  output: {
    // 输入文件名
    filename: "bundle.js",
    // 输出路径
    // __dirname node.js的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, "../dist"),
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader的配置
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        //    use 数组中loader执行顺序：从右到左、从下到上、 依次执行
        use: [
          // 创建style标签，将js中的样式资源插入行，添加到head 中生效
          "style-loader",
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          "css-loader",
        ],
      },

      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        //    use 数组中loader执行顺序：从右到左、从下到上、 依次执行
        use: [
          // 创建style标签，将js中的样式资源插入行，添加到head 中生效
          "style-loader",
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          "css-loader",
          //   将less文件编译成css文件
          "less-loader",
        ],
      },
    ],
  },
  // 插件的配置
  plugins: [],
  // 模式
  mode: "development",
};
