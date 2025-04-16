/* 如何编写 Effect */
import { useState, useRef, useEffect } from 'react';
/**
 * Effect 处理由渲染引起的副作用
 *
 * Effect 允许指定有 渲染本身而不是特定事件 引起的副作用。
 * 也就是说，如果能在事件中处理的，就应该在事件中处理
 *
 * Effect 在屏幕更新后的 提交阶段 运行
 */

/**
 * 1、声明 Effect。默认情况下，Effect 会在每次渲染提交后都执行
 * 2、指定 Effect 依赖。使 Effect 按需执行，而非渲染后就执行
 * 3、必要时添加清理函数
 */

/* 声明 Effect */
function DeclareAnEffect() {
  const [count, setCount] = useState(0);
  const ref1 = useRef(null);
  useEffect(() => {
    // 如果没有添依赖项，每次渲染后都会执行该函数，所以正因如此要考虑是否应该在里面调用 state 的 setter 函数（小心陷入死循环）
    console.log('执行了useEffect');
    console.log(ref1); // {current: button} 已经可以获取到 ref 了，说明是在获取 ref 之后执行的
    // ref 是在提交阶段赋值的，Effect 是在 提交之后执行的
    console.log(count);
  });
  return (
    <>
      <button
        ref={ref1}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        触发渲染
      </button>
    </>
  );
}

/* 指定依赖 */
function SpecifyTheEffectDependencies() {
  /**
   * 注意，useEffect 中的回调执行的首要条件是：
   * 触发了重新渲染，没有触发重新渲染，无论依赖怎么改变都不会执行
   */
  const [count, setCount] = useState(0);
  let count1 = count;

  useEffect(() => {
    console.log('指定依赖');
    console.log('执行了effect');
  }, []); // [] 只在组件被创建后的第一次渲染才执行；不传的话，每次渲染都执行；[a]
  useEffect(() => {
    console.log('普通变量改变');
    console.log('count1：' + count1);
  }, [count1]); // 依赖的是普通变量，修改普通变量不会触发重新渲染，useEffect 中的回调，在有依赖的时候，是比较这次渲染时和上次渲染时的依赖的值的变化才执行的
  if (count1 === 0) {
    count1 = 1;
  }
  /**
   * @problem：如果 useEffect 的依赖项是一个普通变量，是什么时候收集依赖项的值的？？？
   * @answer：运行到这一行（注意不是运行回调函数的时候），前面的判断如果提升到 useEffect 前面，则第一次点击按钮触发渲染不会进入
   */
  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        触发渲染
      </button>
      <button
        onClick={() => {
          count1 = count1 + 1;
        }}
      >
        修改普通变量
      </button>
    </>
  );
}

/* 按需添加清理函数 */
function AddCleanupIfNeeded() {
  const [id, setId] = useState(0);
  return (
    <>
      <Chat id={id} key={id} />
      <button
        onClick={() => {
          setId(id ? 0 : 1);
        }}
      >
        点击切换
      </button>
    </>
  );
}

/* 下一次渲染该组件之后，在执行 useEffect 的时候，会先执行上一次的清理函数 */
function Chat({ id }) {
  useEffect(() => {
    console.log('连接' + id);
    return () => {
      console.log('断开' + id);
    };
  }, [id]);
  console.log('测试是在什么时候执行的清理函数');
  return (
    <>
      <div>{id}</div>
    </>
  );
}

function HowToWirteAEffect() {
  return (
    <>
      <div>如何编写 Effect</div>
      <DeclareAnEffect />
      <br />
      <SpecifyTheEffectDependencies />
      <AddCleanupIfNeeded />
    </>
  );
}
export default HowToWirteAEffect;
