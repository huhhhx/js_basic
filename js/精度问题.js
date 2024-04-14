/** 封装一个公共方法numberCalculate() 用于浮点数运算 */
//num1 num2传入两个值 symbol +-*/符号
let numberCalculate = function (num1, num2, type) {
  var str1 = num1.toString(),
    str2 = num2.toString(),
    result,
    str1Length,
    str2Length;

  try {
    //获取小数点后的精度
    str1Length = str1.split(".")[1].length;
  } catch (error) {
    //解决整数没有小数点方法
    str1Length = 0;
  }
  try {
    str2Length = str2.split(".")[1].length;
  } catch (error) {
    str2Length = 0;
  }
  // 取两个数的最小精度，即小数点后数字的最大长度
  var maxLen = Math.max(str1Length, str2Length);
  console.log(`output->maxLen`, maxLen);
  // step将两个数都转化为整数至少小数点后移多少位
  var step = Math.pow(10, maxLen);
  console.log(`output->step`, step);

  switch (type) {
    case "+":
      // toFixed()根据最小精度截取运算结果
      result = ((num1 * step + num2 * step) / step).toFixed(maxLen);
      break;
    case "-":
      result = ((num1 * step - num2 * step) / step).toFixed(maxLen);
      break;
    case "*":
      result = ((num1 * step * (num2 * step)) / step / step).toFixed(maxLen);
      break;
    case "/":
      result = ((num1 * step) / (num2 * step)).toFixed(maxLen);
      break;
    default:
      break;
  }
  // 由于toFixed方法返回结果是字符串，还需要转回number输出
  return Number(result);
};
console.log(
  `output->numberCalculate(0.1,0.2,'+')`,
  numberCalculate(0.1, 0.2, "+")
);
