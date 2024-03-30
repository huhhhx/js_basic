let myInstanceof = (instance, cons) => {
  let prototype = cons.prototype;
  let __proto__ = instance.__proto__;
  while (__proto__ !== null) {
    if (__proto__ === prototype) return true;
    __proto__ = __proto__.__proto__;
  }
  return false;
};
