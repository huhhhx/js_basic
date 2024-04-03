const Ws = require("ws");
((Ws) => {
  //建立一个wensocket服务  localhost:8000
  const server = new Ws.Server({
    port: 8000,
  });
  function init() {
    bindEvent();
  }
  let message = "";
  function bindEvent() {
    server.on("listening", handleListen);
    server.on("close", handleClose);
    server.on("error", handleError);
    server.on("connection", handleConnection);
  }
  function handleListen() {
    console.log("back websocket open");
  }
  function handleClose() {
    console.log("back websocket close");
  }
  function handleError() {
    console.log(" back websocket error");
  }
  function handleConnection(ws) {
    console.log(" back websocket connect");
    ws.on("message", handleMessage);
  }
  function handleMessage(msg) {
    console.log("back websocket get message");
    //   服务端输出的是buffer类型 要使用toString转一下
    console.log(`output->msg`, msg.toString("utf-8"));
    message = msg.toString("utf-8");
    //可能有多个客户端与服务端连接  因此要广播这个信息给所有客户端
    server.clients.forEach((c) => {
      //接收到前端发过来的消息 又send回客户端
      // 客户端在handleMessage 中接收
      c.send(message);
    });
  }
  init();
})(Ws);
