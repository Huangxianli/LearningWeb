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
import { useContext } from 'react';
import { MyContext } from 'context.js';

function Component1() {
  const context = useContext(MyContext);
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
        {children}
        {/* 只要在 UI 树上，属于这个 MyContext.Provider 中的组件，都可以获取到传递的 value */}
      </MyContext.Provider>
    </>
  );
};
```

## 在相同的组件中使用并提供 context

## Context 会穿过中间层级的组件

## 写在你使用 context 之前

下面两种都不能满足的时候，才使用 context

1. 从传递 props 开始
2. 抽象组件，并将 JSX 作为 children 传递给它们

## Context 的使用场景

1. 主题
2. 当前账户
3. 路由
4. 状态管理
