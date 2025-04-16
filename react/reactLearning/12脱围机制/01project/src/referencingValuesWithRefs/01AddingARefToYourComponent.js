/* 给你的组件添加ref */
import { useRef } from 'react';
function AddingARefToYourComponent() {
  /**
   * ref 用于保存不用于渲染的值
   */
  /**
   * ref 和 state 都有记忆功能，可以记住上一个的状态
   * 修改 ref.current 不会触发重新渲染
   */

  /**
   * 何时使用 ref
   * 1、存储 timeoutId
   * 2、存储 DOM
   * 3、存储不需要被用来计算 JSX 的其他对象
   */

  /**
   * ref 最佳实践
   * 1、将ref 视为脱围机制。使用外部系统，浏览器 API
   * 2、不要在渲染过程中读取或写入 ref.current
   */
  const ref = useRef(0);
  console.log(ref); // {current: 0}
  function handlerClick() {
    ref.current = ref.current + 1;
    alert(ref.current);
  }
  return (
    <div>
      给你的组件添加ref
      <br />
      <div>{ref.current}</div>
      {/* 最佳实践中不要在渲染时使用 ref，这里是为了演示 */}
      <button onClick={handlerClick}>修改ref</button>
    </div>
  );
}
export default AddingARefToYourComponent;
