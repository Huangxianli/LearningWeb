import type { FC, JSX } from 'react';

function Test(): JSX.Element {
  return (
    <div>
      <Test1></Test1>
      <Test2></Test2>
    </div>
  );
}

interface Test1Props {
  name?: string;
}
const Test1: FC<Test1Props> = ({ name = '' }: Test1Props) => {
  return <div>name： {name}</div>;
};

interface Test2Props {
  age?: number;
}

function Test2({ age = 0 }: Test2Props) {
  return <div>age：{age}</div>;
}
export default Test;
