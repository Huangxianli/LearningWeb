# 4 响应式系统的作用与实现

## 响应式数据与副作用函数

副作用函数：执行该函数的时候，对外界会造成直接或间接的影响或者相同输入但是输出不同的函数
在 Vue 中主要表示的是会对外界在成直接或间接影响的函数

```js
function effect() {
  document.body.innerText = 'hello Vue3';
}
// 这个函数就是一个副作用函数
```

```js
let obj = {
  text: 'hello Vue3',
};

function effect() {
  document.body.innerText = obj.text;
}

// Vue3 的声明式就体现在，当 obj.text 的值发生改变的时候，effect 要自己重新执行，在 Vue3 中如果要实现的这个的话，要求 obj.text 是响应式数据
// 或许可以这么说：当数据发生改变的时候，依赖这个数据的 effect 会自动执行，那么这个数据可以称之为响应式数据
```

## 响应式数据的基本实现

- 副作用函数 effect 执行的时候，会触发 obj.text 的*读* 操作
- 修改 obj.text 的时候，会触发 obj.text 的*写*操作

**响应式数据，在该数据发生改变的时候，依赖其的副作用函数会自动的执行**

要想在修改数据的时候自动的执行依赖该属性的副作用函数，要先知道当前的数据被哪些副作用函数使用，那么就要在读该属性（在副作用函数中读）的时候将当前的副作用函数收集起来，将属性和副作用函数关联起来，后面在修改数据的时候，就知道应该执行哪些副作用函数了

利用 Proxy 来进行*读*和*写* 拦截，将*收集副作用函数*与*触发副作用函数*分别放在其中的 get 和 set 中

```js
// 用来收集当前数据被哪些副作用函数依赖
const keyEffectsSet = new Set();

// 原对象
const data = {
  text: 'hello Vue3',
};

// 响应式对象
const obj = new Procy(data, {
  get(target, key, recevier) {
    // 执行副作用函数的时候，会触发响应式对象属性的读操作，进入这里，收集当前副作用函数，将副作用函数和当前数据关联起来
    keyEffectsSet.add(effect);
    return Reflect.get(target, key, recevier);
  },
  set(target, key, value, recevier) {
    // 修改数据的时候会进入这里，重新执行与当前数据关联起来的副作用函数
    keyEffectsSet.forEach((fn) => fn());
    return Reflect.set(target, key, valu, recevier);
  },
});

function effect() {
  document.body.innerText = obj.text;
}

setTimeout(() => {
  obj.text = 'change data';
}, 1000);
```

## 设计一个完善的响应式系统

- 副作用函数 effect 执行的时候，会触发 obj.text 的*读* 操作
  - *读*操作发生的时候，将副作用函数收集起来
- 修改 obj.text 的时候，会触发 obj.text 的*写*操作
  - *写*操作发生的时候，执行收集的副作用函数

副作用函数可以是任何的命名，不一定是 effect，我们扩展前面的 `function effect(){}`，将这个函数改造为接收副作用函数的副作用函数注册函数
同时由于 get() {} 中要收集当前的副作用函数，所以创建一个全局变量 `activeEffect`来存储当前正在执行的副作用函数

```js
// 用于存储当前正在执行的副作用函数
let activeEffect;

// 副作用函数注册函数
function effect(fn) {
  activeEffect = fn;
  // 副作用函数在注册的时候要先执行一次，不然不会触发 get 进行副作用函数的收集
  fn();
}

const keyEffectsSet = new Set();
const data = { text: 'hello Vue3' };
const obj = new Proxy(data, {
  get(target, key, recevier) {
    if (!activeEffect) return Reflect.get(target, key, recevier);
    keyEffectsSet.add(activeEffect);
    return Reflect.get(target, key, recevier);
  },
  set(target, key, value, recevier) {
    keyEffectsSet.forEach((fn) => fn);
    return Reflect.set(target, key, value, recevier);
  },
});

effect(() => {
  // 副作用操作
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.text = 'change data';
}, 1000);
```

