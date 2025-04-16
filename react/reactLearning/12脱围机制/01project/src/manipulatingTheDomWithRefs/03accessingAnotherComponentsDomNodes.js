/* 访问另一个组件的 DOM 节点 */

import { useRef, forwardRef, useImperativeHandle } from 'react';

/**
 * 如果直接在自己的组件上使用 ref，返回返回的是 null
 * 因为 React 不允许访问其他组件的 DOM 节点，手动操作另一个组件的 DOM 会使得代码很脆弱
 */
function MyInput({ ref }) {
  return <input />;
}

/**
 * 要使用 forwardRef 将组件包裹起来，第一个参数为 props，第二个参数为 ref，可以通过 ref 传递来获取,
 * 其实应该也可以通过传入 props，将该 props 传入到 ref 上获取
 */
const MyInput1 = forwardRef((props, ref1) => {
  // 这种写法，第二个参数是在使用该组件时，在该组件上写的 ref 传递的 ref 变量
  return <input ref={ref1} />;
});

/**
 * 暴露特定的方法
 * 利用 useImprertiveHandle(ref, () => (object))
 * 将 object 赋值给 ref.current
 */
const MyInput2 = forwardRef((props, ref) => {
  // const ref1 = useRef(null)
  // 使用了这个 hook 并将 ref 作为第一个参数之后，再将该 ref 赋值给 dom 的 ref 属性上，返回的值不再是 dom，而是该 hook 的第二个参数执行后返回的值
  useImperativeHandle(ref, () => ({
    /* 该 hook 的本质，应该是 将第二个参数执行返回的值，赋值给第一个参数的 current 属性 */
    focus() {
      // debugger
      // ref.current.focus(); // 不能这么写，这么写会陷入死循环
    },
  }));
  const inputHandler = () => {
    console.log('MyInput2-onInput-ref', ref); // 这里的 ref 已经不在指向 dom 了
  };
  return <input ref={ref} onInput={inputHandler} />;
});

// 如果要解决死循环的问题
/* const MyInput2_1 = forwardRef((props, ref) => {
  const ref1 = useRef(null);
  useImperativeHandle(ref, () => ({
    focus() {
      ref1.current.focus();
    },
  }));
  return <input ref={ref1} />;
}); */

/* 由该示例可以看出，useImperativeHandle 的优先级是高于 ref 的优先级的 */
const MyInput4 = forwardRef((props, ref) => {
  const ref1 = useRef(null);
  useImperativeHandle(ref1, () => {});
  function handlerClick() {
    console.log(ref1); // {current: undefined}
  }
  return (
    <>
      <input ref={ref1} />
      <button onClick={handlerClick}>点击测试 ref</button>
    </>
  );
});

const MyInput5 = forwardRef((props, ref) => {
  const ref1 = useRef(null);
  useImperativeHandle(ref, () => ({
    focus() {
      ref1.current.focus(); // 解决前面说的死循环问题
    },
  }));
  return <input ref={ref1} />;
});

function AccressingAnotherComponentsDomNodes() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  function handlerClick1() {
    console.log(ref1); // {current: null}
  }
  function handlerClick2() {
    console.log(ref2);
  }
  function handlerClick3() {
    // ref3.current.focus();
    console.log(ref3);
  }
  function handlerClick4() {
    ref4.current.focus();
  }

  return (
    <>
      <div>访问另一个组件的 DOM 节点</div>
      <MyInput ref={ref1} />
      {/* 直接在组件上使用 ref，什么都不处理，返回的是 {current: null} */}
      <button onClick={handlerClick1}>获取 ref</button>
      <br />
      <MyInput1 ref={ref2} />
      <button onClick={handlerClick2}>获取 ref</button>
      <br />
      <MyInput2 ref={ref3} />
      <button onClick={handlerClick3}>获取 ref</button>
      <br />
      <MyInput4 />
      <br />
      <MyInput5 ref={ref4} />
      <button onClick={handlerClick4}>获取焦点</button>
    </>
  );
}
export default AccressingAnotherComponentsDomNodes;
