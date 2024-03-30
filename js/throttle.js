// 节流 一段时间内，只执行这个函数一次
function throttle(func, interval) {
  let timer;
  return function () {
    let context = this;
    let arg = arguments;
    //  定时器清空了 进入下一个周期
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, arg);
        // 触发完后再进入下一周期
        timer = null;
      }, interval);
    }
  };
}
function add(a, b) {
  let res = a + b;
  console.log(res);
}
let fun = throttle(add, 1000);
// 只会执行一次
fun(2, 3, 5);
fun(2, 3, 5);
fun(2, 3, 5);
