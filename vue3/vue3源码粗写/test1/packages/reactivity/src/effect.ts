import type { KeyDepsMap } from './reactiveEffect';

export function effect(fn: () => any, options?: { scheduler?: () => any }) {
  const _effect = new ActiveEffect(fn, () => {
    _effect.run();
  });
  _effect.run();
  if (options) {
    Object.assign(_effect, options);
  }
  const effectRun = _effect.run.bind(_effect);
  effectRun._effect = _effect;
  return effectRun;
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
    preRunEffect(this);
    this.fn();
    // } finally {
    afterRunEffect(this);
    activeEffectsStack.pop();
    activeEffect = activeEffectsStack[activeEffectsStack.length - 1];
    // }
  };
};
// 执行副作用函数前的操作，主要是为了后续执行副作用函数的过程中收集依赖不重复收集 key 和删除不在依赖的 key
function preRunEffect(activeEffect: ActiveEffect) {
  activeEffect._trackId++; // 为了后续执行副作用函数的过程中收集依赖不重复收集 key
  activeEffect._depsKeyDepsMapLength = 0; // 为了后续删除 key 不再依赖的副作用函数
}
// 如果一个被包裹的副作用函数，第二次执行时，最后几个 key 不再被读，那就要进行清楚掉最后的依赖
function afterRunEffect(activeEffect: ActiveEffect) {
  const lastDepLength = activeEffect.depsKeyDepsMap.length;
  const depLength = activeEffect._depsKeyDepsMapLength;
  if (lastDepLength <= depLength) {
    return;
  }
  for (let i = depLength; i < lastDepLength; i++) {
    if (activeEffect.depsKeyDepsMap[i].get(activeEffect) === activeEffect._trackId) {
      // 清除最后几个 key 的依赖的时候，防止在执行副作用函数中，最后几个 key 存在同名 key 在这次执行中已经收集了，但是在这个这次又被清除本轮 当前 key 收集好的依赖
      continue;
    }
    cleanKeyDep(activeEffect.depsKeyDepsMap[i], activeEffect);
  }
  activeEffect.depsKeyDepsMap.length = depLength;
}

// 清楚掉当前 key 的依赖副作用函数中的 不再依赖的副作用函数
function cleanKeyDep(KeyDepsMap: KeyDepsMap, activeEfffect: ActiveEffectClass) {
  KeyDepsMap.delete(activeEfffect);
  if (KeyDepsMap.size === 0) {
    KeyDepsMap.cleanup();
  }
}



// 为当前 key 收集包装的副作用函数，并且记录当前的副作用函数被哪些 key 收集了
export function trackEffect(activeEffect: ActiveEffectClass, keyDepsMap: KeyDepsMap) {
  if (activeEffect._trackId !== keyDepsMap.get(activeEffect)) { // 一个副作用函数中读取了一个 key 多次时，当前 key 只收集当前副作用函数一次
    // 比对当前 被包裹的副作用函数的执行次数 和 当前 key 收集当前被包裹的副作用函数的时存的 _trackId，如果不相等，那就是相当于没有收集过（因为是收集之后才关联 _tractId 的）
    keyDepsMap.set(activeEffect, activeEffect._trackId);
    // 利用 副作用函数搜集的 depsKeyDepMap（副作用函数按照其中读取 key 的顺序 收集的 key 的 keyDepsMap）来进行判断哪一个 key 在当前副作用函数中不会再被收集，删除掉当前被包裹的副作用函数在对应 key 的 keyDepsMap 中的值（应为最终设置 key 的值，就是去执行 keyDepsMap 里面的值）（其实没有判断那个 key 没有在当前副作用函数中读取，只是按照读取 key 的顺序来，如果与前一轮相比，相同位置的内容不同，就把该位置覆盖掉）
    const oldKeysDepMap = activeEffect.depsKeyDepsMap[activeEffect._depsKeyDepsMapLength];
    if (oldKeysDepMap !== keyDepsMap) {
      activeEffect.depsKeyDepsMap[activeEffect._depsKeyDepsMapLength++] = keyDepsMap;
      if (oldKeysDepMap) {
        cleanKeyDep(oldKeysDepMap, activeEffect);
      }
    } else {
      activeEffect._depsKeyDepsMapLength++;
    }
  }
  // 将当前的被包装的副作用行数，加入到当前的 key 的依赖 map 中
  // keyDesMap.set(activeEffect, activeEffect._trackId);
  // // 想要知道当前的 activeEffect 被哪些 keyDesMap 收集了
  // activeEffect.depsKeyDepsMap[activeEffect._depsKeyDepsMapLength++] = keyDesMap;
}

export function triggerEffects(keyDepsMap: KeyDepsMap) {
  // 触发 key 对应的 map 中的所有包装过的副作用函数
  for (let effect of keyDepsMap.keys()) {
    if (effect.scheduler) {
      effect.scheduler();
    }
  }
}