import { track, trigger } from './reactiveEffect';

const targetMap = new WeakMap();
function createReactiveObject(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }
  if (targetMap.get(obj)) {
    return targetMap.get(obj);
  }
  const proxy = new Proxy(obj, mutableHandlers);
  targetMap.set(obj, proxy);
  return proxy;
}

export function reactive(obj) {
  return createReactiveObject(obj);
};

const mutableHandlers: ProxyHandler<object> = {
  get(target, key, receiver) {
    // 收集被包装过的当前 effect 内容
    track(target, key);
    const result = Reflect.get(target, key, receiver)
    if (typeof result === 'object') {
      return reactive(result)
    }
    return result;
  },
  set(target, key, value, receiver) {
    let oldValue = target[key];
    // 注意这里要先调用在触发副作用函数的执行，不然，执行副作用函数时，获取到的数据是旧的数据
    const data = Reflect.set(target, key, value, receiver);
    if (oldValue !== value) { // 新旧不一致的时候，才进行副作用函数的执行
      trigger(target, key, oldValue, value);
    }
    return data;
  },
};

export function toReactive(value) {
  return typeof value === 'object' ? reactive(value) : value;
}
