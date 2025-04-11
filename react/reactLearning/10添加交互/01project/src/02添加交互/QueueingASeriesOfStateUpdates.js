/* 将一系列state更新加入队列 */
import { useState } from 'react';

import BoxBorder from '../components/BoxBorder';

function QueueingASeriesOfStateUpdate() {
  /**
   * React 会对 state 更新进行批量处理
   * 更新函数 n => n + 1
   *   React 会将更新函数加入队列，在事件处理函数中的多有其他代码运行后进行处理
   *   在下一次渲染期间，React 会遍历队列并给出更新之后的最终 state
   *   注意，如果传递的不是一个更新函数，那么就相当于直接传入了一个值，该值也会进入队列，该值如果是通过 state 变化而来，取的就是当前渲染的 state 的值，而不是更新队列的上一项的返回值；如果传的是一个更新函数，那么函数的参数就是队列里上一下最终的值
   * 更新函数必须是纯函数，只返回结果，不对该函数外的变量等进行任何修改操作
   */
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // 只会加一： 一次渲染中，state 的值是不会变的，且 React 会等到事件处理函数的所有代码都运行完再处理 state
  function handlerClick() {
    // 可以认为 触发了三次，但是最终只会渲染一次
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setDisabled(true);
    setDisabled(false);
  }
  function handlerClick1() {
    setCount((n) => n + 1);
    setCount((n) => n + 1);
    setCount((n) => n + 1);
    setCount(count + 1); // 这里传递的是一个最终的值，count 取的是当前渲染的 count 的值，和前面的更新队列中的返回值没有关系，但是也会将该值放到更新队列中，也可以简单的理解为 setCount((n) => count + 1)
    setCount((n) => n + 1); // 这里的 n 会取更新队列里上一个的值
    setCount((n) => n + 1);
  }

  return (
    <>
      <BoxBorder title="把一系列state更新加入队列">
        <span>{count}</span>
        <button onClick={handlerClick} disabled={disabled}>
          假+3
        </button>
        <button onClick={handlerClick1}>+3</button>
      </BoxBorder>
    </>
  );
}
export default QueueingASeriesOfStateUpdate;
