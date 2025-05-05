const baseConfig=require('./webpack.config.base.js');
const merge = require('webpack-merge');
module.exports = merge(baseConfig, {
    mode:'production'
})