/* 响应事件 */
import { useState } from 'react';

import BoxBorder from '../components/BoxBorder';

function ChildComponent2({ onClick }) {
  return (
    <>
      <button onClick={onClick}>子点击</button>
    </>
  );
}

export default function ChildComponent1() {
  /**
   * 在 vue 中在自定义组件上绑定事件，最终都会落入到自定义组件的根节点上，react 上没有在组件上绑定事件的说法，即使用了同名的 prop 也只是将后面的回调函数作为一个 prop 传入到子中
   */
  const [count, setCount] = useState(0);
  const handlerClick = function (e) {
    // e.stopPropagation();
    setCount(count + 1);
  };
  return (
    <BoxBorder title="响应事件">
      <div>{count}</div>
      {/* 作用在 HTML 元素上，是当成事件绑定 */}
      <button onClick={handlerClick}>点击1</button>
      <br />
      {/* <button onClick={handlerClick()}>点击2</button> */}
      {/* react 和 vue 不同，如果加了() 就是每次渲染的时候就直接调用了 */}
      <button
        onClick={function () {
          setCount(count + 1);
        }}
      >
        点击3
      </button>
      <br />
      {/* 如果要传递参数，应该按照下面的这种写法 */}
      <button onClick={(e) => handlerClick(e)}>点击4</button>
      <br />
      {/* 作用在自定义的组件上面，不是当成事件绑定，就是普通的 prop 传递，只不过传递的值是一个函数，prop 的名称是 onClick */}
      <ChildComponent2 onClick={handlerClick} />
      {/* react 中的事件会冒泡（除了 onScroll） */}
      <div
        onClick={function () {
          alert('被子组件的 click 事件冒泡触发了');
        }}
      >
        <ChildComponent2 onClick={handlerClick} />
      </div>
    </BoxBorder>
  );
}
