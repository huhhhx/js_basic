function mySleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('sleep', time);
      resolve();
    }, time);
  });
}
async function main() {
  try {
    await mySleep(1000); //睡眠一秒
  } catch (err) {
    console.log(err);
  }
  console.log('输出');
  await mySleep(2000);
  console.log('睡眠两秒');
}
main();
console.log('无影响');
