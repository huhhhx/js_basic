function deepClone(obj) {
  // 筛选出基本数据类型
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  let result;
  //分两种情况 一种是传入的是数组 一种是函数或者对象
  if (obj instanceof Array) {
    result = [];
  } else result = {};
  for (let key in obj) {
    //   只拷贝自己身上的属性
    if (obj.hasOwnProperty(key)) result[key] = deepClone(obj[key]);
  }
  return result;
}

let oldObj = {
  name: "米哈游",
  age: 18,
  hobby: {
    eat: "apple",
    time: 20,
    game: [{ name: "很深的名字" }, "g", "b"],
  },
  scores: [2, 3, 6, 8, 9],
  fun: () => {
    let a = 1;
  },
};
let newObj = deepClone(oldObj);
newObj.scores[0] = 0;
// newObj.hobby.game[0] = "wz";
newObj.hobby.game[0].name = "被我修改了";
console.log(`output->oldObj`, oldObj);
console.log(`output->newObj`, newObj);
