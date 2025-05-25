const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'development',
}); // mode: 'development' will set process.env.NODE_ENV to 'development'
