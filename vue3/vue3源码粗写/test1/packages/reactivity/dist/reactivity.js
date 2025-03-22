// packages/reactivity/src/effect.ts
function effect(fn, options) {
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
}
var activeEffect = void 0;
var activeEffectsStack = [];
var ActiveEffectClass = class {
  // 用于控制防止进入死循环
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
    this._running = 0;
  }
  run() {
    activeEffect = this;
    activeEffectsStack.push(activeEffect);
    preRunEffect(this);
    activeEffect._running++;
    this.fn();
    activeEffect._running--;
    afterRunEffect(this);
    activeEffectsStack.pop();
    activeEffect = activeEffectsStack[activeEffectsStack.length - 1];
  }
};
function preRunEffect(activeEffect2) {
  activeEffect2._trackId++;
  activeEffect2._depsKeyDepsMapLength = 0;
}
function afterRunEffect(activeEffect2) {
  const lastDepLength = activeEffect2.depsKeyDepsMap.length;
  const depLength = activeEffect2._depsKeyDepsMapLength;
  if (lastDepLength <= depLength) {
    return;
  }
  for (let i = depLength; i < lastDepLength; i++) {
    if (activeEffect2.depsKeyDepsMap[i].get(activeEffect2) === activeEffect2._trackId) {
      continue;
    }
    cleanKeyDep(activeEffect2.depsKeyDepsMap[i], activeEffect2);
  }
  activeEffect2.depsKeyDepsMap.length = depLength;
}
function cleanKeyDep(KeyDepsMap, activeEfffect) {
  KeyDepsMap.delete(activeEfffect);
  if (KeyDepsMap.size === 0) {
    KeyDepsMap.cleanup();
  }
}
function trackEffect(activeEffect2, keyDepsMap) {
  if (activeEffect2._trackId !== keyDepsMap.get(activeEffect2)) {
    keyDepsMap.set(activeEffect2, activeEffect2._trackId);
    const oldKeysDepMap = activeEffect2.depsKeyDepsMap[activeEffect2._depsKeyDepsMapLength];
    if (oldKeysDepMap !== keyDepsMap) {
      activeEffect2.depsKeyDepsMap[activeEffect2._depsKeyDepsMapLength++] = keyDepsMap;
      if (oldKeysDepMap) {
        cleanKeyDep(oldKeysDepMap, activeEffect2);
      }
    } else {
      activeEffect2._depsKeyDepsMapLength++;
    }
  }
}
function triggerEffects(keyDepsMap) {
  for (let effect2 of keyDepsMap.keys()) {
    if (effect2.scheduler && !effect2._running) {
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
function createReactiveObject(obj) {
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
function reactive(obj) {
  return createReactiveObject(obj);
}
var mutableHandlers = {
  get(target, key, receiver) {
    track(target, key);
    const result = Reflect.get(target, key, receiver);
    if (typeof result === "object") {
      return reactive(result);
    }
    return result;
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
function toReactive(value) {
  return typeof value === "object" ? reactive(value) : value;
}
export {
  ActiveEffectClass,
  activeEffect,
  effect,
  reactive,
  toReactive,
  trackEffect,
  triggerEffects
};
//# sourceMappingURL=reactivity.js.map
