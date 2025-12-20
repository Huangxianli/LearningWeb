import './App.css';
import type { PropsWithChildren } from 'react';

interface Prop<T> {
  name?: T;
}

const App = <T,>({}: PropsWithChildren<Prop<T>>) => {
  return <></>;
};

export default App;
