/* 使用context深层传递参数 */
import Container from "../components/Container";

/**
 * 数据往内传递的过程中，如果跨越多层，通过props会显得很繁琐
 * 使用context传递
 */
/**
 * 
 * 1、创建context
 * 2、在需要数据的组件内使用创建好了的context
 * 3、在指定数据的组件中提供这个context <MyContext.Provider value={} >
 */

/* 使用context之前先尝试使用传递props或者将JSX作为children传递 */

function DeepingDatatDeeplyWithContext () {
  return (
    <>
      <Container title="使用context深层传递参数"></Container>
    </>
  )
};
export default DeepingDatatDeeplyWithContext;