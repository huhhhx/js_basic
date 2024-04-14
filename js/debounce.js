// 防抖 一段连续触发的时间里，只执行最后一次
function debounce(func, delay) {
  let timer;
  // // 返回一个立即执行的函数
  // return (function () {
  //   let context = this;

  //   // 再次点击 清除timer 重新计时间
  //   clearTimeout(timer);
  //   timer = setTimeout(() => {
  //     func.apply(context, rst);
  //   }, delay);
  // })();
  // 返回一个函数
  return function () {
    let context = this;
    let arg = arguments;
    // 再次点击 清除timer 重新计时间
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, arg);
    }, delay);
  };
}

function add(a, b) {
  let res = a + b;
  console.log(res);
}
let fn = debounce(add, 1000);
