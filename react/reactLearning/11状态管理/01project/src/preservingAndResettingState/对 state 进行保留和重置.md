# 对 state 进行保留和重置

可以控制在重新渲染中何时对 state 进行保留和重置

## 状态与渲染树中的位置相关

React 会为 UI 中的组件结构构建**渲染树**
状态是存在 React 上的，不是存在组件内
React 通过**组件在渲染树中的位置**将他保存的每个状态与正确的组件关联起来

也就是说，如果组件在渲染树中的位置发生了改变，可能会存在 state 错乱的情况

_只有在树中**相同的位置**渲染**相同的组件**时，React 才会一直保留着组件的 state_
_只要一个组件（相同的组件）还被渲染在 UI 树相同的位置，React 就会保留它的 state。如果它被移除，或者一个不同的组件被渲染在相同的位置，那么 React 就会丢弃它的 state_

## 相同位置的相同组件会使得 state 被保留下来

```jsx
{
  isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />;
}
```

修改 isFancy 的值，也会被认为是相同的组件在相同的位置，会保留 state 的内容

> 注意：对于 React 来说，重要的是在 UI 树中的位置，而不是在 JSX 中的位置

## 相同位置的不同组件会使 state 重置

在 UI 树中，如果某种条件导致一个位置的 组件 被销毁，另一个组件在 这个位置 被渲染，那么之前那个组件对应的 state 会被销毁掉
_当在相同的位置渲染不同的组件时，整个子都会被重置_
也就是说，即使两个组件中的子组件完全一样，也会被重置；如果想要在重新渲染的时候保留 state，几次渲染中的树形结构就应该要相互匹配

**为什么不要在组件中定义组件？？？**
React 是否保存 state 看的是在渲染树中的相同位置是否渲染的是相同的组件。嵌套定义组件的时候，在组件内部定义的组件在外部组件重新渲染时，会重新执行定义，生成一个与之前不同的函数，这样导致在使用组件时，即使是在同一个位置，上一次渲染的组件和这一次渲染的组件并不是同一个，就会重置他的 state

## 在相同位置重置 state

### 方法一：将组件渲染在不同的位置

之前用一个 {} 包裹，使用三元判断，现在分别用两个 {} 包裹，用 && 判断，这样相当于在两个 UI 节点中的相同组件

```jsx
export default function App () {
  const isShow = true;
  return (
    <>
      {isShow ? <ShowCount isShow={true} /> : <ShowCount isShow={false}>}
      {/* 这里的两个 <ShowCount /> 在渲染树中的位置为被当成一个位置，而且是同一个组价，所以在切换的时候，会复用 <ShowCount /> 的状态 */}
    <>
  )
}


export default function App () {
  const isShow = true;
  return (
    <>
      {isShow && <ShowCount isShow={true} /> }
      {!isShow && <ShowCount isShow={false} /> }
      {/* 这里的两个 <ShowCount /> 在渲染树中是出于不同的位置的，所以不会复用其 state */}
    <>
  )
}
```

### 方法二：使用 key 来重置 state

key 可以让 React 区分任何的组件
key 只需要在父组件内是唯一的
