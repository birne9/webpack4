const { resolve } = require("path");

// 提取css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 //压缩css
 const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 处理html文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 复用css代码

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    // 还需要在package.json中配置browserslist
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        ident: "postcss",
        plugins: [require("postcss-preset-env")()],
      },
    },
  },
];
module.exports = {
  entry: './src/main.js',
  output: {
    filename: "bundle.js", //   path:resolve(__dirname,'../dist'),
    path: resolve(__dirname, "../dist"), // 打包后的文件路径
    clean: true, // 打包前清理dist文件夹
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
      // js兼容性处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // 预设环境变量
                  targets: {
                    chrome: "60",
                    firefox: "50",
                  },
                  useBuiltIns: "usage", // 按需加载
                  corejs: { version: 3 }, // 指定core-js版本
                },
              ],
            ],
          },},
      },
      // 图片处理
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8KB 以下转 Base64
              name: 'images/[name].[hash:8].[ext]',// 图片文件命名
              esModule: false // 关闭 ES 模块语法
            }
          }
        ],
        type: 'javascript/auto' // 禁用 Webpack 5 默认处理
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // 打包字体文件
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash:8][ext][query]",
        },
      },
      // 打包视频文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "media/[hash:8][ext][query]",
        },
      },
      // 打包其他文件
      {
        test: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "files/[hash:8][ext][query]",
        },
      }
     
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),// 提取css文件
    new OptimizeCssAssetsPlugin(),// 压缩css
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify:{
        collapseWhitespace:true, // 折叠空白区域
        removeComments: true, // 删除注释
        removeAttributeQuotes: true // 删除属性的引号

      }
    })
  ],
  mode: "production",
};
