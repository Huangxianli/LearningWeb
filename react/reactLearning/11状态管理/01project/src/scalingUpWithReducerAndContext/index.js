/* 使用Reducer和Context扩展你的应用 */
import { useReducer, createContext, useContext, useState, useRef } from 'react';

import Container from "../components/Container";


/**
 * reducer的dispatch都只能在useReducer的地方使用，如果要在其子组件中使用，则要通过props传递
 * 如果层架很深很不好维护，通过context来传递
 */

function scalingUpWithReducerAndContext () {
  return (
    <>
      <Container title='使用Reducer和Context扩展你的应用'>
        <TaskDemo />
      </Container>
    </>
  );
};

const ADD_TASK = 'add_task';
const DELETE_TASK = 'delete_task';
const UPDATE_TASK_VALUE = 'update_task_value';
const UPDATE_TASK_SELECT = 'update_task_select';
function taskListReducer (taskList, action) {
  switch (action.type) {
    case ADD_TASK: {
      let newTaskList = [
        ...taskList,
        {
          key: !taskList.length ? 0 : taskList[taskList.length - 1].key + 1,
          isSelect: false,
          value: action.value
        }
      ];
      return newTaskList;
    }
    case DELETE_TASK: {
      return taskList.filter(li => li.key !== action.key);
    }
    case UPDATE_TASK_VALUE: {
      return taskList.map(item =>
        item.key === action.key ?
          {
            ...item,
            value: action.value
          }
          : item
      );
    }
    case UPDATE_TASK_SELECT: {
      return taskList.map(item =>
        item.key === action.key ?
          {
            ...item,
            isSelect: action.isSelect
          }
          : item
      );
    }
    default: {
    }
  }

};
const TaskListContext = createContext([]);
const TaskDispatchContext = createContext(null);

function TaskDemo () {
  const [taskList, dispatch] = useReducer(taskListReducer, []);
  return (
    <>
      <TaskListContext.Provider value={taskList}>
        <TaskDispatchContext.Provider value={dispatch}>
          <TaskAddInput />
          <TeskList />
        </TaskDispatchContext.Provider>
      </TaskListContext.Provider>
    </>
  );
};

function TaskAddInput () {
  const [newTaskValue, setNewTaskValue] = useState('');
  const dispatch = useContext(TaskDispatchContext);
  return (
    <>
      <input type="text" value={newTaskValue} onInput={e => {
        setNewTaskValue(e.target.value);
      }} />
      <button disabled={!newTaskValue.length} onClick={() => {
        dispatch({
          type: ADD_TASK,
          value: newTaskValue
        });
        setNewTaskValue('');
      }}>添加</button>
    </>
  )
};

function TeskList () {
  const taskList = useContext(TaskListContext)
  return (
    <ul>
      {
        taskList.map(liItem => (
          <li>
            <TaskListItem key={liItem.key} taskItem={liItem} />
          </li>
        ))
      }
    </ul>
  );
};

function TaskListItem ({ taskItem }) {
  const [isEdit, setIsEdit] = useState(false);
  const [taskNewValue, setTasNewValue] = useState(taskItem.value);
  const dispatch = useContext(TaskDispatchContext);
  function changeHandler (e) {
    debugger
    dispatch({
      type: UPDATE_TASK_SELECT,
      key: taskItem.key,
      value: e.target.checked,
    });
  };
  function saveHandler () {
    dispatch({
      type: UPDATE_TASK_VALUE,
      key: taskItem.key,
      value: taskNewValue,
    })
    setIsEdit(false)
  };
  function editHandler () {
    setIsEdit(true);
  };
  function inputHandler (e) {
    setTasNewValue(e.target.value)
  };
  function deleteHandler () {
    dispatch({
      type: DELETE_TASK,
      key: taskItem.key
    })
  };
  return (
    <>
      <input type='checkbox' onChange={changeHandler} />
      {
        isEdit ?
          (<>
            <input type='text' value={taskNewValue} onInput={inputHandler} />
            <button onClick={saveHandler}>Save</button>
          </>) :
          (<>
            <span>{taskItem.value}</span>
            <button onClick={editHandler}>Edit</button>
          </>)
      }
      < button onClick={deleteHandler}> Delete</button >
    </>
  )
};
export default scalingUpWithReducerAndContext;