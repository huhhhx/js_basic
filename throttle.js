// 节流 一短时间内，只执行这个函数一次
function debounce(func, interval) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    //  定时器清空了 进入下一个周期
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        // 触发完后再进入下一周期
        timer = null;
      }, interval);
    }
  };
}
