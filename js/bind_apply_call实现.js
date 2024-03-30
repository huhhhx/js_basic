//实现apply
Function.prototype.myApply = function (context, arg) {
  if (typeof this !== 'function') {
    return new TypeError('Not a function');
  }
  context = context || global;
  //绑定函数到context身上
  context.fn = this;
  let res = context.fn(...arg);
  delete context.fn;
  return res;
};
// 实现call
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    return new TypeError('ERROR');
  }
  context = context || global;
  context.fn = this;
  console.log('this', this);
  const args = [...arguments].slice(1);
  let res = context.fn(...args);
  delete context.fn;
  return res;
};
// 实现bind
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    return new TypeError('error');
  }
  context = context || global;
  let _this = this;
  let args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      // this 是F的实例化对象，直接返回new 一个对象
      // 因为bind返回的是一个函数，函数在哪里执行不确定，如果是在同个作用域下执行，则直接返回
      return new _this(args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};
// 示例
let obj = {
  name: 'xiaoli',
  myF: function (one, two) {
    console.log(one + '---' + two);
  },
};
let myobj = ['one', 'two'];
let a = {};
obj.myF.myApply(a, myobj); // zys
obj.myF.myCall(a, 1, 2);
