((doc, Socket, localStorage, location) => {
  const oList = doc.querySelector("#list");
  const oMessage = doc.querySelector("#message");
  const oSendBtn = doc.querySelector("#send");
  // 后端开启8000端口
  const ws = new Socket("ws:localhost:8000");

  let username = "";
  let msgDate = "";
  const init = () => {
    bindEvent();
  };
  function bindEvent() {
    oSendBtn.addEventListener("click", handleSendBtnClick, false);
    ws.addEventListener("open", handleOpen, false);
    ws.addEventListener("close", handleClose, false);
    ws.addEventListener("error", handleError, false);
    ws.addEventListener("message", handleMessage, false);
  }

  function handleSendBtnClick() {
    console.log("send message");
    const msg = oMessage.value;
    if (!msg.trim().length) {
      return;
    }
    ws.send(
      // 传json格式的数据
      JSON.stringify({
        user: username,
        dataTime: new Date().getTime(),
        message: msg,
      })
    );
    msgDate = "";
  }
  function handleOpen() {
    console.log("websocket open");
    username = localStorage.getItem("username");
    if (!username) {
      location.href = "entry.html";
      return;
    }
  }
  function handleClose() {
    console.log("websocket close");
  }
  function handleError() {
    console.log("websocket error");
  }
  function handleMessage(e) {
    console.log("websocket message");
    // 客户端可以在e事件中拿到自己刚刚传给服务器的内容
    console.log(`output->e`, e);
    msgDate = JSON.parse(e.data);
    // 新增一个聊天框
    oList.appendChild(careateMsg(msgDate));
  }
  function careateMsg(data) {
    const { user, dataTime, message } = data;
    const oItem = doc.createElement("li");
    oItem.innerHTML = `<p>  
    <span> 用户:${user}</span>
    <i>发送时间:${new Date(dataTime)}  </i>
    </p>
    <p> 消息:${message}</p>
    `;
    return oItem;
  }
  init();
})(document, WebSocket, localStorage, location);
