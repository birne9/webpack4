const { resolve } = require("path");

// 处理html文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonCssLoader = ["css-loader"];
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js", //   path:resolve(__dirname,'../dist'),
    path: resolve(__dirname, "../dist"), // 打包后的文件路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于 8KB 的图片转为 Base64
              name: "[name].[hash:8].[ext]", // 输出文件名格式
              outputPath: "images", // 图片输出目录（相对于 output.path）
              publicPath: "images", // 图片引用路径（相对于 output.publicPath）
            },
          },
        ],
      },
      // 处理字体资源
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:8].[ext]", // 输出文件名格式
              outputPath: "fonts", // 字体文件输出目录（如 dist/fonts）
              publicPath: "../fonts", // 字体引用路径（根据项目结构调整）
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true, // 折叠空白区域
        removeComments: true, // 删除注释
        removeAttributeQuotes: true, // 删除属性的引号
      },
    }),
  ],
  mode: "production",
};
