/* 访问另一个组件的DOM节点 */

import { useRef, forwardRef, useImperativeHandle } from "react";

/** 
 * 如果直接在自己的组件上使用ref，返回返回的是null
 * 因为React不允许访问其他组件的DOM节点，手动操作另一个组件的DOM会使得代码很脆弱
 */
function MyInput () {
  return <input />
};

/**
 * 要使用forwardRef将组件包裹起来，第一个参数为props，第二个参数为ref，可以通过ref传递来获取,
 * 其实应该也可以通过传入props，将该props传入到ref上获取
 */
const MyInput1 = forwardRef((props, ref1) => {
  return <input ref={ref1} />
});

/**
 * 暴露特定的方法
 */
const MyInput2 = forwardRef((props, ref) => {
  // const ref1 = useRef(null)
  // 使用了这个hook并将ref作为第一个参数之后，再将该ref赋值给dom的ref属性上，返回的值不再是dom，而是该hook的第二个参数执行后返回的值
  useImperativeHandle(ref, () => ({
    /* 该hook的本质，应该是 将第二个参数执行返回的值，赋值给第一个参数的current属性 */
    focus () {
      // debugger
      // ref.current.focus(); // 不能这么写，这么写会陷入死循环
    }
  }));
  return <input ref={ref} />
});

/* 有改示例可以看出，useImperativeHandle的优先级是高于ref的优先级的 */
const MyInput4 = forwardRef((props, ref) => {
  const ref1 = useRef(null);
  useImperativeHandle(ref1, () => { });
  function handlerClick () {
    console.log(ref1); // {current: undefined}
  };
  return (
    <>
      <input ref={ref1} />
      <button onClick={handlerClick}>点击测试ref</button>
    </>
  )
});

const MyInput5 = forwardRef((props, ref) => {
  const ref1 = useRef(null);
  useImperativeHandle(ref, () => ({
    focus () {
      ref1.current.focus();
    },
  }));
  return (
    <input ref={ref1} />
  );
});
function AccressingAnotherComponentsDomNodes () {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  function handlerClick1 () {
    console.log(ref1); // {current: null}
  };
  function handlerClick2 () {
    console.log(ref2)
  };
  function handlerClick3 () {
    // ref3.current.focus();
    console.log(ref3);
  }
  function handlerClick4 () {
    ref4.current.focus();
  };

  return (
    <>
      <div>访问另一个组件的DOM节点</div>
      <MyInput ref={ref1} />
      <button onClick={handlerClick1}>获取ref</button>
      <br />
      <MyInput1 ref={ref2} />
      <button onClick={handlerClick2}>获取ref</button>
      <br />
      <MyInput2 ref={ref3} />
      <button onClick={handlerClick3}>获取ref</button>
      <br />
      <MyInput4 />
      <br />
      <MyInput5 ref={ref4} />
      <button onClick={handlerClick4}>获取焦点</button>
    </>
  );
};
export default AccressingAnotherComponentsDomNodes;