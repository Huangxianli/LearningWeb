# Proxy

## 概述

**Proxy 用于修改默写操作的默认行为，等同于在语言层面做出修改**，属于一种“元编程”，即对编程语言进行编程

> 可以理解成：在目标对象之前进行一层“拦截”，外界对该对象的访问都必须通过这一层拦截，可以通过这个对外界的访问进行过滤和改写

**Proxy 可以翻译为“代理器”**

```js
const obj = new Proxy({}， {
  // obj 对象就是对 {} 进行了一次拦截后的拦截器对象，重新定义了 get 和 set 行为
  get(target, propKey, receiver) {
    console.log('get');
    return Reflect.get(target, propKey, receiver);
  },
  set(target, propKey, value, receiver) {
    console.log('set');
    return Reflect.set(target, propKey, value, reciever)
  },
});
```

Proxy 的第一个参数是需要代理的对象，第二个参数是覆写对象的操作的配置对象，_如果是传递一个空对象，那么访问生成的 Proxy 对象就相当于访问原对象_，注意，这个时候，原对象和生成的代理器对象依旧不是同一个对象

```js
const originObj = {};
const obj = new Proxy(originObj, {});
obj.a = 1;
originObj.a; // 1
obj === originObj; // false
```

Proxy 支持拦截的操作

- get(target, propKey, receiver) 属性的读取
- set(target, propKey,value, receiver) 属性的设置
- has(target, propKey) `propKey in proxy`
- deletProperty(target, propKey) `delete propKey`
- ownKeys(target) `Object.getOwnPropertyNames(proxy)`、`Object.getPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`
- getOwnPropertyDescriptor(target, propKey) `Object.getOwnPropertyDescriptor(proxy, propKey)`
- defineProperty(target, propKey, propDesc) `Object.defineProperty(proxy, propKey, propDesc)`、`Object.defineProperties(proxy, propKey)`
- preventExtensions(target) `Object.preventExtensions(proxy)`
- getPrototypeOf(target) `Object.getPrototypeOf(proxy)`
- isExtensible(target) `Object.isExtensible(proxy)`
- setPrototypeOf(target, proto) `Object.setPrototypeOf(proxy, proto)`
- apply(target, object, args) Proxy 实例作为函数调用的操作，比如 `proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`
- construct(target, args) `new proxy(...args)`

## Proxy 实例的方法

### get(target, propKey, receiver)

用于拦截某个属性的读取操作

```js
const obj = {};
const proxyObj = new Proxy(obj, {
  get(target, propKey, receiver) {
    return receiver;
  },
});

const obj1 = Object.create(proxyObj);
obj1.a === obj1; // true
```

target：obj
receiver：指代的是读操作所在的那个对象，不一定永远的指向 proxyObj

> 注意：不是所有的属性都能被代理，如果一个属性的 `configurable` 和 `writable` 都为 `false`，则不能被代理，访问的时候，会报错

### set(target, propKey, value, receiver)

拦截属性的赋值操作
receiver 表示的*原始操作行为所在的那个对象*，并非永远都是 proxy 对象
例如涉及到一个 proxy 对象作为 a 对象的原型对象的时候，修改 a 对象本身不存在的属性，这个时候会找到原型上，然后进入该 proxy 对象的 set 中，这个时候 set 中的 receiver 指向的是 a，而不是 proxy 对象

```js
const targetObj = {};
const proxy = new Proxy(targetObj, {
  set(target, propKey, value, receiver) {
    if (propKey === 'age') {
      if (typeof value !== 'number' || Number.isNaN(value)) {
        throw new Error('age 只能是非 NaN 的 number 类型');
      }
    }
    target[propKey] = value;
    return true;
  },
});

proxy.age = 12;
proxy.age = '12'; // 报错
```

**如果目标对象某个属性是不可写的，那么 set 方法会不起作用**，但是不会报错
`writable: false`

**在严格模式下，set 中要 return true，不然会报错**

### apply(target, thisObj, args)

拦截函数的调用、call、apply、bind 生成的函数的调用
执行上述的操作，就是执行 proxy 中的 apply

> 注意：bind 之后生成的函数和箭头函数的 this 是不能被覆盖的

```js
const targetFun = function () {};
const proxy = new Proxy(targetFun, {
  apply(target, thisObj, args) {
    return target.apply(thisObj, args);
  },
});
```

### has(target, key)

拦截 `HasProperty` 操作，判断某个对象是否有某个属性时，这个方法会生效。最典型的操作就是 `in` 操作（`with` 操作也会被拦截）

如果原生对象*不可配置或者禁止扩展，该拦截会报错*

> 注意：拦截的是 `HasProperty` 而不是 `HasOwnProperty` 操作，使用 `Object.prototype.hasOwnProperty()` 不会拦截，`for...in` 也不会拦截，`for...in` 是遍历所有的可遍历的属性

