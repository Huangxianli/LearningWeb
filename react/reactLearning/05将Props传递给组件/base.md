# 将Props传递给组件
React组件使用props来进行互相通信，可以传递任何的JS值

1. 将props传递给子组件
   ````JSX
   Father:
   import Child from 'Child.js';
   export default function Father () {
    return (
      <Child info={{name: 'dname1', age: 12}}/>
    );
   };
   ````
2. 在子组价中读取Props
   ````JSX
   Child:
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

## 将JSX最为子组件传递
当将内容嵌套在JSX标签中的时候，父组件可以通过props.children接受到嵌套的组件

## Props如何随时间变化
props是只读的时间快照，每次渲染都会收到新版本的props
props是不可变的，如果想要改变props，要在来源处修改来源，重新传递；就得props会被垃圾回收
> 注意：不要直接修改props值。