// 封装一个函数 sendAjax 发送get Ajax请求
// 参数：URL
// 返回一个Promise对象

const { rejects } = require("assert");
const { resolve } = require("path");

function sendAjax(url) {
  return new Promise((resolve, rejects) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
      //   结果返回了
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          // 成功的响应
          resolve(xhr.response);
        } else rejects(xhr.status);
      }
    };
  });
}

// 使用这个函数
sendAjax("https://www.baidu.com").then(
  (value) => {},
  //在这里指定回调
  (reason) => {}
);
