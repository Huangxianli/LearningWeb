# State：组件的记忆
组件需要“记住”某些东西，在React中，这种组件特有的记忆称之为state

## 当普通的变量无法满足时
1. 局部变量无法在多次渲染中持久保存
2. 更改局部变量不会触发渲染

### useState Hook
1. State变量用于存贮*渲染间*的数据
2. State Setter函数更新变量并触发React组件*再次渲染组件*

## 添加一个state变量
1. 组件外部 import { useState } form "react";
2. 结构出state和stateSetter const [state , setState] = useState(initValue);

### 剖析useState
每次重新渲染组件的时候，useState会返回一个包含两个值的数组
1. state变量会保存上次渲染的值
2. state setter函数，用于*更新state变量*，并*触发React重新渲染*

## 赋予一个组件多个state变量
在一个组件中可以有任意多、任意种类种类的state变量
如果很多时候，总是同时更新多个state变量，可以将多个state变量合并成一个

在React内部，为每个组件保存了一个数组，每一项都是一个state对。
它维护当前state对的索引值，在渲染之前将其值设置为“0”。
每次调用useState的时候，React就会提供一个state并增加索引值。
所以，useState要放在组件的顶部，不要在判断条件中使用useState；
如果在条件判断中执行useState，第一次渲染的时候，如果条件为true，那么会执行这个hook，在数组中添加一项 [value, setValue]，这个时候的index为0，在这次渲染中再遇到useState的时候，会增加index，并且向数组中添加对应的state项（注意这个数组在React组件销毁之前都会存在）；
在第二次渲染的时候，遇到useState执行就会去组件中查找对应的下标（第一次执行为0，执行一次就加1），如果在第二次渲染的时候，条件为false，将不会执行useState，这个时候，下标没有改变，那么后面获取到的state的值和更新函数会错位

## State 是隔离且私有的
如果渲染同意组件两次，每个副本的state是完全隔离的，改变其中组件的state不会影响另一个组件的state

如果想要共享state，应该将要共享的state提升到共同的父组件
