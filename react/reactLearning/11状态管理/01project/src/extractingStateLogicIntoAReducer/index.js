import Container from '../components/Container';
import { useReducer, useState, Fragment } from 'react';
import useMyReducer from './useMyReducer';

/**
 * 组件的复杂度会增加，组件状态的更新逻辑很难看清，可以将状态逻辑迁移到组件之外的称之为 reducer 的函数中
 *
 * useReducer：
 * 1、将设置状态的逻辑 修改成 dispatch 的一个 action
 * 2、编写一个 reducer 函数
 * 3、在组件中使用 reducer
 */

/**
 * dispatch 一个 action（dispatch(action)），指明刚刚做了什么
 * action对象：{ type: '', ...}
 */

/**
 * 编写 reducer 函数
 * reducer 函数是放置状态逻辑的地方，接受两个参数，当前 state 和 action 对象，返回的是更行后的 state
 * function myReducer( oneState, action){ if(action.type = '122') { return newStateValue} }
 */

/**
 * 在组件中使用 reducer
 * const [oneState, dispatch] = useReducer(myReducer, initStateValue);
 */

/**
 * reducer 必须是纯净的，即输入相同，输出也是相同的。不应该包含异步请求、定时器或者任何副作用
 * 每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化
 */

function ExtractingStateLogicIntoAReducer() {
  return (
    <>
      <Container title="使用 reducer 整合状态逻辑">
        <DataList />
      </Container>
    </>
  );
}

function DataList() {
  const [inputValue, setInputValue] = useState('');
  // const [list, dispatch] = useReducer(listReducer, []);
  const [list, dispatch] = useMyReducer(listReducer, []);
  function inputHandler(e) {
    setInputValue(e.target.value);
  }
  function addHandler() {
    dispatch({
      type: 'add',
      value: inputValue,
    });

    console.log('state-list', list); // 第一次点击的时候是 []

    dispatch({
      type: 'add',
      value: '',
    });

    console.log('state-list', list); // 第一次点击的时候是 []

    setInputValue('');
  }
  function deletHandler(key) {
    dispatch({
      type: 'delete',
      key: key,
    });
  }
  return (
    <>
      <input type="text" value={inputValue} onInput={inputHandler} />
      <button onClick={addHandler} disabled={!inputValue.length}>
        添加
      </button>
      <ul>
        {list.map((li) => (
          <Fragment key={li.key}>
            <li>{li.value}</li>
            <button onClick={() => deletHandler(li.key)}>删除</button>
          </Fragment>
        ))}
      </ul>
    </>
  );
}
function listReducer(list, action) {
  console.log('params-list', list);
  switch (action.type) {
    case 'add': {
      const newList = [
        ...list,
        {
          key: list.length ? list[list.length - 1].key + 1 : 0,
          value: action.value,
        },
      ];
      return newList;
    }
    case 'delete': {
      const newList = list.filter((li) => li.key !== action.key);
      return newList;
    }
    default: {
    }
  }
}

export default ExtractingStateLogicIntoAReducer;
