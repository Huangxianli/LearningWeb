/* 使用 Effect 同步 */
/**
 * Effect 允许指定 由渲染本身而不是某个事件引起的 副作用
 * 通常用于暂时跳出 React 与外部的系统进行同步
 */
import Container from '../components/Container';
import HowToWirteAEffect from './01howToWriteAnEffect';

function SynchronizingWithEffects() {
  return (
    <>
      <Container title="使用 Effect 同步">
        <HowToWirteAEffect />
      </Container>
    </>
  );
}
export default SynchronizingWithEffects;
