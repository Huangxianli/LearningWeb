import './App.css';

import ReactingToInputWithState from './reactingToInputWithState/index.js';
import ChoosingTheStateStructure from './choosingTheStateStructure';
import ExtractingStateLogicIntoAReducer from './extractingStateLogicIntoAReducer/index.js';
import PassingDataDeeplyWithContext from './passingDataDeeplyWithContext'
import ScalingUpWithReducerAndContext from './scalingUpWithReducerAndContext/index.js';
function App () {
  return (
    <div className="App">
      <ReactingToInputWithState />
      <ChoosingTheStateStructure />
      <ExtractingStateLogicIntoAReducer />
      <PassingDataDeeplyWithContext />
      <ScalingUpWithReducerAndContext />
    </div>
  );
}

export default App;
