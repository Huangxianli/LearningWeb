## Rudex 是什么
全局状态单一管理库
是一个使用“action”的事件来管理和更新应用状态的模式和工具库

Redux 是一个小型的独立 js 库，经常与几个包一起使用

+ React-Redux
  让 React 组件访问 state 片段和 dispatch action 更新 store，将 React 和 Redux 集成起来 
+ React-Toolkit
  简约大多数的 Redux 任务
+ Redux DevTools扩展
  调试工具

### 术语
+ Action
  是一个拥有 type 字段的普通 js 对象
+ Action Creator
  是一个创建并返回一个 Action 对象的函数
+ Reducer
  是一个函数，接受当前 state 和一个 action 对象，必要是决定如何更新，返回新的状态
  可以当成是一个事件监听器，根据接受的 action 类型来处理事件
  要求：
  + 仅使用 state 和 action 参数计算新的状态值
  + 禁止直接更改 state
  + 禁止任何的异步逻辑、依赖随机值、导致其他“副作用”的代码
+ Store
  Redux 应用的 state 中存在 store 对象
  const store = createReducer(reducer)
  store.getState()
+ Dispatch
  store 有一个 dispatch 方法
  store.dispatch(action)
  dispatch 之后，立马就能获取到最新的 state store.getState()
+ Selector
  selector 函数从 store 状态树中提取指定的偏酸
  const selectCounter = state => state.count
  const currentValue = selcetCounter(store.getState())

### Redux 数据流
+ 初始阶段
  + 使用顶层的 root reducer 函数创建 Redux store
  + store 调用一次 root reducer，并将返回值保存为它的初始 state
  + 当视图 首次渲染时，视图组件访问 Redux store 中的当前 state，并使用响应的数据呈现。同时监听 store 的更新，以便于知道 state 是否已经更改
+ 更新环节
  + dispatch 一个 action
  + store 用 之前的 state 和 dispatch 的 action 来执行 reducer，将返回值保存为新的 state
  + store 通知所有订阅了的视图，通知它们 store 发生了改变
  + 收到通知的视图检查自己部分的 state 是否被更新
  + 被更新 state 的视图，强制使用新的数据渲染，网页更新

## Rudex 核心包做了什么
提供了一些下的 API 原语
+ createStore
+ combineReducers
+ applyMiddleware
+ compose

## 结构
### configureStore
传入一个 reducer 对象参数，最后生成 store

### Redux Slice
slice 是应用中 单个功能的 Redux reducer 逻辑和 action 的合集
```js
import { createSlice } from '@rudexjs/toolkit';

const slice = createSlice({
  // name 属性会作为每个 action type 的第一部分 "counter/ "
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    add: (state, action) => {  
      return {
        ...state, 
        value: state.value + 1,
        }; 
    },
    mul: state => {
      return {
        ...state,
        value:  state.value * 2,
      };
    }
  }
});
// slice 是 action 和 reducer 的合集

// slice.actions 可以结构出来 reducers 中同名的 action 创造函数
const { add } = slice.actions;
console.log(add); // { type: 'counter/add' }
// slice.actions.add() 一样的效果

// slice.reducer
```

### Reducer 的规则
+ 仅用 state 和 action 参数计算新的状态值
+ 禁止直接修改 state
+ 禁止任何的异步逻辑

### 使用 Thunk 编写异步逻辑
thunk 是一种特定的 Redux 函数，可以包含异步逻辑。由两个函数编写
+ 一个内部的 thunk 函数，以 dispatch 和 getState 最为参数
+ 外部创建者函数，它创建并返回 thunk 函数

```js
const addAsync = amount => (dispatch, getState) = > {
  setTimeout(()=> {
    dispatch(actionCreate(amount))
  }, 1000)
}
```

### useSelector 和 useDispatch
useSelector 让我们的组件从 Redux 的 store 状态树中提取任何数据

```js
import { useSelector, useDispatch } from 'react-redux';

const selectCount = state => state.counter.value;

const count = useSelector(selectCount);
const dispatch = useDispatch();
```

### 是否放在 Rudex store 中
+ 应用中的其他部分是否关心这些数据
+ 是否需要基于一些原始数据创建进一步的派生数据
+ 是否使用相同的数据驱动多个组件
+ 是否将这种状态恢复到给定的时间点（时间旅游调试）是否有价值
+ 是否要缓存数据
+ 是否虚妄在二重在视图组件时保持数据一致

### Provider 
```jsx
import ReactDOM from 'react-dom'

import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```