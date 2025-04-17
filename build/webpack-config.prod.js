const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base.js");

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",

});


module.exports = prodWebpackConfig