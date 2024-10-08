import './App.css';

import ReferencingValuesWithRefs from './referencingValuesWithRefs';
import ManipulatingTheDomWithRef from './manipulatingTheDomWithRefs';
import SynchronizingWithEffects from './synchronizingWithEffects';
import YouMightNotNeedAnEffect from './youMightNotNeedAnEffect';
function App () {
  return (
    <div className="App">
      <ReferencingValuesWithRefs />
      <ManipulatingTheDomWithRef />
      <SynchronizingWithEffects />
      <YouMightNotNeedAnEffect />
    </div>
  );
}

export default App;
