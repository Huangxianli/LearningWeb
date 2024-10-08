/* 你可能不需要Effect */

import UpdatingStateBasedOnPropsOrState from "./01UpdatingStateBasedOnPropsOrState";
/**
 * 如果没有涉及到外部系统，就不应该使用Effect
 */
/**
 * 如何移除不必要的Effect
 * 不必使用Effect来转换渲染所需要的数据（在Effect选中重新设置state等）
 * 不必使用Effect来处理用户事件
 */
import Container from "../components/Container";
function YouMightNotNeedAnEffect () {
  return (
    <Container title='你可能不需要Effect'>
      <UpdatingStateBasedOnPropsOrState />
    </Container>
  );
};
export default YouMightNotNeedAnEffect;