在前面的设计中，所有的副作用函数只是一股脑的被 add 进入了 keyEffectsSet 中，其实并没有将副作用函数和 key 真正的对应起来，也就是说前面的代码，如果在 setTimeout 中修改的是非 text 的属性值，也是会触发 set，然后执行所有的副作用函数，这样明显是不正确的。需要真正的将 obj key 和副作用函数联系起来，我们修改存放副作用函数的“桶”

```ts
let activeEffect;

function effect(fn) {
  activeEffect = fn;
  fn();
}

// 用于存放对象 key 副作用函数的依赖关系
const targetMap: WeakMap<
  object,
  Map<keyof any, Set<ActiveEffect>>
> = new WeakMap();
// WeakMap<原始对象，Map<对象的Key，Set<副作用函数>>>

const data = { text: 'hello Vue3' };
const obj = new Proxy(data, {
  get(target, key, recevier) {
    if (!activeEffect) return Reflect.get(target, key, recevier);

    // WeakMap<object, T1> 处理 T1
    let objectMap = targetMap.get(target);
    if (!objectMap) {
      objectMap = new Map();
      targetMap.set(target, objectMap);
    }

    // WeakMap<object, Map<key, T2>> 处理 T2
    let keyDepEffectsSet = objectMap.get(key);
    if (!keyDepEffectsSet) {
      keyDepEffectsSet = new Set();
      objectMap.set(key, keyDepEffectsSet);
    }
    keyDepEffectsSet.add(activeEffect);

    return Reflect.get(target, key, recevier);
  },
  set(target, key, value, recevier) {
    const keyDepEffectsSet = targetMap.get(target)?.get(key);
    if (!keyDepEffectsSet) return Reflect.set(target, key, value, recevier);
    keyDepEffectsSet.forEach((fn) => fn());
    return Reflect.set(target, key, value, recevier);
  },
});

effect(() => {
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.text = 'change data';
}, 1000);
```

收集依赖的动作和触发副作用函数执行的操作是一个比较完整且独立的操作，可以将其单独的抽离出来

```ts
let activeEffect;

function effect(fn) {
  activeEffect = fn;
  fn();
}

// 用于存放对象 key 副作用函数的依赖关系
const targetMap: WeakMap<
  object,
  Map<keyof any, Set<ActiveEffect>>
> = new WeakMap();
// WeakMap<原始对象，Map<对象的Key，Set<副作用函数>>>

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

// 收集副作用函数
function track(target, key) {
  // WeakMap<object, T1> 处理 T1
  let objectMap = targetMap.get(target);
  if (!objectMap) {
    objectMap = new Map();
    targetMap.set(target, objectMap);
  }

  // WeakMap<object, Map<key, T2>> 处理 T2
  let keyDepEffectsSet = objectMap.get(key);
  if (!keyDepEffectsSet) {
    keyDepEffectsSet = new Set();
    objectMap.set(key, keyDepEffectsSet);
  }
  keyDepEffectsSet.add(activeEffect);
}

// 触发副作用函数
function trigger(target, key) {
  const keyDepEffectsSet = targetMap.get(target)?.get(key);
  if (!keyDepEffectsSet) return;
  keyDepEffectsSet.forEach((fn) => fn());
}

effect(() => {
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.text = 'change data';
}, 1000);
```

## 分支切换与 cleanup

副作用函数中存在这么一种情况，在第一次执行的时候，读取到了某个属性 a，在后面执行该副作用函数的不再读这个属性 a，由于在 targetMap 中这个在当前副作用函数中没有再读取的属性 a 已经关联了该副作用函数，那么就会造成，该属性 a 的值发生改变的时候，这个副作用函数还是会执行，这是多余的也是不对的
那么这个时候就应该想办法，让 a 和这个副作用函数的链接断开

