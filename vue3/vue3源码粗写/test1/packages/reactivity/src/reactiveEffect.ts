import { activeEffect, trackEffect, triggerEffects } from './effect';

import type { ActiveEffectClass as ActiveEffectClassType } from './effect';

export type KeyDepsMap = Map<ActiveEffectClassType, ActiveEffectClassType['_trackId']> & {
  cleanup?: () => void,
  name?: string,
}
export type ObjectDepsMap = Map<string, KeyDepsMap>
export type TargetMap = WeakMap<object, ObjectDepsMap>

const targetMap: TargetMap = new WeakMap(); // 用于存放整个对象的依赖收集

// 读的时候，收集当前副作用函数的包装函数
export function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let objectDepsMap = targetMap.get(target);
  if (!objectDepsMap) {
    objectDepsMap = new Map();
    targetMap.set(target, objectDepsMap);
  }
  let keyDepsMap = objectDepsMap.get(key);
  if (!keyDepsMap) {
    keyDepsMap = new Map();
    // 提供清理函数，好在以后直接将整个 key 对相应的 map 在 objectDepsMap 删除掉
    keyDepsMap.cleanup = () => objectDepsMap.delete(key);
    keyDepsMap.name = key;
    objectDepsMap.set(key, keyDepsMap);
  }
  trackEffect(activeEffect, keyDepsMap);
};

// 写的时候，执行当前 key 收集的副作用函数
export function trigger(target, key, oldValue, value) {
  if (!targetMap) {
    return;
  }
  const objectDepsMap = targetMap.get(target);
  if (!objectDepsMap) {
    return;
  }
  const keyDepsMap = objectDepsMap.get(key);
  if (!keyDepsMap) {
    return;
  }
  triggerEffects(keyDepsMap);
}