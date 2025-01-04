/* 响应事件 */
import { useState } from 'react';

import BoxBorder from '../components/BoxBorder';
function ChildComponent2 ({ onClick }) {
  return (
    <>
      <button onClick={onClick}>子点击</button>
    </>
  );
};
export default function ChildComponent1 () {
  /**
   * 在vue中在自定义组件上绑定事件，最终都会落入到自定义组件的根节点上，react上没有在组件上绑定事件的说法，即使用了同名的prop也只是将后面的回调函数作为一个prop传入到子中
   */
  const [count, setCount] = useState(0);
  const handlerClick = function (e) {
    // e.stopPropagation();
    setCount(count + 1);
  };
  return (
    <>
      <BoxBorder title='响应事件'>
        <div>{count}</div>
        <button onClick={handlerClick}>点击</button >
        <br />
        {/* <button onClick={handlerClick()}>点击</button> */}
        {/* react和vue不同，如果加了() 就是每次渲染的时候就直接调用了 */}
        <button onClick={function () { setCount(count + 1) }}>点击</button>
        <br />
        {/* 如果要传递参数，应该按照下面的这种写法 */}
        <button onClick={(e) => handlerClick(e)}>点击</button>
        <br />
        {/* 将时间的回调函数，通过props传入到子组件中 */}
        <ChildComponent2 onClick={handlerClick} />
        {/* react中的事件会冒泡（除了onScroll） */}
        <div onClick={function () { alert('冒泡了') }} >
          <ChildComponent2 onClick={handlerClick} />
        </div >
      </BoxBorder>
    </>
  );
};