```js
// 假设 obj 是一个响应式对象
const obj = {
  ok: true,
  text: 'hello Vue3',
};

effect(() => {
  document.body.innerText = obj.ok ? obj.text : '默认的内容';
});
// 第一次副作用函数执行的时候，读取了 obj.ok 和 obj.text，这两个属性都收集了这个副作用函数

obj.ok = false;
// 这里会触发副作用函数再次执行，这个时候，就只会读取 obj.ok 了，按理来说这个时候已经不再读取 obj.text 了，obj.text 应该和这个副作用函数不再关联，但是 obj.text 之间已经收集当前副作用函数，所以 obj.text 和 当前副作用函数的关联还是会存在，那么修改 obj.text 的时候，还是会触发当前这个副作用函数

obj.text = 'change data';
// 这里依旧会触发前面的副作用函数，但是这明显是不正确的
```

解决这个问题：_可以在每次副作用函数执行的前一刻，将该副作用函数与所有之前与该副作用函数有关系的属性都断开关联_，也就是将该副作用函数从依赖集合中删除干净。在执行副作用函数的时候，因为又会读取属性，所以又会重新将当前副作用函数与该副作用函数中读取的属性关联起来
按照这个逻辑，应该在执行该副作用函数的时候，遍历 `targetMap<object,Map<typeof any, Set<ActiveEffect>>>` 的所有 set，并且将 set 中的当前副作用函数删除掉，但是这样做的话开销会比较大（一个副作用函数中可能会读取多个对象的多个属性，所以每次都要遍历整个结构，并且遍历完整的 WeakMap）
为了解决这个开销问题，我们可以在将当前副作用函数用一个函数包裹一层函数，并在该函数上添加一个属性，存放当前副作用函数被哪些属性收集了，或者更直白的说，该属性存放的是存放了前副作用函数的 set

> 为什么不直接在副作用函数上添加属性？？？
> 不要修改传递进来副作用函数（不要修改参数）

```ts
let activeEffect;

function effect(fn) {
  const effectFn = () => {
    // 取消当前副作用函数和属性的关联
    cleanup(effectFn);
    activeEffect = effectFn;
    fn();
  };
  // effectFn.deps 也就是 activeEffect.deps 存储的就是存放当前副作用的所有 set
  effectFn.deps = [];
  effectFn();
}

// 当前副作用函数执行前将当所当前副作用函数从所有 keyDepEffectsSet 中删除
function cleanup(effectn) {
  effectFn.deps.forEach((keyDepEffectsSet) => {
    keyDepEffectsSet.delete(effectFn);
  });
  effectFn.deps.length = 0;
}

const targetMap = new WeakMap();
const data = {
  isOk: true,
  text: 'hello Vue3',
};
const obj = new Proxy(data, {
  get(target, key, recevier) {
    if (!activeEffect) return Reflect.get(target, key, recevier);
    track(traget, key);
    return Reflect.get(target, key, recevier);
  },
  set(target, key, value, recevier) {
    trigger(target, key);
    return Reflect.set(target, key, value, recevier);
  },
});
function track(target, koey) {
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
  keyDepEffectsSet.add(activeEffect);
  // 记录当前副作用函数存在于这个 set 中
  activeEffect.deps.push(keyDepEffectsSet);
}

function trigger(target, key) {
  const keyDepEffectsSet = targetMap.get(target)?.get(key);
  if (!keyDepEffectsSet) return;
  // keyDepEffectsSet.forEach((fn) => fn());
  const keyDepEffectsToRunSet = new Set(keyDepEffectsSet);
  keyDepEffectsToRunSet.forEach((fn) => fn());
}

function effectFn1() {
  document.body.innerText = obj.ok ? obj.text : '默认的内容';
}
effect(effectFn1);
obj.ok = false;
// 执行这一句的时候，触发了 set(){}，这个时候会执行 obj.ok 收集的所有副作用函数（@1 遍历 keyDepEffectsSet 并执行每一项）, 当执行到 effectFn1 时，执行的前一刻会将 effectFn1 从所有的 keyDepEffectsSet 中删除，删除完了后，执行 effectFn1，其中又读取了 obj.ok，又会触发收集，effectFn1 又被收集到了 obj.ok 对应的 keyDepEffectsSet 中。至此当前副作用函数执行完，@1 继续遍历 keyDepEfectsSet 被的下一个副作用函数并且执行。这里在 keyDepEffectsSet 的遍历过程中删除了一次 effectFn1 又添加了一次 effectFn1，由于 keyDepEffectsSet 是 Set 结构，和普通的数组不同，删除在增加后会触发第二次访问并执行 effectFn1，执行前又会先在 keyDepEffectsSet 中删除 effectFn1，然后触发 set(){}，又将 effectFn1 收集到 keyDepEffectsSet...一直这样死循环
// 解决这个问题，只需要将前面的 trigger(){} 中的 keyDepEffectsSet.forEach((fn) => fn()) 换成 const effectToRun = new Set(keyDepEffectsSet); effectToRun.forEach(fn=> fn());
//
```

