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
    type: 'add', // 一般会取名 what happened
  });
}
```

### 第 2 步: 编写一个 reducer 函数

告诉 React 如何实现所有的 action，也就是如何实现所有的目的
由于 reducer 函数接受 state 作为参数，因此你可以在组件之外声明它
resucer 也应该是一个纯函数，一个参数是当前的 state，第二个参数是 action，返回值是更新后的 state

```jsx
function yourReducer(state, action) {
  // 理解语义，对 state 进行操作，第一个参数是 state，第二个参数是 action
  switch (action.type) {
    case 'add': { // 一般会是 what  happened
      return newState; // 返回跟新后的 state
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
  // 对 reducer 进行操作，所以第一个参数是 reducer，reducer 函数是对 state 进行操作，第二个参数是 state

  dispath({
    type: actionName,
  });
}
```

## 对比 useState 和 useReducer

## 编写一个好的 reducers

1. reducers 必须是纯粹的。和状态更新函数是相似的，reducers 是在渲染时运行的！输入相同时，输出也应该相同；不应该包含任何异步请求等副作用；reducer 中对 state 的更新应该是以不可变值的方式去更新
2. 每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。例如：一个按钮重置表单，但是表单有多个表单项，那么一个 dispatch 比多个 dispatch 更加合理

如果在一个事件回调函数中调用两次的话，state 的值是什么？？？
假如在一个事件回调中 调用两次 dispatch，第一次 dispatch 如果对 state 进行了更新，这个时候通过调用 useReducer(reducer, initState) 解构出来的 state 的值在这个事件回调中还是更新前的值，这里的表现和 useState(initState) 是一样的；myReducer(state, action) 的第一个参数的表现不同一些，这里的第一个参数 state 在调用一个 dispatch 之后就会更新，所以每次调用 dispatch 触发 myReducer 的时候，第一个参数 state 都会是最新的

```js
// useReducer 的简易实现
function useReducer(myReducer, initState) {
  const [state, stateSetter] = useState(initState);
  function dispatch(action) {
    stateSetter((n) => myReducer(n, action));
  }
  return [state, dispatch];
}
```

## 使用 Immer 简化 reducer

```jsx
import { useImmerReducer } from 'use-immer';
// 使用 useImmerReducer 替换 useReducer

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        // 主要的修改是在这里
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }
  return <></>;
}

const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '打卡列侬墙', done: false },
];
```
