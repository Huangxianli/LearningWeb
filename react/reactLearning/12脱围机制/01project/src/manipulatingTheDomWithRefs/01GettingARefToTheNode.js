/* 获取指向节点的ref */
/**
 * @problem：使用普通变量加上 ref 也可以获取到 dom，为何要用 useRef 呢？？？
 * @answer：普通的变量在每次重新渲染的时候，都会被被重置
 */
import { useRef } from 'react';
function GettiingARefToTheNode() {
  const ref1 = useRef(null);
  const temp = {};
  function handlerClick() {
    console.log(ref1); // {current: input}
    console.log(temp); // {current: input}
  }
  return (
    <>
      <div>获取指向节点的 ref</div>
      <input ref={ref1} />
      {/* 这种写法也可以获取，但是控制台会报错 */}
      <input ref={temp} />
      <button onClick={handlerClick}>获取 ref</button>
    </>
  );
}
export default GettiingARefToTheNode;