## 嵌套的 effect 与 effect 栈

在 Vue 中，组件中会使用其他的组件，如果我们把一个组件的 render 当成一个副作用函数（副作用函数会在 effect 中执行）的话，那么就存在 effect 嵌套的情况

```js
effect(() => {
  Foo.render();
  effect(() => {
    Bar.render();
  });
});
```

在执行副作用函数的时候，我们的 activeEffect 会被赋值为当前的副作用函数，同时由于读取了响应式属性，该属性会收集 activeEffect。如果出现 effect 的嵌套的话，执行内部的副作用函数的时候，activeEffect 会被赋值为内部的这个副作用函数，然后进行依赖收集，当这个内的副作用函数执行完的时候，调用栈又回到了外层的副作用函数，但是由于 activeEffect 这个时候被赋值为内的副作用函数，且 activeEffect 这个时候并没有随着调用栈回到外层的副作用函数而重新重新赋值为外层的副作用函数，如果这个时候又进行了响应式属性的读取操作，那么这个时候触发依赖收集，收集的副作用函数其实是错误的，应该收集外层的这个副作用函数，但是收集成了内层的副作用函数

```ts
let activeEffect;
// 用于存储当前正在执行的 effect 栈
const activeEffectStack = [];
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    // 执行当前副作用函数前将副作用函数存入到 effect 栈中
    activeEffectStack.push(effectFn);
    fn();
    // 副作用函数执行完了，将该副作用函数从 effect 中弹出
    activeEffectStack.pop();
    // 重新将 activeEffect 赋值为当前正在执行的副作用函数
    activeEffect = activeEffectStack[activeEffectStack.length - 1];
  };
  effectFn.deps = [];
  effectFn();
}
function cleanup(effectFn) {
  effectFn.deps.forEach((keyDepEffectsSets) => {
    keyDepEffectsSet.delete(effectFn);
  });
  effectFn.deps.length = 0;
}

const targetMap: WeakMap<
  object,
  Map<typeof any, Set<ActiveEffect>>
> = new WeakMap();
const data = {
  ok: true,
  text: 'hello Vue3',
};
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
  keyDepEffectsSet.add(activeEffect);
  activeEffect.deps.push(keyDepEffectsSet);
}

function trigger(target, key) {
  const keyDepEffectsSet = targetMap.get(target)?.get(key);
  if (!keyDepEffectsSet) return;
  const keyDepEffectsToRunSet = new Set(keyDepEffectsSet);
  keyDepEffectsToRunSet.forEach((fn) => fn());
}

effect(() => {
  effect(() => {
    document.body.innerText = '执行了内部的副作用函数';
  });
  document.body.innerText = obj.ok ? obj.text : '默认内容';
});
// 页面显示 ‘执行了内部的副作用函数’
// 很快就显示 ‘hello Vue3’

obj.text = 'change data';
// 按照理论 页面应该才能从现在的显示切换成 ‘执行了内部副作用函数’ 再马上切换成 ‘change data’
// 但是如果按照原来的写会显示 ‘执行了内部副作用函数’ 就不再改变，因为 obj.ok 的副作用函数收集错了
// 我们在副作用函数执行的前一刻将其压入栈中，当副作用函数执行完的时候，就将该副作用函数从栈中弹出，这样，正在执行的副作用函数一直都处于栈顶，这样 activeEffect 的值就能准确的取得了
```

