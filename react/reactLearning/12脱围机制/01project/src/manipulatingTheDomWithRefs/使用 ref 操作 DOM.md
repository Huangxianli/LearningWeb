# 使用 ref 操作 DOM

在 React 中，React 会自动的处理更新 DOM 以匹配渲染输出，一般情况下是不需要手动的操作 DOM 的
但有的时候，DOM 的操作，React 并没有给出 API，这个时候就要手动操作 DOM 了，那我们就使用 ref 来中转

## 获取指向节点的 ref

```jsx
import { useRef } from 'react';
function Component() {
  const myRef = useRef(null);
  return (
    <>
      <div ref={myRef}></div>
    </>
  );
  // 这样 myRef.current 指向的就是 ref 绑定的那段 DOM
}
```

### 示例: 使文本输入框获得焦点

```jsx
import { useRef } from 'react';
export default function FormInput() {
  const inputRef = ref(null);
  const clickHandler = () => {
    ref.current.foucs();
  };
  return (
    <>
      <input ref={inputRef} />
      <button onClick={clickHandler}>input 聚焦</button>
    </>
  );
}
```

### 示例: 滚动至一个元素

```jsx
import { useRef } from 'react';
export default function Scroll() {
  const divRef = ref(new Map());
  const clickHandler = () => {
    divRef.current.get(99).scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };
  return (
    <>
      <button onClick={clickHandler}>滚动到99</button>
      <div>
        {new Array(1000).map((item, index) => (
          <div
            ref={(node) => {
              divRef.current.set(item, node);
              return () => {
                // React 19 新增的清理函数
                divRef.current.delete(item);
              };
            }}
            id={item}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
}
```

## 管理 ref 列表

```jsx
import { useRef } from 'react';
function Component () {
  const list = [
    { key: 0, value: 0 },
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 }
    ];
    const myRef = useRef(null);
    if (!myRef.current) {
      myRef.current = []
    }
  return (
    <ul>
      {
        list.map((item, index) => (
          <li key={item.key} ref={
            node => {
              if (node) {
                myRef.current[key] = node;
              } else {
                myRef.current[key] = undefined;
              }
            }
          }>{item.value}</li>
        ))
      }
    <ul>
  );
}
```

## 访问另一个组件的 DOM 节点

**手动操作其他组件的 DOM 节点可能会让代码变得脆弱**
**React 默认是不允许组件访问其他组件的 DOM 节点的，即使是自己的子组件也不行**

要是的组件能够访问领一个组件的 DOM 节点， 必须要自己组件的 Ref 转发给 要访问 DOM 所在的组件

```jsx
import { forwardRef, useRef } from 'react';

function Component() {
  const myRef = useRef(null);
  return (
    <>
      <ChildComponent ref={myRef} />
    </>
  );
}

const ChildComponent = forwardRef((props, ref) => {
  // react 18 的写法
  return (
    <>
      <input ref={ref} />
    </>
  );
});

const ChildComponent = ({ ref }) => {
  // react 19 的写法，ref 直接作为 prop 传递
  return (
    <>
      <input ref={ref} />
    </>
  );
};
```

## 暴露 组件 的一部分方法，给其他组件调用

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';
const ChildComponent = forwardRef((props, fatherRef) => {
  const myRef = useRef(null);
  function focusInput() {
    myRef.current.focus();
  }
  useImperativeHandle(fatherRef, () => ({
    // 该 hook 会将 后面第二个参数执行的返回值，赋值给第一个参数的 .current 属性上
    // 如果第一个参数是父传递过来的 ref，那么在父中就可以通过父的 ref 访问到该其中的方法
    focusInput,
  }));
  return (
    <>
      <input ref={myRef} />
    </>
  );
});

function Component() {
  const myRef = useRef(null);
  function handleClick() {
    myRef.current.focusInput();
  }
  return (
    <>
      <button onClick={handleClick}>点击</button>
      <ChildComponent ref={myRef} />
    </>
  );
}
```

## React 何时添加 refs

React 更新阶段

1. 触发
2. 渲染
3. 提交
   一般来说，不期望在 触发和渲染阶段访问 refs；React 在提交阶段设置 ref.current，还未提交，获取到的 DOM 可能就是不正确的
   所以，一般，会在事件回调中读取 refs

## flushSync 同步更新 state

```jsx
flushSync(() => {
  setter();
});
ref.current;
```

这里告诉 React 执行完 flushSync 中的回调的代码后，立即的更新 DOM，这样 ref.current 中获取的 DOM 就是最新的

## 使用 refs 操作 DOM 的最佳实践

ref 应该在只有必须跳出 React 的时候才使用，例如，例如，访问 React 中没有暴露的浏览器 API 时

注意，手动的修改 DOM 可能会与 React 所做的更改发生冲突
_应该十分的谨慎更改由 React 管理的 DOM 节点_，如果已经在上面使用了 state，那就不要再使用 ref 对其进行操作
