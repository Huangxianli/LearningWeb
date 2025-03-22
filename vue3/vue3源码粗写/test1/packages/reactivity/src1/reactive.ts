import { activeEffect } from "./effect";

enum REACTIVE_CONSTANCE {
  IS_ALREADY_REACTIVE = 'isAlreadyReactive'
};
const allReactiveMap = new Map();
export function reactive(obj) {
  // 是否是对象
  // obj 是否已经被代理过了
  // obj 是否是代理后的产物
  // 走代理
  if (typeof obj !== 'object') { return }
  let targetReactive = allReactiveMap.get(obj)
  if (targetReactive) {
    return targetReactive;
  }
  if (obj[REACTIVE_CONSTANCE.IS_ALREADY_REACTIVE]) {
    return obj;
  }
  return new Proxy<ProxyHandler<object>>(obj, {
    get(target, key, reciever) {
      // 读的时候收集副作用函数
      track(target, key, reciever);
      return Reflect.get(target, key, reciever);
    },
    set(target, key, value, reciever) {
      // 写的时候触发副作用函数
      // 新旧值没有改变
      const oldValue = target[key];
      if (oldValue !== value) {
        return target[value];
      }
      const data = Reflect.set(target, key, value, reciever);
      trigger(target, key, value, oldValue);
      return data
    },
  });
};

// 用来存储所有对象的副作用依赖
const allEffectMap = new WeakMap();

function track(target, key, reciever) {
  // 如果当前没有副作用函数
  if (!activeEffect) { return }
  let objectDepsMap = allEffectMap.get(target);
  if (!objectDepsMap) {
    allEffectMap.set(objectDepsMap, (objectDepsMap = new Map()));
  }
  let keyDepsMap = objectDepsMap.get(key);
  if (!keyDepsMap) {
    objectDepsMap.set(key, (keyDepsMap = new Map()));
    keyDepsMap.cleanup = () => objectDepsMap.delete(key); // cleanup 用来删除 obj 上的整个 key 删除
    keyDepsMap.name = key; // 这个属性只是为了方便调试
  }

  keyDepsMap.set(activeEffect, activeEffect._trackId);
  // 收集是哪些 key 收集了当前正在执行的副作用函数
  activeEffect.depsKeyDepsMap[activeEffect._depsKeyDepsMapLength++] = keyDepsMap;
};

function trigger(target, key, value, oldValue) {
  // 触发当前 key 收集的副作用函数
  const keyDepsMap = allEffectMap?.get(target)?.get(key);
  if (!keyDepsMap) { return }
  for (let effect of keyDepsMap.keys()) {
    if (effect.scheduler) {
      effect.scheduler();
    }
  }
};
