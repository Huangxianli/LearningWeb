# 迁移状态逻辑至 Reducer 中

对于拥有许多状态更新逻辑的组件来说，过于分散的事件处理程序可能会令人不知所措，可以将多有状态更新逻辑整合合并到一个外部函数中，这个函数叫 reducer
reducer：一个组件之外更新状态逻辑的函数

## 使用 reducer 整合状态逻辑

组件状态的更新逻辑会随着组件的复杂程度越来越难理清
将状态逻辑迁移到组件之外的 reducer 函数中

### 第 1 步: 将设置状态的逻辑修改成 dispatch 的一个 action

dispatch 的对象就是 action
告诉 React 这一部分的操作是要达到什么目的

```jsx
function clickHandler() {
  dispatch({
    type: 'add',
  });
}
```

### 第 2 步: 编写一个 reducer 函数

告诉 React 如何实现所有的 action，也就是如何实现所有的目的

```jsx
function yourReducer(state, action) {
  switch (action.type) {
    case 'add': {
      return newState;
    }
    default {
      return ...
    }
  }
}
```

### 第 3 步: 在组件中使用 reducer

```jsx
import { useReducer } from 'react';
function Component() {
  // const [state1, setState1] = useState(initStateValue);
  const [state1, dispatch] = useReducer(yourReducer, initStateValue);

  dispath({
    type: actionName,
  });
}
```

## 对比 useState 和 useReducer

## 编写一个好的 reducers

1. reducers 必须是纯粹的。和状态更新函数是相似的，reducers 是在渲染时运行的！输入相同时，输出也应该相同；不应该包含任何异步请求等副作用
2. 每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化

如果在一个事件回调函数中调用两次的话，state 的值是什么？？？
