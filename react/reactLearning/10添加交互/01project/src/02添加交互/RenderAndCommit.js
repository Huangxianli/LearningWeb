/* 渲染和提交 */
import { useState } from 'react';

import BoxBorder from '../components/BoxBorder';

function RenderAndCommit() {
  /**
   * 1、触发
   *   初次渲染
   *   自己的状态或者父/祖父的状态发生改变（每次调用 set 函数的时候，就会将一次渲染送入队列）
   * 2、渲染（渲染中），React 会调用组件（递归）
   *   渲染必须是一次纯计算：输入（prop 和 state）相同输出（JSX）相同；只做自己的事，不修改任何存在于渲染之前的对象或变量
   * 3、提交
   *   React 把更改提交到 DOM 上，仅在渲染之间存在差异时才会更改 DOM
   * 4、浏览器绘制（浏览器渲染）
   */
  const [count, setCount] = useState(0);
  return (
    <BoxBorder title="渲染和提交">
      <span>{count}</span>
      {/* 使用 setter 函数，触发渲染，在渲染中会计算那些需要修改 */}
      <button onClick={() => setCount(count + 1)}>点击</button>
      {/* 触发重新渲染，在提交更改到 DOM 的时候，只会提交有改动的，这里的 input 会复用，尝试在 input 中输入内容，然后点击按钮 */}
      <input />
      {/* 添加 key 的话，如果每次渲染的时候 key 都不同的话，就会将这一部分提交给 DOM，浏览器会重新绘制这一部分 */}
      <input key={count} />
      <hr />
      <ChildComponent1 />
    </BoxBorder>
  );
}

// 即使子组件没有使用父组件的任何状态，只要父组件重新渲染，父组件就会重新渲染，这里和 vue 的表现不一样，在 vue 中如果子组件和父组件没有任何的关联，父组件重新渲染（执行 render 函数），子组件不会重新渲染
function ChildComponent1() {
  console.log('执行了 ChildComponent1');
  return (
    <>
      <label>ChildComponent1</label>
      <input />
    </>
  );
}
export default RenderAndCommit;
