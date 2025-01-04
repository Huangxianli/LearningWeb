# 使用 Effect 同步
组件需要与外部系统同步

## 什么是 Effect，它与事件（event）有何不同？
React 组件中的两种逻辑类型
1. 渲染逻辑代码
2. 事件处理程序

但是有的时候这些不一定能够满足条件，*Effect 允许指定由渲染本身而不是特定事件引起的副作用*
Effect 在屏幕更新后的 *提交阶段* 运行

## 你可能不需要 Effect
Effect 通常用于暂时的跳出 React，用来与外部进行同步
如果想用 Effect 仅根据其他状态调整某些状态，那么可能不需要 Effect 

## 如何编写 Effect
### 第一步：声明 Effect
```jsx
import { useEffect } from 'react';
function Component () {
  useEffect(()=> {});
};
```
useEffect 在提交阶段执行，也就是在渲染之后执行，如果在其中更新state，可能会导致死循环

### 第二步：指定 Effect 依赖
```jsx
import { useEffect } from 'react';
function Component () {
  useEffect(()=> {}, []);
  /**
   * 传入 [变量]，在变量与上次渲染的值不同的时候，才会重新执行 （Object.is()）
   * 传入 []，只会在挂载之后执行一次
   * 什么都不传，每次渲染后都会执行
   */
};
```

### 第三步：按需添加清理（cleanup）函数
```jsx
import { useEffect } from 'react';
function Component () {
  useEffect(()=> {
    return () => {};
    // 在组件被卸载，或者重新执行 Effect 之前，都会调用 cleanup 函数
  }, []);
};
## 如何处理在开发环境中 Effect 执行两次？

### 控制非 React 组件
有依赖项，但是依赖项在两次中不变，不用处理
没有依赖项，实现清理函数

### 订阅事件
实现清理函数

### 触发动画
实现清理函数

### 获取数据
使用 useEffect 中定义的变量，在清理函数中，设置为另一个值，如果下一次执行 Effect 的时候，又重置为初始值，在使用数据的时候，如果变量为另一个值，则使用该数据（相当于已经发起了第二次请求）

### 发送分析报告
在请求页面发送日志
+ 可以不放在Effect中，放在路由处理中
+ 可以暂时取消严格模式

### 初始化应用时不需要使用 Effect 的情形

### 不要在 Effect 中执行购买商品一类的操作
这一类的操作都应该是事件驱动，而不是组件渲染驱动
