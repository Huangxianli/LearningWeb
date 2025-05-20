# 你可能不需要 Effect

如果没有涉及到外部系统，就不要用 Effect

## 如何移除不必要的 Effect

两种不必要使用 Effect 的情况

1. 不必使用 Effect 来转换渲染所需要的数据。例如要对数据列表数据进行一个单纯的筛选，将筛选卸载 Effect 里面，第一次渲染，渲染完成了之后，触发 Effect 中的列表数据筛选，筛选之后，如果又重新设置了这个 state，那么会重新开始渲染。正确的做法是，将过滤操作放在放在组件的顶层，如果 state 或者 prop 发生改变的时候，会自动触发渲染
2. 不必使用 Effect 来处理用户事件，如果是明确的事件触发的，应该将其写在事件里面

### 根据 props 或 state 来更新 state

**如果可以通过现有的 props 或者 state 计算出来，不要设置成新的 state，设置成普通变量，渲染中计算就可以了**

```jsx
import { useState, useEffect } from 'react';

function ChangeName() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    setFullName(firstName + lastName);
    // 这里只要 firstName 后者 lastName 其中一项发生了改变，那么就会触发组件渲染，DOM 提交后，又会触发 setFull()，然后又会触发渲染。这样就导致了渲染了两次
  }, [firstName, lastName]);
  return (
    <>
      {fullName}
      {/* 省略 fistName 和 lastName 的设置 */}
    </>
  );
}

// 修改成下面的形式
function ChangeName() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const fullName = firstName + lastName; // fullName 是在渲染中计算的
  return (
    <>
      {fullName}
      {/* 省略 fistName 和 lastName 的设置 */}
    </>
  );
}
```

### 缓存昂贵的计算

假如对 list 进行一个很费时间的操作，这个时候不应该把计算放到 Effect 中，和上面的理由一样，虽然可以避免在依赖项没有发生改变的时候重新触发计算，但是一次修改会触发两次渲染
这时候应该使用 useMemo
**传入 useMemo 的函数是在渲染中计算的，因此只能是纯函数**
注意不会让第一次渲染加快，只是可能节省后续渲染中，多余的极端

```jsx
import { useMemo, useState } from 'react';
function showList({ list, filter }) {
  const visibleList = useMemo(() => filterList(list, filter), [list, filter]);
  // 这会告诉 React，除非 todos 或 filter 发生变化，否则不要重新执行传入的函数
  return (
    <>
      {visibleList.map((item) => (
        <div key={item}>item</div>
      ))}
    </>
  );
}
```

### 当 props 变化时重置所有 state

好的做法是，在使用该组件的时候，在该组件上绑定 key，在 props 变动的时候，key 的值也改变，导致组件重新触发挂载

### 当 prop 变化时调整部分 state

直接在渲染期间修改 state，注意添加判断条件，避免陷入死循环
**虽然这种方式比 Effect 更高效，但大多数组件也不需要它**

### 在事件处理函数中共享逻辑

当你不确定某些代码应该放在 Effect 中还是事件处理函数中时，先自问 为什么 要执行这些代码。Effect 只用来执行那些显示给用户时组件 需要执行 的代码。

### 发送 POST 请求

如果是在特定的用户交互引发的，放在事件回调中
如果是在屏幕上看到组件出现时引发的，放在 effect 中

### 链式计算

### 初始化应用

- 添加顶层变量
- 在模块初始化之前就执行

### 通知父组件有关 state 变化的信息

### 将数据传递给父组件

当在子组件中更新父组件的 state，会使得 state 的变化难以追踪，好的操作是，将更新要用到的数据提升到父组件，在父组件中直接更新

### 订阅外部 store

### 获取数据
