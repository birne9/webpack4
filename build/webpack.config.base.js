
/*
 loader:1、下载 2、使用（配置loader）
 plugins:1、下载、2、实例化插件 3、传入plugins选项

*/
const { resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 用于生成html文件

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
    clean:true
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
    //   处理图片和字体文件
      // {
      //   test: /\.(png|jpe?g|gif|webp|svg)$/i,
      //   type: 'asset/resource', // 或 'asset' 根据需求选择
      //   generator: {
      //     filename: 'images/[hash][ext]' // 指定输出路径和文件名格式
      //   },
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 10* 1024, // 小于等于10kb的图片会被转为base64格式的字符串，否则会生成单独的文件
      //     },
      //   },
      // },
       { test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8KB 以下转 Base64
              name: 'images/[name].[hash:8].[ext]',
              esModule: false // 关闭 ES 模块语法
            }
          }
        ],
        type: 'javascript/auto' // 禁用 Webpack 5 默认处理
      },
      {
        test:/\.html$/,
        exclude: /node_modules/, // 排除node_modules文件夹
        // 使用html-loader处理html文件中的图片（img src）
        loader:'html-loader'
      },
      //   处理其他资源
      // {
      //   test: /\.(woff2?|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac|pdf|docx?|xlsx?|pptx?|zip|rar|7z)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/[name].[hash:8][ext][query]' // 输出路径和文件名格式
      //   }
      // }

      // {
      //   test: /\.(woff2?|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'fonts/[name].[hash:8][ext][query]' // 单独存放字体
      //   }
      // },
      // {
      //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'media/[name].[hash:8][ext][query]' // 媒体文件单独目录
      //   }
      // },
      // {
      //   test: /\.(pdf|docx?|xlsx?|pptx?)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'docs/[name].[hash:8][ext][query]' // 文档单独目录
      //   }
      // },
      // {
      //   test: /\.(zip|rar|7z)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'archives/[name].[hash:8][ext][query]' // 压缩文件归档
      //   }
      // },

      // 处理其他资源使用第三方 Loader（兼容旧配置）若需更复杂功能（如自定义文件处理）
      {
        test: /\.(woff2?|eot|ttf|otf|mp4|pdf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'assets/', // 统一输出目录
              esModule: false // 关闭 ES 模块语法
            }
          }
        ],
        type: 'javascript/auto' // 禁用 Webpack 5 默认处理
      }
      
    ],
  },
  // 插件的配置
  plugins: [
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
        // 复制./src/index.html 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: "./src/index.html",
    })
  ],
  // 模式
  mode: "development",
};
