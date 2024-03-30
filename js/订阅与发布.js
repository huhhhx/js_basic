function eventEmitter() {
  // events维护各事件对应的订阅者
  const event = {};
  //on 绑定订阅者callback至相应的事件eventName
  function on(eventName, callback) {
    // 如果events 不存在该事件 ，则创建该事件并赋值一个空数组放订阅者
    event[eventName] = event[eventName] || [];
    // 存入订阅者
    event[eventName].push(callback);
  }

  // emit 发布事件 eventName，并传递相关参数
  function emit(eventName, ...args) {
    // 赋值订阅者数组
    const callbacks = event[eventName];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
  }

  // off 解除订阅关系
  function off(eventName, callback) {
    if (!callback) {
      // 订阅者为空 ，直接删除事件
      delete event[eventName];
    } else {
      // 订阅者不为空,筛选订阅者
      event[eventName] = event[eventName].filter((cb) => cb !== callback);
    }
  }
  return { on, emit, off };
}

// 使用示例
const emitter = eventEmitter();

function handler1(name) {
  console.log(`${name} says hello from handler1`);
}

function handler2(name) {
  console.log(`${name} says hello from handler2`);
}

emitter.on('hello', handler1);
emitter.on('hello', handler2);

emitter.emit('hello', 'Alice'); // 输出 "Alice says hello from handler1" 和 "Alice says hello from handler2"

emitter.off('hello', handler1);
emitter.emit('hello', 'Bob'); // 只输出 "Bob says hello from handler2"
