/* 使用ref操作DOM */
import Container from "../components/Container";
import GettiingARefToTheNode from "./01GettingARefToTheNode";
import RefList from "./02RefList";
import AccressingAnotherComponentsDomNodes from "./03accessingAnotherComponentsDomNodes";

function ManipulatingTheDomWithRef () {
  return (
    <Container title='使用ref操作DOM'>
      <GettiingARefToTheNode />
      <RefList />
      <AccressingAnotherComponentsDomNodes />
    </Container>
  );
};
export default ManipulatingTheDomWithRef;