## 避免无限递归循环

当在一个副作用函数中对一个属性同时进行了读操作和写操作，当执行这个副作用函数的时候，会先触发读操作，然后进行依赖收集，收集这个副作用函数；再触发写操作，执行对应的副作用函数，由于这个属性收集了当前副作用函数，所以会执行当前副作用函数，然后又会触发这个属性的读写操作，一直这样无线循环
解决方法，就是在修改属性触发其收集的副作用函数执行的时候，只执行收集的副作用函数中和当前执行的副作用函数不相等的副作用函数，这样就不会再次出发读写操作，就不会陷入死循环

```ts
let activeEffect;
// 用于存储当前正在执行的 effect 栈
const activeEffectStack = [];
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    activeEffectStack.push(effectFn);
    fn();
    activeEffectStack.pop();
    activeEffect = activeEffectStack[activeEffectStack.length - 1];
  };
  effectFn.deps = [];
  effectFn();
}
function cleanup(effectFn) {
  effectFn.deps.forEach((keyDepEffectsSets) => {
    keyDepEffectsSet.delete(effectFn);
  });
  effectFn.deps.length = 0;
}

const targetMap: WeakMap<
  object,
  Map<typeof any, Set<ActiveEffect>>
> = new WeakMap();
const data = {
  count: 0,
};
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
  keyDepEffectsSet.add(activeEffect);
  activeEffect.deps.push(keyDepEffectsSet);
}

function trigger(target, key) {
  const keyDepEffectsSet = targetMap.get(target)?.get(key);
  if (!keyDepEffectsSet) return;
  // set 中触发副作用函数的时候，不再触发当前正在执行的副作用函数，这样就不会陷入到死循环
  const keyDepEffectsToRunSet = new Set();
  keyDepEffectsSet.forEach((effect) => {
    if (effect !== activeEffect) {
      keyDepEffectsToRunSet.add(effect);
    }
  });
  keyDepEffectsToRunSet.forEach((fn) => fn());
}

effect(() => {
  obj.count = obj.count + 1;
  document.body.innerText = ob.count;
});
```

## 调度执行

可调度：指的是当 trigger 动作触发副作用函数重新执行时，有能力决定副作用的执行时机、次数以及方式

```js
console.log('start');
const obj = { count: 0 }; // 假设该对象是一个响应式对象

effect(() => {
  document.body.innerText = obj.count;
  console.log(obj.count);
});
obj.count++;
console.log('end');

/**
 * start
 * 0
 * 1
 * end
 */
// 现在希望 1 在 end 后面输出，也就是说 obj.count++ 这一次写操作触发的其收集的副作用函数的执行要在 console.log('end') 之后执行，这里就是我们所说的可调度的一方面
```

这个时候我们就将给副作用函数添加*调度器*，来实现对副作用函数执行的调度
我们将 effect 函数的第二个参数作为配置对象，接收一些配置，包括当前副作用函数的调度器 scheduler，调度器是一个函数，该函数接收的参数就是副作用函数（当前 effect 接收的副作用函数）

