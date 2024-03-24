function getQueryParam(paramName) {
  // 浏览器给我们直接提供了一个URLSearchParams接口
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
}
