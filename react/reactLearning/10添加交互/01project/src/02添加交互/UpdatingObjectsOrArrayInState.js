/* 更新state中的对象或者数组 */
import { useState } from 'react';
import { useImmer } from 'use-immer';
import BoxBorder from '../components/BoxBorder';

/**
 * 要将state视为只读的
 */
function UpdateObject() {
  const [info, setInfo] = useState({ order: 1, random: 1 });
  const changeRandom = () => {
    setInfo({ ...info, random: info.random + 1 });
  };

  const [immerInfo, updateImmerInfo] = useImmer({ order: 1, count: 1 });
  const changeCount = () => {
    updateImmerInfo((immerInfo) => {
      immerInfo.count++;
    });
  };
  return (
    <>
      <div>排名：{info.order}</div>
      <div>随机数：{info.random}</div>
      <button onClick={changeRandom}>修改随机数</button>
      <hr />
      <div>使用 use-immer</div>
      <div>排名：{immerInfo.order}</div>
      <div>数量：{immerInfo.count}</div>
      <button onClick={changeCount}>修改随机数</button>
    </>
  );
}

function UpdateArray() {
  const [list, setList] = useState([]);
  const addListItem = () => {
    setList([
      ...list,
      { key: list.length + 1, name: `name${list.length + 1}` },
    ]);
  };

  const [immerList, updateImmerList] = useImmer([]);
  const addImmerListItem = () => {
    updateImmerList((list) => {
      list.push({ key: list.length + 1, name: `name${list.length + 1}` });
    });
  };
  return (
    <>
      <button onClick={addListItem}>增加一项</button>
      <ul>
        {list.map((item) => (
          <li key={item.key}>{item.name}</li>
        ))}
      </ul>
      <hr />
      <button onClick={addImmerListItem}>新增一项</button>
      <ul>
        {immerList.map((item) => (
          <li key={item.key}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

function UpdatingObjectOrArrayInState() {
  return (
    <>
      <BoxBorder title="更新state中的对象或数组">
        <UpdateObject />
        <hr />
        <UpdateArray />
      </BoxBorder>
    </>
  );
}
export default UpdatingObjectOrArrayInState;