### construct(target, args, newTarget)

用于拦截 `new` 命令

```js
const targetFun = function () {
  this.a = 1;
};
const proxy = new Proxy(targetFun, {
  construct(target, args, newTarget) {
    return target(...args);
  },
});
```

`targetFun` 必须是一个函数
`construct()` 必须返回一个对象，否则报错
`construct()` 里面的 `this` 指向的是配置对象，而不是最终的实例对象

### deleteProperty(target, key)

用于拦截 `delete` 操作，如果抛出错误或者返回 `false`，单签属性就无法被 `delete` 命令删除

```js
const targetObj = {
  name: '',
};
const proxy = new Proxy(targetObj, {
  deleteProperty(target, key) {
    delete target[key];
    return true;
  },
});

delete proxy.name;
```

目标对象*属性不可配置则不能被删除，会报错*

### defineProperty(target, key, descriptor)

拦截 `Object.defineProperty()` 操作

> 注意：也会影响到 `set` 操作，不会影响 `get` 操作

`return true` 表示操作成功
`return false` 表示操作失败

如果**目标对象不可扩展，则 defineProperty() 不能增加目标对象上不存在的属性，会报错**
如果**不可写或者不可配置，则不能改变这两个配置**

### getOwnProprtyDescriptor(target, key)

拦截 `Object.getOwnPropertyDescriptor()`，返回一个属性描述对象或者 `undefined`

```js
const targetObj = {};
const proxy = new Proxy(targetObj, {
  getOwnPropertyDescriptor(target, key) {
    return Object.getOwnPropertyDescriptor(target, key);
  },
});
```

### getPrototypeOf(target)

拦截获取对象原型的操作

- `Object.prototype.__proto__`
- Object.prototype.isPrototypeOf()
- Object.getPrototypeOf()
- Reflect.getPrototypeOf()
- instanceof

`getPrototyeOf()` 的*返回值必须是对象后者是 `null`，否者会报错*
_如果目标对象不可扩展，必须返回目标对象的原型对象_

### isExtensible(target)

拦截 `Object.isExtensible()` 操作
`Object.preventExtensions()`：将对象变为不可扩展，即禁止添加新的属性（可以修改和删除），不会影响原型链

### isExtensible(target)

拦截 `Object.isExtensible()` 操作
只能返回布尔值，非布尔值会被自动的转化成布尔值
_返回值必须与目标对象的 `isExtensible` 属性保持一致，不然会报错_

```js
const targetObj = {};
const proxy = new Proxy(targetObj, {
  isExtensible(target) {
    return Object.isExtensible(target);
    // 注意这里的返回值要满足的条件
  },
});
```

### ownKeys(target)

用来拦截对象自身属性的读取操作

- Object.getOwnPropertyNames()
- Object.getOwnPropertySymbols()
- Object.keys()
- for...in

**返回一个数组，数组项只能是 `String` 和 `Symbol` 类型，即使是 `Number` 类型都不可以**

在普通情况下，当调用上面的方法的时候，会按照该方法原先的规则，对 `ownKeys` 返回的数组再进行一次过滤

```js
const prototypeObj = {
  prototypeKey1: '',
};
const targetObj = Object.setPrototypeOf({ 1: '' }, prototypeObj);
Object.defineProperty(targetObj, 2, {
  enumerable: false,
});
const proxy = new Proxy(targetObj, {
  ownKeys(target) {
    return ['1', '2', '3', Symbol.for('3'), 'prototypeKey1'];
  },
});

Object.keys(proxy); // ['1']
```

**如果目标对象中包含不可配置的属性，那么 `ownKeys` 中必须返回该属性，不然会报错**
**如果目标对象本身是不可扩展的，那么 `ownKeys` 必须返回目标对象的所有属性，不能多也不能少，否则会报错**

### preventExtensions(target)

拦截 `Object.preventExtensions()`，返回一个布尔值
**只有 `Object.isExtensible(proxy)` 为 `false` 的时候，`proxy.preventExtensions()` 才能返回 `true`，否则会报错**

### setPrototypeOf(target, proto)

拦截 `Object.setPrototypeOf()` 方法
**如果目标对象是不可扩展的，那么 `setPrototypeOf()` 方法不能改变目标对象的原型**

## Proxy.revocable()

`Proxy.revocable()` 返回一个可以取消的 `Proxy` 实例

```js
const target = {};
const { proxy, revoke } = Proxy.revocable(target, {});
proxy.age = 12;
proxy.age; // 12

revoke();
proxy.age; // 报错
```

## this 的问题

`target` 对象和其 `proxy` 对象的 `this` 指向不一样

`proxy` 拦击拦截函数内部的 `this` 指向的是配置对象
