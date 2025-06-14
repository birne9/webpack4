module.exports = {
  plugins: [
    require('autoprefixer')({
      // 配置需要支持的浏览器版本
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'iOS >= 7',
        'Android >= 4'
      ]
    })
  ]
};