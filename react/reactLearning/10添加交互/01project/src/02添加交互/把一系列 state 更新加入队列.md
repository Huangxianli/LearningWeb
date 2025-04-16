# 把一系列 state 更新加入队列

设置组件 state 会把一次重新渲染加入队列（不是直接更新）

## React 会对 state 更新进行批量处理

每次渲染的 state 值都是固定的，一次渲染中，state 的值只会有一个

React 会等到事件处理函数中的所有代码都运行完毕之后再处理 state 更新，并不是说一调用 setter 函数，就进行更新

## 在下次渲染前多次更新同一个 state

state setter(n => n + 1);

1. React 会将此函数加入队列，以便在事件处理函数中的所有其他代码运行后处理
2. 在下一次渲染期间，React 会遍历队列并给出更新之后的最终的 state

**更新函数也要是纯函数**
setter(1) 相当于 setter(n => 1)
setter(n => n + 1) 中的更新函数的**参数 n 是该 state 上一个更新函数的返回值**

> 注意：直接访问 state，获取到的都是当前的快照的值，即使是在更新函数里面

### 如果你在替换 state 后更新 state 会发生什么

setter(5);
setter(n => n + 1);
n => 5
5 => 5 + 1

### 如果你的更新 state 后替换 state 会发生什么

setter(n => n + 5);
setter(1);
0 => 0 + 5
5 => 1
