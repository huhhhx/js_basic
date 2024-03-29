const fs = require("fs");

// 传统回调函数形式
// fs.readFile("./content.txt", (err, data) => {
//   // 出现错误，就抛出
//   if (err) throw err;
//   console.log(`output->data`, data.toString());
// });

// promise 形式
let p = new Promise((resolve, reject) => {
  fs.readFile("./content.txt", (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

// 调用then
p.then(
  (value) => {
    console.log(`output->value`, value.toString());
  },
  (reason) => {
    console.log(`output->reason`, reason);
  }
);