```ts
let activeEffect;
const activeEffectStak = [];

// options 参数用来接收一些配置，其中包括当前副作用函数的调度器
function effect(
  fn,
  options = {
    scheduler: (fn) => {
      fn();
    },
  }
) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    activeEffectStack.push(effectFn);
    fn();
    activeEffectStack.pop();
    activeEffect = activeEffectStack[activeEffectStack.length - 1];
  };
  // 将当前副作用函数的调度器绑定在当前副作用函数上
  effectFn.options = options;
  effectFn.deps = [];
  effectFn();
}
function cleanup(effectFn) {
  effectFn.deps.forEach((keyDepEffectsSets) => {
    keyDepEffectsSet.delete(effectFn);
  });
  effectFn.deps.length = 0;
}

const targetMap: WeakMap<
  object,
  Map<typeof any, Set<ActiveEffect>>
> = new WeakMap();
const data = {
  count: 0,
};
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
  keyDepEffectsSet.add(activeEffect);
  activeEffect.deps.push(keyDepEffectsSet);
}

function trigger(target, key) {
  const keyDepEffectsSet = targetMap.get(target)?.get(key);
  if (!keyDepEffectsSet) return;
  // set 中触发副作用函数的时候，不再触发当前正在执行的副作用函数，这样就不会陷入到死循环
  const keyDepEffectsToRunSet = new Set();
  keyDepEffectsSet.forEach((effect) => {
    if (effect !== activeEffect) {
      keyDepEffectsToRunSet.add(effect);
    }
  });
  keyDepEffectsToRunSet.forEach((effectFn) => {
    // 在由修改属性触发执行其收集的副作用函数的时候，如果执行的副作用函数有调度器，就要使用调度器来执行副作用函数
    if (typeof effectFn.options?.scheduler === 'function') {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}

console.log('start');
effect(() => {
  document.body.innerText = obj.count;
  console.log(obj.count);
}， {scheduler(fn){
  Promise.resolve().then(()=> {
    fn();
  })
}});

obj.count++;
console.log('end');

/**
 * start
 * 1
 * end
 * 2
 */
```

调度器不单单能决定副作用调用的时机，还能决定副作用调用的次数

```ts
const obj = { count: 0 }; // 假设 obj 是响应式对象

effect(() => {
  document.body.innerText = obj.count;
  console.log(obj.count);
});

obj.count++;
obj.count++;
// 希望这两次的对 obj.count 的修改只会触发一次 obj.count 收集的副作用函数的执行
```

```ts
const obj = { count: 0 }; // 假设 obj 是响应式对象

const jobQueue = new Set();
let isFlushing = false;
function flushJob() {
  if (isFlushing) return;
  isFlushing = true;
  Pormise.resolve()
    .then(() => {
      // 依赖于这个 then 微任务会在同步任务后执行，如果里面的代码没有被这个微任务包裹，则会修改几次 obj.count 就触发几次副作用函数的执行
      jobQueue.forEach((effectFn) => effectFn());
    })
    .finally(() => {
      isFlushing = false;
    });
}

effect(
  () => {
    document.body.innerText = obj.count;
    console.log(obj.count);
  },
  {
    scheduler(fn) {
      jobQueue.add(fn);
      flushJob();
    },
  }
);

obj.count++;
obj.count++;
```

## 计算属性 computed 与 lazy

一个 computed 要实现

1. 惰性求值
2. 缓存
3. 自动更新：当它依赖的响应式数据发生改变的时候，它能自动的“感知”到

要实现第三点，我们必须要知道它依赖了哪些响应式数据，或者哪些响应式数据在这个 computed 的 getter 中被读取到了，自然而然的想到了 effect，传入 effect 的函数在执行的时候，会触发读取其中响应式属性的操作，读响应式数据的时候，这个响应式数据会收集传入的函数

<!-- + 解决 getter 中读取的响应式属性发生改变的时候，不马上触发 getter 的执行。第一步要改造 effect，将传入的 getter 执行的控制权放出来，向 effect 的第二个参数 options 添加一个属性 lazy，如果 lazy 为 true 的话，就不在 effect 中立即执行 getter，而是将 getter return 出去，然后在读取 computed().value 的时候才去重新执行这个 getter，同时读 computed().value 的是要获取到 getter 的返回值。 -->

computed(getter) 的返回值是 一个对象，对象有一个属性 value，value 对应的值就是 getter 执行后的返回值。
读取 computed(getter).value 的时候，如果 getter 中的响应式属性在上一次读取前发生了改变，那么会触发 getter 的执行

1. 拿到 getter 的返回值
2. 传入的 getter 的执行时机能够被外部拿到，将 getter 暴露到 effect 外（return）
3. 控制 getter 中的响应式属性发生改变，不马上触发 getter，只有在重新读 computed(getter).value 的时候才重新执行

