/*
 * @Author: huhhhx cqupt0829@gmail.com
 * @Date: 2024-03-09 15:04:34
 * @LastEditors: huhhhx cqupt0829@gmail.com
 * @LastEditTime: 2024-03-09 21:26:28
 * @FilePath: \source_code\promise\手写promise.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 要考虑的一些问题
// 1、new promise 的回调函数的两个参数要判断是否为空或者非函数
// 2、为了调用promise的resolve和reject方法要进行bind绑定this
// 3、promise内部可能出现错误，使用try catch在调用promise传入的参数的时候捕获其中的错误
// 4、promise内部可能会有异步代码，导致then的时候状态还没改变，声明两个数组放then中的回调函数，
// 然后在resolve和reject中分别遍历这两个数组
// 5、promise的then实现链式调用->返回promise对象
// 6、then可能有return 语句,要判断这个返回的类型并做resolve的处理
class myPromise {
  // 三种状态
  static PENGDING = '待定';
  static FULFILLED = '成功';
  static REJECTED = '失败';
  constructor(func) {
    // 记录当前状态
    this.status = myPromise.PENGDING;
    // 记录成功或者失败的结果
    this.result = null;
    // 记录then的回调
    this.fulfillCallback = [];
    this.rejectCallback = [];
    // 为了保证resolve和reject能正常使用this访问promise实例，可以用bind修改this
    //这个在promise是同步代码 一旦new后就会执行,这个函数会传入两种方法

    // 如果func内部有异常，为了避免崩溃，需要try catch 捕获异常
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      // 捕获到异常，执行reject
      this.reject.bind(this)(error);
    }
  }
  // result 传入执行结果
  resolve(result) {
    if (this.status === myPromise.PENGDING) {
      this.status = myPromise.FULFILLED;
      this.result = result;
      this.fulfillCallback.forEach((callback) => {
        callback(result);
      });
    }
  }
  reject(result) {
    if (this.status === myPromise.PENGDING) {
      this.status = myPromise.REJECTED;
      this.result = result;
      this.rejectCallback.forEach((callback) => {
        callback(result);
      });
    }
  }
  // 实现链式调用 返回一个promise
  then(onFULFILLED, onREJECTED) {
    return new myPromise((resolve, reject) => {
      // 多个判断条件
      // 1、如果用户传递的回调为空或非函数，就给一个空的箭头函数，确保不报错
      onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {};
      onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => {};
      // 当promise里面是异步代码的时候，会导致执行then的时候状态仍然是pending,最终无法执行onFULFILLED
      // 解决方法：可以把回调函数暂存起来，待执行resolve和reject时统一调用
      if (this.status === myPromise.PENGDING) {
        console.log('此时执行then,但是状态还是等待中');
        this.fulfillCallback.push(() => {
          let re = onFULFILLED(this.result);
          this.resolvePromise(re, resolve, reject);
        });
        this.rejectCallback.push(onREJECTED);
      }

      if (this.status === myPromise.FULFILLED) {
        // 由于then中的回调是异步执行的，所以需要把此函数放在异步代码中去执行
        setTimeout(() => {
          // 这里可能返回一个promise 或者常数
          let re = onFULFILLED(this.result);
          this.resolvePromise(re, resolve, reject);
        });
      }
      if (this.status === myPromise.REJECTED) {
        setTimeout(() => {
          let re = onREJECTED(this.result);
          this.rejectPromise(re, resolve, reject);
        });
      }
    });
  }
  // 判断then是否返回的是promise
  resolvePromise(x, resolve, reject) {
    if (x instanceof myPromise) {
      x.then(
        (y) => {
          // 要递归去判断y是否是promise
          this.resolvePromise(y, resolve, reject);
        },
        (result) => {
          reject(result);
        }
      );
    } else resolve(x);
  }
  // 判断then是否返回的是promise
  rejectPromise(x, resolve, reject) {
    if (x instanceof myPromise) {
      x.then(
        (y) => {
          // 要递归去判断y是否是promise
          resolve(y);
        },
        (y) => {
          this.rejectPromise(y, resolve, reject);
        }
      );
    } else reject(x);
  }
}

console.log(1);
let p = new myPromise((resolve, reject) => {
  console.log(2);
  // setTimeout(() => {
  //   console.log(4);
  //   resolve('成功');
  // });
  resolve('success');
  // reject('false');
  // console.log(5);
  // throw new Error('异常');
});
p.then(
  (result) => {
    console.log(result);
    // return 666;
    // 返回一个promise
    return new myPromise((resolve, reject) => {
      resolve('then中的success');
    });
  },
  (result) => {
    return new myPromise((resolve, reject) => {
      resolve('true');
    });
  }
).then(
  (result) => {
    console.log(result);
  },
  (result) => {
    console.log(result);
  }
);
console.log(3);
