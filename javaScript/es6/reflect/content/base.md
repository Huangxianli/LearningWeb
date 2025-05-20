# Reflect

## 概述

`Reflect` 对象和 `Proxy` 对象一样，也是为了操作对象而提供的新的 `API`

目的：

1. 将 `Object` 对象与一些明显属于语言内部的方法（`Object.defineProperty`），放到 `Reflect` 对象上。目前只是在 `Object` 和 `Reflect` 对象上都有部署，未来只是在 `Reflect` 上部署
2. 修改某些 `Object` 方法的返回结果，让其变得更加的合理，如有些报错结果变成返回 `false`，例如 `Object.defineProperty()` 失败的话会报错，`Reflect.defineProperty()` 失败会返回 `false`
3. 让 Object 操作都变成函数行为，例如 `in` 和 `Reflect.has()`、`delete` 和 `Reflect.deletProperty()`
4. `Reflect` 对象的方法与 `Proxy` 对象的方法一一对应，只要是 `Proxy` 对象的方法，就能在 `Reflect` 对象上找到对应的方法。无论 `Proxy` 怎么修改默认行为，都可以在 `Reflect` 上获取默认行为

## 静态方法

13 个静态方法

- `Reflect.apply(target, thisObj, args)`
- `Reflect.construct(target, args)`
- `Reflect.get(target, propKey, receiver)`
- `Reflect.set(target, propKey, value, receiver)`
- `Reflect.defineProperty(target, key, desc)`
- `Reflect.deletProperty(target, key)`
- `Reflect.has(target, key)`
- `Reflect.ownKeys(target)`
- `Reflect.isExtensible(target)`
- `Reflect.preventExtensions(target)`
- `Reflect.getOwnPropertyDescriptor(target, key)`
- `Reflect.getPrototypeOf(target)`
- `Reflect.setPrototypeOf(target, proto)`

### Reflect.get(target, propKey, receiver)

读取对象的属性，如果属性是 `getter`，而且传入了 `receiver`，那么其中的 `this` 指向的是 `receiver`

```js
const prototypeObj = {
  prototypeKey: 1,
};
const targetObj = {
  key1: 2,
  get key2() {
    return this.key1 + 1;
  },
};
Object.setPrototypeOf(targetObj, prototypeObj);

Reflect.get(targetObj, 'prototypeKey'); // 1
Reflect.get(targetObj, 'key2'); // 3
Reflect.get(targetObj, 'key2', { key1: 4 }); // 5
```

### Reflect.set(target, keyProp, value, receiver)

设置 target 的 keyProp 属性为 value
如果属性设置了赋值函数，且 Reflect.set 传入了 receiver，那么赋值函数中的 this 指向的是 receiver

```js

```
