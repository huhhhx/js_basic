//async 函数的返回值为promise对象
// promise对象的结果由async函数执行的  返回值  决定

async function main() {
  // 如果返回值是一个非promise类型的值
  // return "hello";
  // 如果返回值是一个promise类型的值
  //   return new Promise((resolve, reject) => {
  //     resolve("sucess");
  //   });
}
let result = main();
console.log(`output->result`, result);
