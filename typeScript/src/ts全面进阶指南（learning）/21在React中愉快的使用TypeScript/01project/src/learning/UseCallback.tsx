import { useCallback } from 'react';

export default function UseCallback() {
  const fn = useCallback((value: number) => {
    return value > 20;
  }, []);
  fn; // (value: number) => boolean

  const fn1 = useCallback<(value: number) => boolean>(
    (value: number) => value > 20,
    []
  );
  fn1; // (value: number) => boolean

  return <div>useCallback</div>;
}
