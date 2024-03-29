// 这是一个练习文件
var n = 123;
n += "";
// console.log(typeof (n[0] * n[0]));
var map = new Map();
map.set("b", "8");
map.set("c", "10");
map.set("a", "1");
map.set("d", "7");
map.set("e", "3");
// console.log(map.keys().next().value);

////////////3.21练习
var foo = 1;
function bar() {
  console.log(foo);
  var foo = 10;
  console.log(foo);
}

bar();
let a = {
  s: "mystring",
  n: 12,
};
console.log(a.children);
// 给一个字符串‘233abc48aa’，求数字的最大值

// const str = '233abc48aa';
// let currentNumber = ''; // 用于存储当前数字字符
// let maxNumber = -Infinity; // 初始化最大值为负无穷
// for (let i = 0; i < str.length; i++) {
//   const char = str[i];
//   if (!isNaN(parseInt(char))) {
//     // 如果是数字字符
//     currentNumber += char; // 将数字字符加入当前数字字符串中
//   } else {
//     // 遇到非数字字符
//     if (currentNumber !== '') {
//       // 如果当前数字字符串不为空
//       maxNumber = Math.max(maxNumber, parseInt(currentNumber)); // 更新最大值
//       currentNumber = ''; // 重置当前数字字符串
//     }
//   }
// }
// if (currentNumber !== '') {
//   // 处理字符串末尾的数字
//   maxNumber = Math.max(maxNumber, parseInt(currentNumber));
// }
// console.log('最大值为:', maxNumber);
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

console.log(3);

new Promise((resolve) => {
  console.log(4);
  resolve();
  console.log(5);
}).then(() => {
  console.log(6);
});

console.log(7);

console.log(`output->Promise`, Promise.resolve);
let p2 = Promise.resolve(
  //   //   new Promise((resolve, reject) => {
  //   //     // reject("not ok");
  //   //     resolve("ok");
  //   //   })
  Promise.resolve("hello")
  //   "111"
);
let p3 = Promise.resolve("333");
let p23 = Promise.all([p2, p3]);
setTimeout(() => {
  console.log(p23);
}, 1000);
