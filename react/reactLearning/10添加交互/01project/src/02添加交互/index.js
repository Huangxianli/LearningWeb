import RespondingToEvent from './RespondingToEvents';
import StateAComponentsMemory from './StateAComponentsMemory';
import RenderAndCommit from "./RenderAndCommit";
import StateAsASnapshot from "./StateAsASnapshot";
import QueueingASeriesOfStateUpdate from "./QueueingASeriesOfStateUpdates";
import UpdatingObjectOrArrayInState from "./UpdatingObjectsOrArrayInState";

function RootComponent () {
  return (
    <>
      <RespondingToEvent />
      <StateAComponentsMemory />
      <RenderAndCommit />
      <StateAsASnapshot />
      <QueueingASeriesOfStateUpdate />
      <UpdatingObjectOrArrayInState />
    </>
  )
};
export default RootComponent;