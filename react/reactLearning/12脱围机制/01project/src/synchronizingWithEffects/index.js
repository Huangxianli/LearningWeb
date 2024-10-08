/* 使用 Effect 同步 */
/**
 * Effect允许指定 由渲染本身而不是某个事件引起的 副作用
 * 通常用于暂时跳出React与外部的系统进行同步
 */
import Container from "../components/Container";
import HowToWirteAEffect from "./01howToWriteAnEffect";


function SynchronizingWithEffects () {
  return (
    <>
      <Container title='使用Effect同步'>
        <HowToWirteAEffect />
      </Container>
    </>
  );
};
export default SynchronizingWithEffects;