# 将Props传递给组件
React 组件使用 props 来进行互相通信，可以传递任何的 JS 值

1. 将 props 传递给子组件
   ````JSX
   <!-- Father: -->
   import Child from 'Child.js';
   export default function Father () {
    return (
      <Child info={{name: 'dname1', age: 12}}/>
    );
   };
   ````
2. 在子组价中读取 Props
   ````JSX
   <!-- Child: -->
   export default function Child (props) {
    return (
      <div>
        <div>
          { props.info.name }
        </div>
        <div>
          { props.info.age }
        </div>
      </div>
    )
   }
   ````

## 将 JSX 作为子组件传递
当将内容*嵌套在 JSX 标签中*的时候，父组件可以通过 props.children 接受到嵌套的组件

## Props 如何随时间变化
props 是只读的时间快照，每次渲染都会收到新版本的 props
props 是不可变的，如果想要改变 props，要在来源处修改来源，重新传递；旧的 props 会被垃圾回收
> 注意：不要直接修改 props 值。直接修改 props 的值，不会直接导致重新渲染