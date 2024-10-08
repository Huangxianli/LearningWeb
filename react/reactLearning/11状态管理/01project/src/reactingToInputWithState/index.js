import Container from '../components/Container';

function ReactingToInputWithState () {
  /**
   * 1、确定组件中所有的视图状态
   * 2、确定是什么触发了这些状态的改变
   * 3、通过useState表示内存中的state
   * 4、删减任何不必要的state变量
   * 5、连接事件处理函数来设置state
   */
  return (
    <Container title='用state响应输入'>
    </Container>
  );
};
export default ReactingToInputWithState;