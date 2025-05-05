import './css/index.css';
import './less/index.less';
import './font/iconfont.css';
import './video/video1.mp4';

// 箭头函数
const test = function test(x, y) {
  // eslint-disable-next-line
  console.log('箭头函数');
  return x + y;
};

// eslint-disable-next-line
console.log(test(1, 2));