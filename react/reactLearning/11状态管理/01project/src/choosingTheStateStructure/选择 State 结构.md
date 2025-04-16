# 选择 State 结构

## 构建 state 的原则

目标是：使得 state 易于更新而不引入错误

1. 合并关联的 state。如果总是同时的更新多个 state 变量，将他们合并成一个单独的 state 变量
2. 避免矛盾的 state。
3. 避免冗余的 state。如果可以从 props 中或者其他的 state 中通过计算获得，删除掉该 state
4. 避免重复的 state。如果在其他的 state 中完整的出现，尽可能的减少重复
5. 避免深度嵌套的 state。

## 合并关联的 state

如果多个 state 变量总是同步的更新，将多个 state 合并成一个

## 避免矛盾的 state

如果两个 state 变量永远只有一个是有效的，那么合并成一个，会使更新更不容易出错
例如 isActive isNotActive 这两个是相互矛盾的，合并成一个 isActive 另一个就取反表示

## 避免冗余的 state

如果一个 state 能从 props 或者其他 state 计算得来，那这个 state 就是冗余的

> 不要在 state 中镜像 props，除非是要利用它只在创建时的渲染获得 props 的值的特性
> 在子组件中,如果设置一个 state 来接收父组件的 props，那么只会在组件创建时的渲染中接收 props 的值，后面由于 props 改变触发的组件的重新渲染，这个 state 的值不会随着 props 的更新而更新

## 避免重复的 state

一个 state 如果和另一个 state 中的一部分完全一样，且永远保持一致，那么这个 state 是重复的
利用大 state 中的一个唯一的特性来获取，将唯一的特性设置成 state 会更好
避免重复可以更好的减少错误，减少同步更新

## 避免深度嵌套的 state

层级很深的 state 在更新的时候，要遍历很多层级，使得更新变的不是那么容易

让 state 扁平化
