import type { KeyDepsMap } from './reactiveEffect';

export function effect(fn, options?) {
  const _effect = new ActiveEffect(fn, () => {
    _effect.run();
  });
  _effect.run();
};

// 当前执行的副作用函数的包装函数
export let activeEffect: ActiveEffectClass | undefined = undefined;

const activeEffectsStack: ActiveEffectClass[] = [];
export abstract class ActiveEffectClass {
  abstract _trackId: number;
  abstract depsKeyDepsMap: any[];
  abstract _depsKeyDepsMapLength: number;

  // abstract fn: () => void;
  constructor(public fn: () => void, public scheduler?: () => void) { };
  abstract run: () => void;
};



class ActiveEffect implements ActiveEffectClass {
  _trackId = 0; // 用于记录当前的副作用函数执行了几次
  depsKeyDepsMap = []; // 用于收集当前的这个被包装的副作用函数被哪些 key 收集了，由于主要是为了拿到 key 对应的 keyDepsMap，所以直接存的就是 keyDepsMap
  _depsKeyDepsMapLength = 0;

  constructor(public fn, public scheduler?) { }
  run() {
    // try {
    activeEffect = this;
    activeEffectsStack.push(activeEffect);
    this.fn();
    // } finally {
    activeEffectsStack.pop();
    activeEffect = activeEffectsStack[activeEffectsStack.length - 1];
    // }
  };
};
// 收集包装的副作用函数，并且记录当前的副作用函数被哪些 key 收集了
export function trackEffect(activeEffect: ActiveEffectClass, keyDesMap: KeyDepsMap) {
  debugger
  // 将当前的被包装的副作用行数，加入到当前的 key 的依赖 map 中
  keyDesMap.set(activeEffect, activeEffect._trackId);
  // 想要知道当前的 activeEffect 被哪些 keyDesMap 收集了
  activeEffect.depsKeyDepsMap[activeEffect._depsKeyDepsMapLength++] = keyDesMap;
}

export function triggerEffects(keyDepsMap: KeyDepsMap) {
  // 触发 key 对应的 map 中的所有包装过的副作用函数
  for (let effect of keyDepsMap.keys()) {
    if (effect.scheduler) {
      effect.scheduler();
    }
  }
}