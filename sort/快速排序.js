// 假设需要排序的是数组下标从p到r之间的一组数据，
// 我们选择p到r之间的任意一个数据作为pivot（分区点），
// 我们遍历p到r之间的数据，将小于pivot的放到左边，大于pivot的放在右边，
// 将pivot放在中间，根据递归和分治的处理思想，我们可以递归进行元素的排序，
// 直至最后区间缩小为1，就说明所有数据都是有序的了

function quickSort(num) {
  let n = num.length;
  if (n <= 1) return num;
  // 取出基准值
  let index = Math.floor(n / 2);
  let val = num[index];
  let left = [],
    right = [];

  for (let i = 0; i < n - 1; i++) {
    if (num[i] < val) {
      left.push(num[i]);
    } else {
      right.push(num[i]);
    }
  }
  return quickSort(left).concat([val], quickSort(right));
}
// 不稳定 nlogn
console.log(quickSort([7, 4, 9, 24, 32, 4, 13]));

// Top K
function getTopK(num, K) {
  let index = quickGetK(num);
  if (index == num.length - K) return num[index];
  else if (index > num.length - K) return quickGetK(num.slice(0, index));
  else return quickGetK(num.slice(index + 1));
}
function quickGetK(num) {
  if (num.length <= 1) return num[0];

  let index = Math.floor(num.length / 2);
  let val = num[index];

  let left = 0,
    right = num.length - 1;
  while (left < right) {
    while (num[left] < val) {
      left++;
    }
    while (right > val) {
      right--;
    }
    if (left < right) {
      [num[left], num[right]] = [num[right], num[left]];
    }
    if (num[left] == num[right] && left < right) {
      left++;
    }
  }
  return index;
}
