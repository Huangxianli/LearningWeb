/* 选择State结构 */
import Container from "../components/Container";

function ChoosingTheStateStructure () {
  /**
   * 构建state原则：
   * 1、合并关联的state。若总是同时更新，则合并成一个
   * 2、避免相互矛盾的state
   * 3、避免冗余的state。若能从props或者其他state获得，则抛弃该state
   * 4、避免重复的state。避免在多个state变量中出现同一个对象
   * 5、避免深度嵌套的state，最好扁平化
   */
  /**
   * @problem：为什么不要将props作为state的原始值
   * @answer：state是独立于函数组件内部的变量，有记忆功能，第一次渲染的时候，会将使用传入的初始值，并且在这一次渲染阶段，会记录该state的值，在该渲染阶段，state的值是不会改变的，在第二次重新渲染的期间，state会根据该state对应的更新队列（如果有）或者上一次的state的值对当前state重新赋值；也就是说，除了创建时的渲染会同步props，后面的非创建时渲染都不会同步props，除非要利用该特性，不要将props作为初始值赋值给state
   */
  return (
    <Container title='选择State结构'>
    </Container>
  );
};
export default ChoosingTheStateStructure;