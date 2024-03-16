// 防抖 一段连续触发的时间里，只执行最后一次
function debounce(func, delay, ...rst) {
  let timer;
  // 返回一个立即执行的函数
  return (function () {
    let context = this;

    // 再次点击 清除timer 重新计时间
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, rst);
    }, delay);
  })();
}

function add(a, b) {
  let res = a + b;
  console.log(res);
}
let a = {
  name: 'lucy',
  myFun: function () {
    debounce(add, 5000, 2, 3, 7, 8);
  },
};
a.myFun();
