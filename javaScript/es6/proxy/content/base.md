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
