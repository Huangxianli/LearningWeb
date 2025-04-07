# 和 Vue3 相比

## 书写方法

```js
// Vue3
createApp().mount();
// Vue2
new Vue().$mount();
new Vue({ el: '' });
```

Vue3 不再支持 el 的写法进行挂载，一定要执行 mount() 方法，mount() 方法也没有 $

## 挂载元素覆盖

Vue3 中，生成的 DOM 会插入到目标 DOM 中，会覆盖目标 DOM 的子元素，但是不会覆盖目标 DOM
Vue2 中，生成的 DOM 会覆盖整个目标 DOM，除非没有生成 DOM，则会保留整个目标 DOM（其实不存在没有生成 DOM 的情况，即使是 template 和 render 函数都没有写，也会获取 el 对应的 DOM，然后生成 render 函数，在执行 beforeMount 之后再执行 render 函数生成 vnode，在将 vnode 转化成真实 DOM $el，再将 $el 替换 el 指代的目标 DOM，所以永远都会生成真实 DOM）
