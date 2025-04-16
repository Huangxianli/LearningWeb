import { useState } from 'react';
export default function useReducer(myReducer, initState) {
  const [state, stateSetter] = useState(initState);
  function dispatch(action) {
    stateSetter((n) => myReducer(n, action));
  }
  return [state, dispatch];
}
