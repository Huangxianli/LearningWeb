/* 你可能不需要 Effect */

import UpdatingStateBasedOnPropsOrState from './01UpdatingStateBasedOnPropsOrState';
/**
 * 如果没有涉及到外部系统，就不应该使用 Effect
 */

/**
 * 如何移除不必要的 Effect
 * 不必使用 Effect 来转换渲染所需要的数据（在 Effect 选中重新设置 state 等）
 * 不必使用 Effect 来处理用户事件
 */
import Container from '../components/Container';
function YouMightNotNeedAnEffect() {
  return (
    <Container title="你可能不需要 Effect">
      <UpdatingStateBasedOnPropsOrState />
    </Container>
  );
}
export default YouMightNotNeedAnEffect;
