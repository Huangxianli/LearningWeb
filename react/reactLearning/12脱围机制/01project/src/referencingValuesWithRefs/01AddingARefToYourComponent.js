/* 给你的组件添加ref */
import { useRef } from 'react';
function AddingARefToYourComponent () {
  /** 
   * ref用于保存不用于渲染的值
  */
  /**
   * ref和state都有记忆功能，可以记住上一个的状态
   * 修改ref.current不会触发重新渲染
   */
  /**
   * 何时使用ref
   * 1、存储timeoutId
   * 2、存储DOM
   * 3、存储不需要被用来计算JSX的其他对象
   */
  /**
   * ref最佳实践
   * 1、将ref视为脱围机制。使用外部系统，浏览器API
   * 2、不要在渲染过程中读取或写入ref.current
   */
  const ref = useRef(0);
  console.log(ref); // {current: 0}
  function handlerClick () {
    ref.current = ref.current + 1;
    alert(ref.current);
  };
  return (
    <div>
      给你的组件添加ref
      <br />
      <div>{ref.current}</div>
      <button onClick={handlerClick}>修改ref</button>
    </div>
  );
};
export default AddingARefToYourComponent;