import { useMemo, useState } from 'react';
interface IData {
  name: string;
  age: number;
}
export default function UseMemo() {
  const [data] = useState<IData[]>([]);

  const names = useMemo(() => data.map((item) => item.name), [data]);
  names; // string[]

  const ages = useMemo<number[]>(() => data.map((item) => item.age), [data]);
  ages; // number[]
  return <div>useMemo</div>;
}