什么是懒执行的 effect，就是传递给 effect 的副作用函数并不马上执行，而是在需要的时候才执行
我们可以通过在 effect 第二个参数中添加 lazy: true 来表明副作用函数不立马执行
computed() 会有返回值，要获取到副作用函数的返回值，必须改造一下 effect

```ts
let activeEffec;
const activeEffectStack = [];
function effect(fn, options) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    activeEffectStack.push(activeEffect);
    const res = fn();
    activeEffectStack.pop();
    activeEffect = activeEffectStack[activeEffectStack.length - 1]; // 将副作用函数的返回值 return 出去
    return res;
  };
  effectFn.options = options;
  effectFn.deps = [];
  // 只在 lazy 为 false 的时候立即执行副作用函数
  if (!options.lazy) {
    effectFn();
  }
  // 将副作用函数作为返回值返回
  return effectFn;
}

function cleanup(effectFn) {
  effectFn.deps.forEach((keyDepEffectsSet) =>
    keyDepEffectsSet.delete(effectFn)
  );
  effectFn.deps.length = 0;
}

function computed(getter) {
  let dirty = true;
  let value;
  const effectFn = effect(getter, {
    lazy: true,
    scheduler: () => {
      dirty = true; // 这里和 reacitve 对应的 scheduler 不同，而这里也是关键点；reactive 对应的这里是传入副作用函数，在副作用函数中的响应式属性改变的时候，会触发执行这里的方法；computed 的这里不接收 computed 的 getter，就不会在 getter 中的响应式属性发生改变的时候，马上执行这个 getter
    },
  });
  const obj = {
    get value() {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      return value;
    },
  };
  return obj;
}

// 假设 obj1 已经是一个响应式对象
const obj1 = {
  text: 'hello Vue3',
};
const computed1 = computed(() => obj1.text);

computed1.value;

obj1.text = 'change data';
// 这个时候，如果 debugger 的去读 computed1.value 的话，computed1.value 的值是
debugger;
computed1.value;
```

这个时候还存在一个问题，一个 computed 的 getter 读取了一个响应式属性 a，这个 computed 又被另一个副作用函数 effectFn1 读取了，这个时候响应式属性 a 发生了改变，但是副作用函数 effectFn1 并没有重新执行
这是因为 响应式属性 a 只收集了 getter，但是 getter 执行后产生的内容（computed(getter).value）没有进行副作用的收集和触发
收集我们可以放在 get value(){} 中，也就是每次读取该 computed(getter).value 的时候收集依赖，和之前的 reactive 的收集依赖相差不大
触发副作用函数的执行，在 reactive 中我们是放在 Proxy 的 set 中，并且调用的是 optins.scheduler，将收集的副作用函数作为参数传入；在 computed 里面，我们没有将 scheduler 的参数设置为副作用函数，是因为我们希望响应式属性发生了改变之后，getter 不马上执行（执行 scheduler 但是不执行 getter）。响应式属性的改变，触发 scheduler 执行，又希望触发 computed(getter).value 收集的副作用函数执行，那么可以将 track 放在 scheduler 里面执行

```ts
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
```

## watch 的实现原理

watch 观测一个响应式数据，当数据发生变化的时候，通知并执行相应的回调函数
watch(obj, cb)

```ts
// 假设 obj 已经是响应式对象
const obj = { text: 'hello Vue3' };
obj.text = 'change data';
function watch(source, cb) {
  effect(() => source.text, {
    scheduler() {
      cb();
    },
  });
}

watch(obj, () => {
  // do something
});
```

// 这样只监听了这个对象的一个属性，我们希望监听第一层

```ts
function watch(source, cb) {
  // source 可能会是 () => xxx、obj.xxx 的形式，添加 getter 变量来统一处理成一种形式
  let getter;
  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => tracerse(source);
  }
  effect(() => getter(), {
    scheduler() {
      cb();
    },
  });
}
function traverse(value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  seen.add(value);
  for (const key in value) {
    traverse(value[key], seen);
  }
  return value;
}
```
现在我们还要获取 oldValue 和 newValue
我们知道，执行完 ch 之后，newValue 就应该被赋值为 oldValue 
