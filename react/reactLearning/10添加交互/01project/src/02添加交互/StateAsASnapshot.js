/* state 如同一张快照 */
import { useState } from 'react';

import BoxBorder from "../components/BoxBorder";

function StateAsASnapshot () {
  /**
   * 设置state会 触发渲染
   * 渲染会及时生成一张快照
   *   正在渲染就是正在调用组件（函数），返回的JSX就像是UI的一张及时快照，他的Props、事件处理函数都是根据 那一次渲染中 的state计算出来的（注意，state是位于函数之外的）
   * 设置state只会为 下一次渲染 变更state的值；一个state变量的值永远不会在一次渲染的内部发生改变
   * React会使state的值 始终 固定 在一次渲染的各个事件处理函数内部
   * 
   */
  const [count, setCount] = useState(0);
  return (
    <>
      <BoxBorder title='state如同一张快照'>
        <span>{count}</span>
        {/* 在一个回调函数中触发setter函数，使用的都是上一次渲染的state的快照，即使内部是异步的，在其中获取的也是那一次渲染的state的快照的值 */}
        {/* 一个state变量永远不会在一次渲染的内部（也就是在下一次渲染之前）发生改变 */}
        <button onClick={() => {
          setCount(count + 1);
          setCount(count + 1);
          setTimeout(() => {
            alert(count);
          });
        }}>+2</button>
      </BoxBorder >
    </>
  );
};
export default StateAsASnapshot;