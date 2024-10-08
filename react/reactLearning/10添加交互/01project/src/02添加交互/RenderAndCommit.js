/* 渲染和提交 */
import { useState } from 'react';

import BoxBorder from "../components/BoxBorder";

function RenderAndCommit () {
  /**
   * 1、触发
   *   初次渲染
   *   自己的状态或者父/祖父的状态发生改变（每次调用set函数的时候，就会将一次渲染送入队列）
   * 2、渲染（渲染中），React会调用组件（递归）
   *   渲染必须是一次纯计算：输入相同输出相同；只做自己的事，不修改任何存在于渲染之前的对象或变量
   * 3、提交
   *   React把更改提交到DOM上，仅在渲染之间纯在差异时才会更改DOM
   * 4、浏览器绘制（浏览器渲染）
   */
  const [count, setCount] = useState(0);
  return (
    <BoxBorder title='渲染和提交'>
      <span>{count}</span>
      {/* 使用setter函数，触发渲染，在渲染中会计算那些需要修改 */}
      <button onClick={() => setCount(count + 1)}>点击</button>
    </BoxBorder>
  );
};
export default RenderAndCommit;