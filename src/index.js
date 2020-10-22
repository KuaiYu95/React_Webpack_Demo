import './index.less';
// import { add, count } from '@utils/test.js';
// eslint-disable-next-line
import '@iconfont/iconfont.less';
// eslint-disable-next-line
import '@images/huiyi.png';
// eslint-disable-next-line
import '@images/big.png';

console.log('hello world');

const func = () => {
  console.log('hello webpack');
};
func();

setTimeout(() => {
  const promise = new Promise(() => console.log('promise'));
  promise.then((_) => _());
}, 1000);

class User {
  constructor() {
    console.log('new User');
  }
}

export default User;
