// 递归+分治

// 如果要排序一个数组，我们先把数组从中间分成前后两个部分，
// 然后对前后两部分分别排序，
// 再将排好序的两部分合并在一起，这样整个数组就是有序的数组
function mergeSort(num) {
  let n = num.length;
  if (n <= 1) {
    return num;
  }
  let index = Math.floor(n / 2);
  let left = num.slice(0, index);
  let right = num.slice(index);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(num1, num2) {
  let res = [];
  while (num1.length && num2.length) {
    if (num1[0] < num2[0]) {
      res.push(num1.shift());
    } else res.push(num2.shift());
  }
  if (num1.length) {
    res = [...res, ...num1];
  }
  if (num2.length) {
    res = [...res, ...num2];
  }
  return res;
}
// 稳定 nlogn
console.log(mergeSort([7, 4, 9, 24, 32, 4, 13]));
