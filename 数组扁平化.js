//扁平数组->JSON树
let arr = [
  { id: 1, title: 'title1', parent_id: 0 },
  { id: 2, title: 'title2', parent_id: 0 },
  { id: 3, title: 'title2-1', parent_id: 2 },
  { id: 4, title: 'title3-1', parent_id: 3 },
  { id: 5, title: 'title4-1', parent_id: 4 },
  { id: 6, title: 'title3-2', parent_id: 3 },
];

const flatArrToJSONTree = (arr) => {
  const res = [];
  // 返回一个arr的map对象
  const map = arr.reduce((pre, cur) => {
    pre[cur.id] = cur;
    return pre;
  }, {});
  for (let item of arr) {
    if (item.parent_id === 0) {
      res.push(item);
      continue;
    }
    if (item.parent_id in map) {
      const parent = map[item.parent_id];
      (parent.children || (parent.children = [])).push(item);
    }
  }
  return res;
};
// console.log(flatArrToJSONTree(arr));

//数组扁平化 递归
let arrFlat = (arr) => {
  let res = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(arrFlat(item));
    } else {
      res.push(item);
    }
  }
  return res;
};
// const nestedArray = [1, [2, [3, 4], 5, [6, [7, 8]]], 9, 10];

// console.log(arrFlat(nestedArray));

//数组扁平化 栈
let ArrayFlat = (arr) => {
  let stack = arr;
  let res = [];
  while (stack.length) {
    let item = stack.pop();
    if (Array.isArray(item)) stack.push(...item);
    else res.push(item);
  }
  return res;
};
const nestedArray = [1, [2, [3, 4], 5, [6, [7, 8]]], 9, 10];

console.log(ArrayFlat(nestedArray));
