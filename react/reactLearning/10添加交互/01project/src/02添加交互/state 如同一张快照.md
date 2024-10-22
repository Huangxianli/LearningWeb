# state 如同一张快照
设置state不会更改已有的state变量，但是会触发重新渲染

## 设置 state 会触发渲染
要使界面对输入做出反应，需要设置其state

直接修改 state 变量的值不会触发重新渲染，要使用 state setter 函数才能触发重新渲染，注意只有在前后两次通过Object.is()比较的之后为false的时候，才会触发渲染
> Object.is(NaN, NaN); // true
> Object.is(+0, -0); // false
> // 这两项和 === 完全相反

## 渲染会及时生成一张快照
从函数返回的JSX就像是UI的一张及时的快照。它的props、事件处理函数和内部变量都是*根据当前渲染时*的state被计算出来的

当React重新渲染一个组件时：
1. React会再次调用函数
2. 函数会返回新的JSX快照
3. React会更新界面已匹配返回的快照

state 变量不同于函数中的普通变量。当React调用组件的时候，它会为特定的那一次渲染提供一张 state 快照。组件会根据当前的state在其JSX中返回一张包含一整套新的props和事件处理函数的UI快照（所有的值都是根据当前的state快照的值计算出来的）。

state setter（） =》 将值或者更新函数压入到更新队列 =》 触发组件函数重新调用 =》 React更新state的值 =》 React向组件内传入一张state快照 =》 根据state快照的值在组件的JSX中返回一张包含一整套props和事件处理函数的UI快照

## 数时间变化的 state
*一个 state 变量的值，永远不会在一次渲染的内部发生变化*
React会使 state 的值始终固定在一次渲染的各个事件处理函数的内部，无需担心运行时 state 会发生改变

