((doc, localStorage, location) => {
  const oUserName = doc.querySelector("#username");
  const oBtn = doc.querySelector("#btn");

  const init = () => {
    bindEvent();
  };
  function bindEvent() {
    oBtn.addEventListener("click", handleBtnClick, false);
  }
  function handleBtnClick() {
    const username = oUserName.value.trim();
    if (username.length < 2) {
      alert("用户名不少于2位");
      return;
    }
    localStorage.setItem("username", username);
    location.href = "index.html";
  }
  init();
})(document, localStorage, location);
