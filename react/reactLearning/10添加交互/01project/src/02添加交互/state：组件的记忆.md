# State：组件的记忆

组件需要“记住”某些东西，在 React 中，这种组件特有的记忆称之为 state

## 当普通的变量无法满足时

普通变量会面临的问题：

1. 局部变量无法在多次渲染中持久保存
2. 更改局部变量不会触发渲染

### useState Hook

1. State 变量用于存储*渲染间*的数据
2. State Setter 函数更新变量并触发 React 组件*再次渲染*

## 添加一个 State 变量

1. 组件外部 import { useState } form "react";
2. 解构出 state 和 stateSetter： const [state , setState] = useState(initValue);

### 剖析 useState

每次重新渲染组件的时候，useState 会返回一个包含两个值的数组
useState 用于解决之前普通变量可能会遇到的问题

1. state 变量会*保存上次渲染的值*
2. state setter 函数，用于*更新 state 变量*，并*触发 React 重新渲染*

## 赋予一个组件多个 State 变量

在一个组件中可以有*任意多、任意种类种类*的 state 变量
如果很多时候，总是同时更新多个 state 变量，可以将多个 state 变量合并成一个（一个优化策略）

**在同一组件的每次渲染中，Hooks 都依托于一个稳定的调用顺序**
在 React 内部，为每个组件保存了一个数组，每一项都是一个 state 对：[state, stateSetter0]。
它维护当前 state 对的索引值，在渲染之前将其值设置为“0”。
每次调用 useState 的时候，React 就会提供一个 state 并增加索引值。
所以，useState 要放在组件的顶部，不要在判断条件中使用 useState；
如果在条件判断中执行 useState，第一次渲染的时候，如果条件为 true，那么会执行这个 hook，在数组中添加一项 [value, setValue]，这个时候的 index 为 0，在这次渲染中再遇到 useState 的时候，会增加 index，并且向数组中添加对应的 state 项（注意这个数组在 React 组件销毁之前都会存在）；
在第二次渲染的时候，遇到 useState 执行就会去组件中查找对应的下标（第一次执行为 0，执行一次就加 1），如果在第二次渲染的时候，条件为 false，将不会执行 useState，这个时候，下标没有改变，那么后面获取到的 state 的值和更新函数会错位

```js
let componentHooks = [];
let currentHookIndex = 0;

// useState 在 React 中是如何工作的（简化版）
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // 这不是第一次渲染
    // 所以 state pair 已经存在
    // 将其返回并为下一次 hook 的调用做准备
    currentHookIndex++;
    return pair;
  }

  // 这是我们第一次进行渲染
  // 所以新建一个 state pair 然后存储它
  pair = [initialState, setState];

  function setState(nextState) {
    // 当用户发起 state 的变更，
    // 把新的值放入 pair 中
    pair[0] = nextState;
    updateDOM();
  }

  // 存储这个 pair 用于将来的渲染
  // 并且为下一次 hook 的调用做准备
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

// 这个函数里面处理
function updateDOM() {
  // 在渲染组件之前
  // 重置当前 Hook 的下标
  currentHookIndex = 0;
}
```

## State 是隔离且私有的

如果渲染同一个组件两次，每个副本的 state 是完全隔离的，改变其中组件的 state 不会影响另一个组件的 state

如果想要共享 state，应该将要共享的 state 提升到共同的父组件
