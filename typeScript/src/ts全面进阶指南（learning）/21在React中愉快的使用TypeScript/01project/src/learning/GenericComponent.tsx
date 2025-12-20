import type { PropsWithChildren } from 'react';
const Test = () => {
  return <Test1></Test1>;
};

interface FromInfo {
  name: string;
  age: number;
}

const Test1 = () => {
  return (
    <div>
      <div>test1</div>
      <form>
        <Test1_1<FromInfo> filedName="name"></Test1_1>
        <Test1_1<FromInfo> filedName="age"></Test1_1>
      </form>
    </div>
  );
};

interface Test1_1Props<T extends object> {
  filedName: keyof T & string;
}
const Test1_1 = <T extends object>({
  filedName,
}: PropsWithChildren<Test1_1Props<T>>) => {
  return (
    <label htmlFor="name">
      {filedName}
      <input type="text" id="name" />
    </label>
  );
};
export default Test;
