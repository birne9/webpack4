const { resolve } = require("path");

// 处理html文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonCssLoader = ["style-loader","css-loader"];
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

      // 处理图片资源
      // 问题：默认处理不了html中image的图片
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于 8KB 的图片转为 Base64
              name: "[name].[hash:8].[ext]", // 输出文件名格式
              outputPath: "images", // 字体文件输出目录（如 dist/fonts）
            },
          },
        ],
      },
      // 处理html中img图片
      {
        test: /\.html$/,
        use: ["html-loader"],
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
            },
          },
        ],
      },
       // 其他资源（视频、PDF、音频等）
       {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|pdf|docx?|xlsx?|zip|rar)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]', // 输出文件名格式
              outputPath: 'assets', // 资源输出目录（如 dist/assets）
          },}
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
