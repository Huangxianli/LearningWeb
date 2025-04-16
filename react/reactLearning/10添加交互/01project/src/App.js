import './App.css';

import Container from './components/Container.js';
import AddingInteractivity from './02添加交互';

function App() {
  return (
    <div className="App">
      <Container title={'添加交互'} isOpenDefault={true}>
        <AddingInteractivity />
      </Container>
    </div>
  );
}

export default App;
