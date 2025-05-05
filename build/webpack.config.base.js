// 引入path模块，用来拼接路径
const { resolve } = require("path");

// 清理旧哈希文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 处理html文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 单独打包css文件插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 判断环境变量
const isProduction = process.env.NODE_ENV === 'production';
// css公共代码抽取
const commonCssLoader = [
  // 用 MiniCssExtractPlugin.loader 替代 style-loader
  isProduction
    ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: "../", //关键是这里，不然打包后的css文件找不到图片资源
        },
      }
    : "style-loader",
  "css-loader",
  /*
     css兼容性处理：postcss 找到package.json中browserslist字段，
     配置指定的兼容性浏览器，通过配置加载指定的css兼容性样式
  */
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          ["postcss-preset-env"], // 启用自动前缀
        ],
      },
    },
  },
];
// 时间戳
const timestamp = new Date().getTime();
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js", //   path:resolve(__dirname,'../dist'),
    path: resolve(__dirname, "../dist"), // 打包后的文件路径
  },
  module: {
    rules: [
      /*
        语法检查：js中不能有语法错误，否则会打包失败
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
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
              limit: 8 * 1024, // 小于 8KB 的图片转为 Base64
              name: `[name].[contenthash:8].${timestamp}.[ext]`, // 输出文件名格式
              outputPath: "images", // 图片文件输出目录（如 dist/images）
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
              name: `[name].[contenthash:8].${timestamp}.[ext]`, // 输出文件名格式
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
            loader: "file-loader",
            options: {
              name: `[name].[contenthash:8].${timestamp}.[ext]`, // 输出文件名格式
              outputPath: "assets", // 资源输出目录（如 dist/assets）
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 单独打包css文件插件
    isProduction &&
      new MiniCssExtractPlugin({
        filename: `css/[name].[contenthash:8].${timestamp}.css`, // 输出文件名格式
      }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true, // 折叠空白区域
        removeComments: true, // 删除注释
        removeAttributeQuotes: true, // 删除属性的引号
      },
    }),
    new OptimizeCSSAssetsPlugin(),
  ].filter(Boolean),
  mode: "production",
};
