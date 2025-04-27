import './css/index.css'
import './less/index.less'
import './font/iconfont.css'

// 箭头函数
const test = (x,y) => {

  console.log('箭头函数')

  return x + y
}

console.log(test(1,2))