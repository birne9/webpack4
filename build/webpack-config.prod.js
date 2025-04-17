const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  plugins: [
    new OptimizeCSSAssetsPlugin(),// 压缩css
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
  }),
   
  ],
});


module.exports = prodWebpackConfig