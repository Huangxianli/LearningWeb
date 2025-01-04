# 使用 ref 引用值
想要记住某些信息，但是又不想 触发新的渲染 时，可以使用 ref

## 给你的组件添加 ref
```jsx
import { useRef } from 'react';
function Component () {
  const ref1 = useRef(0);
  console.log(ref1); // { current: 0 }
  
  // ref1.current 是可写也可读的 使得ref成为 React 单向数据流的脱围机制
};
```

React 会在 组件每次渲染时，*都保留之前的 ref*； 更新 ref.current 的值，*不会触发渲染*

## ref 和 state 的不同之处
| ref                                         | state                                                |
| ------------------------------------------- | ---------------------------------------------------- |
| const ref = useRef(initValue)               | const [state, setState] =useState(initValue)         |
| 更新ref不会触发渲染                         | 更新state会触发渲染                                  |
| 可以在*渲染的过程之外*直接修改 current 的值 | 必须使用setter函数来修改state的值，从而排队重新渲染  |
| *不应该在渲染期间读取或者写入current的值*   | 可以任意时刻读取，但是每次读取的只是当当前渲染的快照 |

为什么在渲染期间不要读取修改ref的current：
ref的current在修改的时候，不会触发页面的更新，如果在页面中显示了该属性，即使修改了，页面显示的和代码中实际的值的是不同的

*原则上 useRef 是可以在 useState 的基础上实现的*
```jsx
function useRef(initValue) {
  const [ref, setRef] = useState({current: initValue});
  return ref;
}
```

## 何时使用 ref
跳出 React 与外界通信，可以使用 ref
> 注意：使用 ref 的时候，一般不会影响组件外观的浏览器 API
1. 存储 timeoutId
2. 存储 DOM
3. 存储不要被计算的 JSX 的其他对象

重要的是
1. 记忆
2. 不影响渲染

## ref 的最佳实践
1. 将 ref 视为脱围机制
2. 不要在渲染的过程中读取或写入 ref.current

## ref 和 DOM
```jsx
<div ref={myRef}></div>
```
