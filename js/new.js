let myNew = (constructor, ...args) => {
  //  const obj = {};
  const obj = new Object();
  obj.__proto__ = constructor.prototype;
  let ret = constructor.apply(obj, args);
  //return typeof ret === 'object' ? ret : obj;
  return Object.prototype.toString.call(ret) === '[object Object]' ? ret : obj;
};

function Person(name) {
  this.name = name;
  this.say = function (x) {
    console.log(x);
  };
}

let p = myNew(Person, '小胡');
console.log(p);
