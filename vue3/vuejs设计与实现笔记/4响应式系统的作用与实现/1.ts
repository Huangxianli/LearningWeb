type ActiveEffect = {
  (): void;
  options: {
    scheduler?: (fn?: ActiveEffect) => void;
    lazy?: boolean;
  };
  deps: Set<ActiveEffect>[];
};

let activeEffect: ActiveEffect | undefined;
const activeEffectStack: ActiveEffect[] = [];
function effect(
  fn: () => void,
  options: ActiveEffect['options'] = {
    scheduler(fn) {
      if (typeof fn === 'function ') {
        fn();
      }
    },
  }
) {
  const baseEffectFn = () => {
    activeEffectStack!.push(effectFn);
    activeEffect = effectFn;
    cleanup(effectFn);

    const result = fn();
    activeEffectStack!.pop();
    activeEffect = activeEffectStack[activeEffectStack.length - 1];
    return result;
  };

  // 这一部分的修改是为了 ts
  // activeEffect.options = options;
  // activeEffect.deps = [];
  const effectFn: ActiveEffect = Object.assign(baseEffectFn, {
    options,
    deps: [] as Set<ActiveEffect>[],
  });
  if (!options.lazy) {
    effectFn();
  }
  return effectFn;
}
function cleanup(effectFn) {
  effectFn.deps.forEach((keyDepEffectsSet) => {
    keyDepEffectsSet.delete(effectFn);
  });
  effectFn.deps.length = 0;
}

const targetMap: WeakMap<
  object,
  Map<keyof any, Set<ActiveEffect>>
> = new WeakMap();
const data = { text: 'hello Vue3' };
const obj = new Proxy(data, {
  get(target, key, recevier) {
    if (!activeEffect) return Reflect.get(target, key, recevier);
    track(target, key);
    return Reflect.get(target, key, recevier);
  },
  set(target, key, value, recevier) {
    trigger(target, key);
    return Reflect.set(target, key, value, recevier);
  },
});

function track(target, key) {
  let objectMap = targetMap.get(target);
  if (!objectMap) {
    objectMap = new Map();
    targetMap.set(target, objectMap);
  }
  let keyDepEffectsSet = objectMap.get(key);
  if (!keyDepEffectsSet) {
    keyDepEffectsSet = new Set();
    objectMap.set(key, keyDepEffectsSet);
  }
  keyDepEffectsSet.add(activeEffect!);
  activeEffect!.deps.push(keyDepEffectsSet);
}
function trigger(target, key) {
  const keyDepEffectsSet = targetMap.get(target)?.get(key);
  if (!keyDepEffectsSet) return;
  const keyDepEffectsToRunSet = new Set(keyDepEffectsSet);
  keyDepEffectsToRunSet.forEach((effectFn) => {
    if (typeof effectFn.options.scheduler === 'function') {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}

function computed(getter: () => void) {
  let dirty = true;
  let value;
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
      trigger(obj, 'value');
    },
  });
  const obj = {
    get value() {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      track(obj, 'value');
      return value;
    },
  };

  return obj;
}

const computed1 = computed(() => obj.text);
computed1.value;
effect(() => {
  console.log('effect run', computed1.value);
});

obj.text = 'change data';
