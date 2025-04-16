/* 选择 State 结构 */
import Container from '../components/Container';

function ChoosingTheStateStructure() {
  /**
   * 构建 state 原则：
   * 1、合并关联的 state。若总是同时更新，则合并成一个
   * 2、避免相互矛盾的 state
   * 3、避免冗余的 state。若能从 props 或者其他 state 获得，则抛弃该 state
   * 4、避免重复的 state。避免在多个 state 变量中出现同一个对象
   * 5、避免深度嵌套的 state，最好扁平化
   */
  /**
   * @problem：为什么不要将 props 作为 state 的原始值
   * @answer：state 是独立于函数组件内部的变量，有记忆功能，第一次渲染的时候，会将使用传入的初始值，并且在这一次渲染阶段，会记录该 state 的值，在该渲染阶段，state 的值是不会改变的，在第二次重新渲染的期间，state 会根据该 state 对应的更新队列（如果有）或者上一次的 state 的值对当前 state 重新赋值；也就是说，除了创建时的渲染会同步 props，后面的非创建时渲染都不会同步 props，除非要利用该特性，不要将 props 作为初始值赋值给 state
   */
  return <Container title="选择State结构"></Container>;
}

export default ChoosingTheStateStructure;
