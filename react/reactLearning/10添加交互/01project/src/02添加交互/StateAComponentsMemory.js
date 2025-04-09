/* state：组件的记忆 */
import { useState } from 'react';

import BoxBorder from '../components/BoxBorder';

function NormalVar() {
  let normalCount = 0;
  const [stateCount, setStateCount] = useState(0);
  return (
    <>
      <div>
        {/* 修改普通变量不会触发组件的重新渲染 */}
        {/* 组件的每次重新渲染，普通变量都会重置为原始值 */}
        <span>普通变量{normalCount}</span>
        <button
          onClick={() => {
            normalCount = normalCount + 1;
            alert('普通变量：' + normalCount);
          }}
        >
          修改普通的变量
        </button>
      </div>
      <div>
        {/* 使用set函数修改state变量会触发组件的重新渲染 */}
        {/* 重新渲染state变量的值会使用上一次的值，但是如果是先销毁再重新创建的话，就会使用原始值*/}
        <span>state变量{stateCount}</span>
        {/* 注意：一般在事件回调处理完之后才会触发重新渲染 */}
        <button
          onClick={() => {
            setStateCount(stateCount + 1);
            alert('普通变量：' + normalCount + 'state变量：' + stateCount);
          }}
        >
          修改state变量
        </button>
      </div>
    </>
  );
}

function StateVar() {
  const [count, setCount] = useState(0);
  if (count !== 0) {
    alert('重新渲染了，当前的count值为' + count);
  }

  return (
    <BoxBorder>
      <span>{count}</span>
      {/**
       * 1、state变量会保留渲染间的值，但是如果是销毁了之后在出现则会重置为初始值
       * 2、state的setter函数设置新值会触发再次渲染组件
       */}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        触发重新渲染
      </button>
    </BoxBorder>
  );
}

/**
 * @problem：为何hooks要在顶层使用（原理）
 * @answer：https://react.docschina.org/learn/state-a-components-memory#how-does-react-know-which-state-to-return
 */

function StateAComponentsMemory() {
  return (
    <BoxBorder title="state：组件的记忆">
      <NormalVar />
      <StateVar />
    </BoxBorder>
  );
}
export default StateAComponentsMemory;
