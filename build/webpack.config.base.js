const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const resolve = (dir) => path.join(__dirname, "../", dir);
module.exports = {
  entry: {
    index: "./src/main.js",
  },
  output: {
    path: resolve("dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      }, 
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 指定 HTML 模板文件
      filename: "index.html", // 生成的 HTML 文件名
      inject: "body", // 将 JS 注入到 body 底部
      minify: {
        // 压缩 HTML（可选）
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};
