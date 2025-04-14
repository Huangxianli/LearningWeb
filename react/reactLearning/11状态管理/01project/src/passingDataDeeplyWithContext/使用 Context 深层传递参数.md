# 使用 Context 深层传递参数

## 传递 props 带来的问题

传递 props 是将数据通过 UI 树显示的传递到使用它的组价的好方法
如果状态提升到太高的层级就 hi 导致“逐层传递 props”的情况

## Context：传递 props 的另一种方法

### Step 1：创建 context

```jsx
// context.js
import { createContext } from 'react';
export const MyContext = createContext(initValue);
```

### Step 2：使用 Context

```jsx
import { useContext } from 'react'; // useContext() 可以获取到当前 context 传递的值
import { MyContext } from 'context.js';

function Component1() {
  const context = useContext(MyContext); // 获取到 MyConetxt 传递的 value，当其祖父组价没有使用 <MyContext.Provider> 的时候，context 的值才是 createContext(initValue) 的 initValue 值
  return <>{/* ... */}</>;
}
```

### Step 3：提供 context

```jsx
import { MyContext } from 'context.js';

function Component2({children}) {
  return (
    <>
      <MyContext.Provider value={}>
        {/* 传递 value */}
        {children}
        {/* 只要在 UI 树上，属于这个 MyContext.Provider 中的组件，都可以获取到传递的 value */}
      </MyContext.Provider>
    </>
  );
};
```

## 在相同的组件中使用并提供 context

在一个组件里面，既进行 `useContext(Context1)`，又进行 `<Context1.Provider value={}>`
`useContext(Context1)` 获取到的值，是离当前组件最近的使用了 `<Context1.Provider value={}>` 的祖先组件的 value

## Context 会穿过中间层级的组件

## 写在你使用 context 之前

下面两种都不能满足的时候，才使用 context

1. 从传递 props 开始
2. 抽象组件，并将 JSX 作为 children 传递给它们。假如可能想传递一些像 posts 的数据 props 到不会直接使用这个参数的组件，类似 `<Layout posts={posts} />`。取而代之的是，让 Layout 把 children 当做一个参数，然后渲染 `<Layout><Posts posts={posts} /></Layout>`。这样就减少了定义数据的组件和使用数据的组件之间的层级。

## Context 的使用场景

1. 主题
2. 当前账户
3. 路由
4. 状态管理
