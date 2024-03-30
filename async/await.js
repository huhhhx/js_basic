//1.await右侧的表达式一般为promise对象，但是也可以是其他值
// 2.如果表达式是promise对象，await返回的值是promise成功的值
// 3.非promise对象，直接将此值作为await的返回值
// 4.如果await的promise 失败了，就会抛出异常，需要通过try...catch 捕获
async function main() {
  let p = new Promise((resolve, reject) => {
    // resolve("ok");
    reject("no");
  });
  try {
    let res = await p;
    console.log(`output->res`, res);
  } catch (err) {
    console.log(`output->err`, err);
  }
}
console.log(`output->main()`, main());
