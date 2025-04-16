# state 如同一张快照

设置 state 不会更改已有的 state 变量（在一次渲染中，state 的值是固定的），但是会触发重新渲染

## 设置 state 会触发渲染

要使界面对输入做出反应，需要设置其 state

直接修改 state 变量的值不会触发重新渲染，要使用 state setter 函数才能触发重新渲染，注意只有在前后两次通过 Object.is()比较的之后为 false 的时候，才会触发渲染

> Object.is(NaN, NaN); // true
> Object.is(+0, -0); // false
> // 这两项和 === 完全相反

## 渲染会及时生成一张快照

从函数返回的 JSX 就像是 UI 的一张及时的快照。它的 props、事件处理函数和内部变量都是*根据当前渲染时*的 state 被计算出来的

当 React 重新渲染一个组件时：

1. React 会再次调用函数
2. 函数会返回新的 JSX 快照
3. React 会更新界面已匹配返回的快照

state 变量不同于函数中的普通变量。当 React 调用组件的时候，它会为特定的那一次渲染提供一张 state 快照。组件会根据当前的 state 在其 JSX 中返回一张包含一整套新的 props 和事件处理函数的 UI 快照（所有的值都是根据当前的 state 快照的值计算出来的）。

state setter（） =》 将值或者更新函数压入到更新队列 =》 触发组件函数重新调用 =》 React 更新 state 的值 =》 React 向组件内传入一张 state 快照 =》 根据 state 快照的值在组件的 JSX 中返回一张包含一整套 props 和事件处理函数的 UI 快照

## 随时间变化的 state

_一个 state 变量的值，永远不会在一次渲染的内部发生变化_
React 会使 state 的值始终固定在一次渲染的各个事件处理函数的内部，无需担心运行时 state 会发生改变
