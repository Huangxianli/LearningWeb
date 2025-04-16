import Container from '../components/Container';
import './index.css';

import { useState } from 'react';
function Counter({ order }) {
  const [count, setCount] = useState(0);
  const clickHandler = () => {
    setCount(count + 1);
  };
  return (
    <>
      <p>{`第${order ?? 1}个<Counter />`}</p>
      <button onClick={clickHandler}>增加</button>
      <div>{count}</div>
    </>
  );
}

function Counter1({ isFirst }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>{`第${isFirst ? 1 : 2}个 <Counter1 />`}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <div>{count}</div>
      {isFirst ? <p>第一个 Counter</p> : <Counter />}
    </>
  );
}

export default function PreservingAndResettingState() {
  const [isSHowFirst, setIsShowFirst] = useState(true);
  const clickHandler = () => {
    setIsShowFirst(!isSHowFirst);
  };
  return (
    <Container title="保存和重置状态">
      <button onClick={clickHandler}>{`切换显示第${
        isSHowFirst ? '2' : '1'
      }个`}</button>
      <br />
      <div className="container-box">
        <p>点击切换，复用 state</p>
        {isSHowFirst ? <Counter order={1} /> : <Counter order={2} />}
        {/* 这种方式下两个 <Counter /> 在渲染树中出于同一个位置，切换显示，会复用 State */}
        {isSHowFirst ? (
          <Counter1 isFirst={isSHowFirst} />
        ) : (
          <Counter1 isFirst={isSHowFirst} />
        )}
        {/* 这里的表现是一样的，只要是在渲染树中的同一个位置的同一个组件，就不会销毁 state */}
      </div>
      <div className="container-box">
        <p>点击切换，销毁 state</p>
        {/* 第一种方案，让组件在渲染树中的位置不同 */}
        {isSHowFirst && <Counter order={1} />}
        {!isSHowFirst && <Counter order={2} />}
        {/* 第二种方案，给组件添加 key */}
        {isSHowFirst ? (
          <Counter key="1" order={1} />
        ) : (
          <Counter key="2" order={2} />
        )}
      </div>
    </Container>
  );
}
