import { track, trigger } from './reactiveEffect';

const targetMap = new WeakMap();

export function reactive(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }
  if (targetMap.get(obj)) {
    return targetMap.get(obj);
  }
  const proxy = new Proxy(obj, mutableHandlers);
  targetMap.set(obj, proxy);
  return proxy;


};
const mutableHandlers: ProxyHandler<object> = {
  get(target, key, receiver) {
    // 收集被包装过的当前 effect 内容
    track(target, key);
    return Reflect.get(target, key, receiver);

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
}
