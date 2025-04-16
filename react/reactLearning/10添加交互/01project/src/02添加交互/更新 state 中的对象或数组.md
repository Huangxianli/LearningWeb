# 更新 state 中的对象或数组

state 中可以保存任意类的 JS 值
在修改对象或者数组类型的 state 的时候，**需要创建一个新的对象（或者将其浅拷贝一份），然后将 state 更新为此对象**

## 什么是 mutation？

改变对象自身的内容，当这样做的时候，就产生了一个 mutation

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
position.x = 12; // 产生一个 mutation
```

## 将 state 视为只读的

**应该把所有存放在 state 中的 JS 对象都视为只读的**
局部的 mutation 是可以的接受的

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
const newPosition = {};
newPosition.x = 12;
newPosition.y = 13;
setPosition(newPosition);
```

## 更新对象

### 使用展开语法赋值对象

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
const newPosition = { ...position, y: 12 };
setPosition(newPosition);
```

### 更新一个嵌套对象

```js
const [person, setPerson] = useState({
  name: '',
  artwork: {
    title: '',
    city: '',
  },
});
const newArtwork = {
  ...person.artwork,
  title: '123',
};
const newPerson = { ...person, artwork: newArtwork };
setPerson(newPerson);
```

### 使用 Immer 编写简洁的更新逻辑

**如果 state 有多层，应该考虑将其扁平化**，不然更新操作会变得非常繁琐
还有一种方式是使用 Immer 库

> Immer 依赖于 Proxy，记录具体修修改了哪些内容，生成一个新的对象

npm install use-immer

```js
import { useImmer } form 'use-immer';
// 用于替换 import { useState } from 'react';
const [person, updatePerson] = useImmer({
  name: '',
  artwork: {
    title: '',
    city: '',
  },
});
updatePerson(person => {
  person.artwork.title = "";
})
```

## 更新数组

### 在没有 mutation 的前提下更新数组

要和 state 对象一样，将 state 数组当成只读的
| | 避免使用 | 推荐使用 |
| :------: | ------------------- | --------------- |
| 添加元素 | push unshift | concat [...arr] |
| 删除元素 | pop shift splice | filter slice |
| 替换元素 | splice arr[i] = xxx | map |
| 排序 | reverse sort | 先复制再排序 |

### 更新数组内部的对象

应该直接替换，而不是直接修改对象的属性

### 使用 Immer 更新

```js
import {useImmer} forom 'use-immer';

const [list, updateList] = useImmer([1, 2, {name: 12}]);
updateList(draft => {
  list[1] = 12;
  list[2].age = 12;
})
```
