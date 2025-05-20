/* 根据 props 或 state 来更新 state */
import { useState } from 'react';
function FullName() {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  // 这里的 fullName 就可以不用 Effect 中来进行，因为本身调用组件中的 state 的 setter 函数的时候，就会触发渲染，会执行该组件（函数），直接用普通变量拼接就可以了
  const fullName = firstName + ' ' + secondName; // 可以基于现有的 state or props 计算出，就不要再设置一个多余的  state
  return (
    <>
      <input
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br />
      <input
        value={secondName}
        onChange={(e) => {
          setSecondName(e.target.value);
        }}
      />
      <br />
      <div>{fullName}</div>
    </>
  );
}

function UpdatingStateBasedOnPropsOrState() {
  return (
    <>
      <div>根据 props 或 state 来更新 state</div>
      <FullName />
    </>
  );
}
export default UpdatingStateBasedOnPropsOrState;
