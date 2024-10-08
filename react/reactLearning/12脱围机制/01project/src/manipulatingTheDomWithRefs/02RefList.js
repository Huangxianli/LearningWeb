/* 如何使用ref回调管理ref列表 */
import { useRef } from 'react';

function RefList () {
  /**
   * @problem：为什么要用ref变量接收这些dom，用普通变量不行吗？？？
   * @answer：
   * @problem：什么时候会执行回调函数呢？？？渲染时？渲染前？
   * @answer：
   */

  const listRefs = useRef([]);
  const domList = [];
  const list = [
    { key: 1, name: 1, age: 1 },
    { key: 2, name: 2, age: 2 },
    { key: 3, name: 3, age: 3 },
    { key: 4, name: 4, age: 4 },
    { key: 5, name: 5, age: 5 },
  ];
  function handlerClick (key) {
    // 这种情况是直接操作了DOM
    listRefs.current[key].innerText = listRefs.current[key].innerText + '；已经点击过了';
    domList[key].innerText = domList[key].innerText + ';' + key;
  };
  return (
    <>
      <div>如何使用ref回调管理ref列表</div>
      <ul>
        {list.map(item => (
          <li
            key={item.key}
            /**
             * ref没有绑定在DOM上就是一个有记忆的值
             * ref变量直接直接绑定在DOMs上，绑定的就是DOM
             * DOM上的ref传入回调函数，回调函数的第一个参数就是当前的DOM
             */
            ref={node => {
              if (node) {
                listRefs.current[item.key] = node;
                domList[item.key] = node;
              } else {
                listRefs.current[item.key] = null;
                domList[item.key] = null;
              }
            }}
            onClick={() => handlerClick(item.key)}
          >
            <span>{'name：' + item.name + '; age：' + item.age}</span>
          </li>
        ))}
      </ul >
    </>
  );
};
export default RefList;