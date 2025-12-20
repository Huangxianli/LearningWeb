import { useState } from 'react';

interface IData {
  name: string;
  age: number;
}

export default function MyComponent() {
  const [count, setCount] = useState<string>();
  count; // undefined | string 因为初始化的时候没有给初始值
  setCount;

  const [count1, setCount1] = useState<string>('');
  count1; // string
  setCount1;

  const [data, setData] = useState<Partial<IData>>({});
  data; // Partial<IData>
  setData;

  return <>useState 的类型标注</>;
}
