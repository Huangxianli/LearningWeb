// packages/reactivity/src/effect.ts
function effect(fn, options) {
  const _effect = new ActiveEffect(fn, () => {
    _effect.run();
  });
  _effect.run();
}
var activeEffect = void 0;
var activeEffectsStack = [];
var ActiveEffectClass = class {
  // abstract fn: () => void;
  constructor(fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
  }
};
var ActiveEffect = class {
  constructor(fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
    this._trackId = 0;
    // 用于记录当前的副作用函数执行了几次
    this.depsKeyDepsMap = [];
    // 用于收集当前的这个被包装的副作用函数被哪些 key 收集了，由于主要是为了拿到 key 对应的 keyDepsMap，所以直接存的就是 keyDepsMap
    this._depsKeyDepsMapLength = 0;
  }
  run() {
    activeEffect = this;
    activeEffectsStack.push(activeEffect);
    this.fn();
    activeEffectsStack.pop();
    activeEffect = activeEffectsStack[activeEffectsStack.length - 1];
  }
};
function trackEffect(activeEffect2, keyDesMap) {
  debugger;
  keyDesMap.set(activeEffect2, activeEffect2._trackId);
  activeEffect2.depsKeyDepsMap[activeEffect2._depsKeyDepsMapLength++] = keyDesMap;
}
function triggerEffects(keyDepsMap) {
  for (let effect2 of keyDepsMap.keys()) {
    if (effect2.scheduler) {
      effect2.scheduler();
    }
  }
}

// packages/reactivity/src/reactiveEffect.ts
var targetMap = /* @__PURE__ */ new WeakMap();
function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let objectDepsMap = targetMap.get(target);
  if (!objectDepsMap) {
    objectDepsMap = /* @__PURE__ */ new Map();
    targetMap.set(target, objectDepsMap);
  }
  let keyDepsMap = objectDepsMap.get(key);
  if (!keyDepsMap) {
    keyDepsMap = /* @__PURE__ */ new Map();
    keyDepsMap.cleanup = () => objectDepsMap.delete(key);
    keyDepsMap.name = key;
    objectDepsMap.set(key, keyDepsMap);
  }
  trackEffect(activeEffect, keyDepsMap);
}
function trigger(target, key, oldValue, value) {
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

// packages/reactivity/src/reactive.ts
var targetMap2 = /* @__PURE__ */ new WeakMap();
function reactive(obj) {
  if (typeof obj !== "object") {
    return obj;
  }
  if (targetMap2.get(obj)) {
    return targetMap2.get(obj);
  }
  const proxy = new Proxy(obj, mutableHandlers);
  targetMap2.set(obj, proxy);
  return proxy;
}
var mutableHandlers = {
  get(target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const data = Reflect.set(target, key, value, receiver);
    if (oldValue !== value) {
      trigger(target, key, oldValue, value);
    }
    return data;
  }
};
export {
  ActiveEffectClass,
  activeEffect,
  effect,
  reactive,
  trackEffect,
  triggerEffects
};
//# sourceMappingURL=reactivity.js.map
