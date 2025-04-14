# 使用 Reducer 和 Context 扩展你的应用

## 结合使用 reducer 和 context

将 dispatch 和 状态 都放入到 context 中，这样就可以在子组件中，无需 props 传递的修改状态
state 利用一个 context 传递，dispatch 利用一个 context 传递

### 第一步: 创建 context

```jsx
// context.js
import { createContext } from 'react';
const TaskContext = createContext(null);
const TaskDispatchContext = createContext(null);
export { TaskContext, TaskDispatchContext };

// reducers.js
export function reducers(state, action) {}

// FatherComopont.js
import { useReducer } from 'react';
import { reducers } from 'reducers.js';

export default function FatherComponent() {
  const [task, dispatch] = useReducer(reducers, initState);
  return <>{/*  */}</>;
}
```

### 第二步: 将 state 和 dispatch 函数 放入 context

```jsx
// FatherComopont.js
import { useReducer } from 'react';
import { reducers } from 'reducers.js';
import { TaskContext, TaskDispatchContext } from 'context.js';
import ChildComponent from 'ChildComponent.js';

export default function FatherComponent() {
  const [task, dispatch] = useReducer(reducers, initState);
  return (
    <>
      <TaskContext.Provider value={task}>
        <TaskDispatchContext.Provider value={dispatch}>
          <ChildComponent></ChildComponent>
        </TaskDispatchContext.Provider>
      </TaskContext.Provider>
    </>
  );
}
```

### 第三步: 在组件树中的任何地方使用 context

```jsx
// ChildComponent.js
import { useContext } from 'react';
import { TaskContext, TaskDispatchContext } from 'context.js';
export default function ChildComponent() {
  const task = useContext(TaskContext);
  const taskDispatch = useContext(TaskDispatchContext);
  return <>{/*  */}</>;
}
```

## 将相关逻辑迁移到一个文件当中
