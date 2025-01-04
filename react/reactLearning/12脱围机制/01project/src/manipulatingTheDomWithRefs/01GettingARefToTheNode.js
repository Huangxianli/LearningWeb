/* 获取指向节点的ref */
/**
 * @problem：使用普通变量加上ref也可以获取到dom，为何要用useRef呢？？？
 * @answer:
 */
import { useRef } from 'react';
function GettiingARefToTheNode () {
  const ref1 = useRef(null);
  const temp = {};
  function handlerClick () {
    console.log(ref1);
    console.log(temp);
  };
  return (
    <>
      <div>获取指向节点的ref</div>
      <input ref={ref1} />
      {/* 这种写法也可以获取，但是控制台会报错 */}
      <input ref={temp} />
      <button onClick={handlerClick}>获取ref</button>
    </>
  );
};
export default GettiingARefToTheNode;