/*
 * @Author: huhhhx cqupt0829@gmail.com
 * @Date: 2024-03-09 15:05:07
 * @LastEditors: huhhhx cqupt0829@gmail.com
 * @LastEditTime: 2024-03-09 21:24:40
 * @FilePath: \source_code\promise\原生promise.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let p = new Promise((resolve, reject) => {
  // setTimeout(() => {
  //   console.log(4);
  resolve('成功');
  //   console.log(5);
  // });
  // reject('失败');
  // throw new Error('异常');
})
  .then(
    (result) => {
      return new Promise((resolve, reject) => {
        reject('false');
      });
    },
    (result) => {
      console.log(result);
    }
  )
  .then(
    (result) => {
      console.log(1);
      console.log(result);
    },
    (result) => {
      console.log(2);
      console.log(result);
    }
  );
