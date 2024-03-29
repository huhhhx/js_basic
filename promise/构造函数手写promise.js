// 构造函数手写promise
// function Promise(executor) {
//   //为实例添加属性
//   this.PromiseState = "pending";
//   this.PromiseResult = null;
//   // 回调函数队列
//   this.callbacks = [];
//   // resolve 函数  ES5没有箭头函数 这里如果不用箭头函数的话要保存好实例的this再赋值
//   resolve = (data) => {
//     if (this.PromiseState == "pending") {
//       //修改对象的状态
//       this.PromiseState = "resolved";
//       //   修改对象的结果值
//       this.PromiseResult = data;
//       // 状态改变了 才执行回调函数 执行回调函数必须是异步的
//       setTimeout(() => {
//         this.callbacks.forEach((item) => {
//           item.onResolved(data);
//         });
//       });
//     } else return;
//   };
//   // reject函数
//   reject = (data) => {
//     if (this.PromiseState == "pending") {
//       this.PromiseState = "rejected";
//       this.PromiseResult = data;
//       setTimeout(() => {
//         this.callbacks.forEach((item) => {
//           item.onRejected(data);
//         });
//       });
//     } else return;
//   };
//   // 同步调用执行器函数 注意：避免同步代码抛出错误
//   try {
//     executor(resolve, reject);
//   } catch (err) {
//     reject(err);
//   }
// }
// // 添加then方法
// Promise.prototype.then = function (onResolved, onRejected) {
//   // 判断第二个回调函数是否没有传 没有传的话 异常要穿透
//   if (typeof onRejected !== "function") {
//     onRejected = (reason) => {
//       throw reason;
//     };
//   }
//   if (typeof onResolved !== "function") onResolved = (value) => value;
//   // 递归判断then返回的是否是promise
//   function resolvePromise(result, resolve, reject) {
//     if (result instanceof Promise) {
//       result.then(
//         (x) => {
//           resolvePromise(x, resolve, reject);
//         },
//         (e) => {
//           reject(e);
//         }
//       );
//     }
//     //   回调函数返回的是非promise，那么就用返回的值作为返回的成功的promise的值
//     else resolve(result);
//   }
//   function rejectPromise(result, resolve, reject) {
//     if (result instanceof Promise) {
//       result.then(
//         (x) => {
//           resolve(x);
//         },
//         (e) => {
//           rejectPromise(e, resolve, reject);
//         }
//       );
//     }
//     //   回调函数返回的是非promise，那么就用返回的值作为返回的成功的promise的值
//     else reject(result);
//   }
//   return new Promise((resolve, reject) => {
//     // 判断状态，选择对应的回调函数执行
//     try {
//       if (this.PromiseState == "resolved") {
//         setTimeout(() => {
//           // 获取回调函数的执行结果
//           let result = onResolved(this.PromiseResult);
//           //判断后调函数是否返回的是promise
//           resolvePromise(result, resolve, reject);
//         });
//       }
//     } catch (err) {
//       reject(err);
//     }
//     if (this.PromiseState == "rejected") {
//       try {
//         setTimeout(() => {
//           let result = onRejected(this.PromiseResult);
//           if (result instanceof Promise) {
//             result.then(
//               (v) => {
//                 resolve(v);
//               },
//               (e) => {
//                 reject(e);
//               }
//             );
//           }
//         });
//       } catch (err) {
//         reject(err);
//       }
//     }
//     if (this.PromiseState == "pending") {
//       setTimeout(() => {
//         // 此时状态还未改变
//         //  状态没有改变就不能执行回调函数，所以这里可以先把回调函数保存起来
//         this.callbacks.push({
//           onResolved: () => {
//             try {
//               let result = onResolved(this.PromiseResult);
//               //   判断回调函数的返回
//               resolvePromise(result, resolve, reject);
//             } catch (err) {
//               reject(err);
//             }
//           },
//           onRejected: () => {
//             try {
//               let result = onRejected(this.PromiseResult);
//               rejectPromise(result, resolve, reject);
//             } catch (err) {
//               reject(err);
//             }
//           },
//         });
//       });
//     }
//   });
// };
// // 添加catch方法 实现异常穿通
// Promise.prototype.catch = function (onRejected) {
//   return this.then(undefined, onRejected);
// };
// // 添加resolve方法
// // 在函数对象上添加resolve属性(相当于类的静态方法)
// Promise.resolve = function (data) {
//   return new Promise((resolve, reject) => {
//     if (data instanceof Promise) {
//       data.then(
//         (v) => {
//           resolve(v);
//         },
//         (e) => {
//           reject(e);
//         }
//       );
//     } else resolve(data);
//   });
// };
// // 添加reject方法
// Promise.reject = function (data) {
//   return new Promise((resolve, reject) => {
//     reject(data);
//   });
// };
// //添加all方法
// Promise.all = function (promises) {
//   let result = [];
//   let count = 0;
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < promises.length; i++) {
//       promises[i].then(
//         (v) => {
//           //这个promise成功的话就会调用这个回调函数
//           count++;
//           //  要保证结果的顺序和传入的promise的顺序一致
//           result[i] = v;
//           if (count == promises.length - 1) resolve(result);
//         },
//         (e) => {
//           reject(e);
//         }
//       );
//     }
//   });
// };
// // 添加race方法
// Promise.race = function (promises) {
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < promises.length; i++) {
//       promises[i].then(
//         (v) => {
//           resolve(v);
//         },
//         (e) => {
//           reject(e);
//         }
//       );
//     }
//   });
// };
//-----------------------------------------------------------------------------

//构造函数封装成类
class Promise {
  // 初始化，执行传入的函数
  constructor(executor) {
    //为实例添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    // 回调函数队列
    this.callbacks = [];
    // resolve 函数  ES5没有箭头函数 这里如果不用箭头函数的话要保存好实例的this再赋值
    this.resolve = (data) => {
      if (this.PromiseState == "pending") {
        //修改对象的状态
        this.PromiseState = "resolved";
        //   修改对象的结果值
        this.PromiseResult = data;
        // 状态改变了 才执行回调函数 执行回调函数必须是异步的
        setTimeout(() => {
          this.callbacks.forEach((item) => {
            item.onResolved(data);
          });
        });
      } else return;
    };
    // reject函数
    this.reject = (data) => {
      if (this.PromiseState == "pending") {
        this.PromiseState = "rejected";
        this.PromiseResult = data;
        setTimeout(() => {
          this.callbacks.forEach((item) => {
            item.onRejected(data);
          });
        });
      } else return;
    };
    // 同步调用执行器函数 注意：避免同步代码抛出错误
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }
  //添加then方法
  then(onResolved, onRejected) {
    // 判断第二个回调函数是否没有传 没有传的话 异常要穿透
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }
    if (typeof onResolved !== "function") onResolved = (value) => value;
    // 递归判断then返回的是否是promise
    function resolvePromise(result, resolve, reject) {
      if (result instanceof Promise) {
        result.then(
          (x) => {
            resolvePromise(x, resolve, reject);
          },
          (e) => {
            reject(e);
          }
        );
      }
      //   回调函数返回的是非promise，那么就用返回的值作为返回的成功的promise的值
      else resolve(result);
    }
    function rejectPromise(result, resolve, reject) {
      if (result instanceof Promise) {
        result.then(
          (x) => {
            resolve(x);
          },
          (e) => {
            rejectPromise(e, resolve, reject);
          }
        );
      }
      //   回调函数返回的是非promise，那么就用返回的值作为返回的成功的promise的值
      else reject(result);
    }
    return new Promise((resolve, reject) => {
      // 判断状态，选择对应的回调函数执行
      try {
        if (this.PromiseState == "resolved") {
          setTimeout(() => {
            // 获取回调函数的执行结果
            let result = onResolved(this.PromiseResult);
            //判断后调函数是否返回的是promise
            resolvePromise(result, resolve, reject);
          });
        }
      } catch (err) {
        reject(err);
      }
      if (this.PromiseState == "rejected") {
        try {
          setTimeout(() => {
            let result = onRejected(this.PromiseResult);
            if (result instanceof Promise) {
              result.then(
                (v) => {
                  resolve(v);
                },
                (e) => {
                  reject(e);
                }
              );
            }
          });
        } catch (err) {
          reject(err);
        }
      }
      if (this.PromiseState == "pending") {
        setTimeout(() => {
          // 此时状态还未改变
          //  状态没有改变就不能执行回调函数，所以这里可以先把回调函数保存起来
          this.callbacks.push({
            onResolved: () => {
              try {
                let result = onResolved(this.PromiseResult);
                //   判断回调函数的返回
                resolvePromise(result, resolve, reject);
              } catch (err) {
                reject(err);
              }
            },
            onRejected: () => {
              try {
                let result = onRejected(this.PromiseResult);
                rejectPromise(result, resolve, reject);
              } catch (err) {
                reject(err);
              }
            },
          });
        });
      }
    });
  }
  // 添加catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  // 添加resolve方法 (静态方法)
  static resolve(data) {
    return new Promise((resolve, reject) => {
      if (data instanceof Promise) {
        data.then(
          (v) => {
            resolve(v);
          },
          (e) => {
            reject(e);
          }
        );
      } else resolve(data);
    });
  }
  // 添加resolve方法 (静态方法)
  static reject(data) {
    return new Promise((resolve, reject) => {
      reject(data);
    });
  }
  // 添加all方法 (静态方法)
  static all(promises) {
    let result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            //这个promise成功的话就会调用这个回调函数
            count++;
            //  要保证结果的顺序和传入的promise的顺序一致
            result[i] = v;
            if (count == promises.length - 1) resolve(result);
          },
          (e) => {
            reject(e);
          }
        );
      }
    });
  }
  // 添加race方法(静态方法)
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            resolve(v);
          },
          (e) => {
            reject(e);
          }
        );
      }
    });
  }
}
//--------------------------------------------------------------------
let p = new Promise((resolve, reject) => {
  //   resolve("ok");
  setTimeout(() => {
    resolve("ok");
    // reject("not ok");
  }, 1000);
});
let result = p
  .then(
    (res) => {
      // 1、什么也不返回 最后这个then方法会返回一个值为undefined的成功的Promise
      // 2、返回一个成功/失败的promise，then方法就返回一个成功/失败的promise
      // 3、抛出错误，then返回一个失败的promise
      // console.log(`output->res`, res);
      return "succ";
      // return new Promise((resolve, reject) => {
      //   resolve("success");
      //   //   reject("oh no");
      // });
      //   throw "bad";
    }
    // (err) => {
    //   console.log(`output->err`, err);
    // }
  )
  .then()
  .then((v) => {
    console.log(`output->v`, v);
  })
  .catch((reason) => {
    console.log(`output->reason`, reason);
  });
// console.log(`output->res11`, result);
// setTimeout(() => {
//   console.log(`output->res11`, result);
// }, 2000);
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("111");
  }, 1000);
});
let p2 = Promise.resolve(
  //   //   new Promise((resolve, reject) => {
  //   //     // reject("not ok");
  //   //     resolve("ok");
  //   //   })
  //   Promise.resolve("hello")
  "222"
);
console.log(`output->p2`, p2);
console.log(`output->分界线`);
let p3 = Promise.resolve("333");
let p23 = Promise.race([p1, p2, p3]);
setTimeout(() => {
  console.log(p23);
}, 1000);
