// 柯里化（Currying）是一种将多个参数的函数转换为接受单个参数的函数序列的技术。
function add() {
  // 创建空数组维护所有要add的数
  let args = [];
  function curry(...nums) {
    if (nums.length == 0) {
      // 此时没有传入要add的值了，说明调用结束
      let res = args.reduce((pre, next) => pre + next, 0);
      args = [];
      return res;
    } else {
      args.push(...nums);
      return curry;
    }
  }
  // // 一开始给 curry 传递 add 接收到的参数 arguments
  return curry(...arguments);
}
// 重复的参数可以在这里调用
let curryAdd = add(1);
console.log(curryAdd(2)(3, 4)());
console.log(curryAdd(2)());
